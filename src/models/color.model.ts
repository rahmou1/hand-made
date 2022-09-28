import Color from '../types/color.types';
import db from '../database';

class ColorModel {
  // Create new color
  async create(c: Color): Promise<Color> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO colors (color, price, products_id) VALUES
        ($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [
        c.color,
        c.price,
        c.products_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to create this color ' + error + '');
    }
  }
  // Get all Colors
  async getMany(): Promise<Color[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM colors';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error('Unable to get all colors ' + error + '');
    }
  }
  // Delete Color
  async deleteOne(id: string): Promise<Color> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM colors WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to delete this color ' + error + '');
    }
  }
}

export default ColorModel;
