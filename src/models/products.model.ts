import Product from '../types/products.types';
import db from '../database';

class ProductModel {
  // Create new product
  async create(p: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO products (name, description, price, deposit, qty, picture, time_number, time_type, artists_id, categories_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
      const result = await connection.query(sql, [
        p.name,
        p.description,
        p.price,
        p.deposit,
        p.qty,
        p.picture,
        p.time_number,
        p.time_type,
        p.artists_id,
        p.categories_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to create this product ' + error + '');
    }
  }
  // Get all product
  async getMany(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to Get all products ${(error as Error).message}`);
    }
  }
  // Get specific product
  async getOne(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get this product ${(error as Error).message}`);
    }
  }
  // Update product
  async updateOne(p: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql =
        'UPDATE products SET name=$1, description=$2, price=$3, deposit=$4, qty=$5, picture=$6, time_number=$7, time_type=$8, reviewed=$9, review_comment=$10, approved=$11 RETURNING *';
      const result = await connection.query(sql, [
        p.name,
        p.description,
        p.price,
        p.deposit,
        p.qty,
        p.picture,
        p.time_number,
        p.time_type,
        p.reviewed,
        p.review_comment,
        p.approved,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to update this product ${(error as Error).message}`
      );
    }
  }
  // Delete product
  async deleteOne(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to delete this product ${(error as Error).message}`
      );
    }
  }
}

export default ProductModel;
