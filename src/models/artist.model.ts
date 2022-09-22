import Artist from '../types/artist.type';
import db from '../database';
class ArtistModel {
  // Create New artist
  async create(a: Artist): Promise<Artist> {
    try {
      // Open connection
      const connection = await db.connect();
      const sql = `INSERT INTO artists (gender, age, qualification, category, yearExp, certification, brand_name, local_gallery, made_courses, avatar, facebook, instagram, youtube, website, users_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id, gender, age, qualification, category, yearExp, certification, brand_name, local_gallery, made_courses, avatar, facebook, instagram, youtube, website, users_id`;
      // run query
      const result = await connection.query(sql, [
        a.gender,
        a.age,
        a.qualification,
        a.category,
        a.yearExp,
        a.certification,
        a.brand_name,
        a.local_gallery,
        a.made_courses,
        a.avatar,
        a.facebook,
        a.instagram,
        a.youtube,
        a.website,
        a.users_id,
      ]);
      // close connection with db
      connection.release();
      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to create this Artist ' + error + '');
    }
  }
  // Get all artists
  async getMany(): Promise<Artist[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM artists';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error('Unable to fetch all data ' + error + '');
    }
  }
  // Get specific artist
  async getOne(id: string): Promise<Artist> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * from artists where id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to fetch this user ' + error + '');
    }
  }
  // Update artist
  async updateOne(a: Artist): Promise<Artist> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE artists
      SET gender=$1, age=$2, qualification=$3, category=$4, yearExp=$5, certification=$6, brand_name=$7, local_gallery=$8, made_courses=$9, avatar=$10, facebook=$11, instagram=$12, youtube=$13, website=$14 where id=$15
      RETURNING id, gender, age, qualification, category, yearExp, certification, brand_name, local_gallery, made_courses, avatar, facebook, instagram, youtube, website`;
      const result = await connection.query(sql, [
        a.gender,
        a.age,
        a.qualification,
        a.category,
        a.yearExp,
        a.certification,
        a.brand_name,
        a.local_gallery,
        a.made_courses,
        a.avatar,
        a.facebook,
        a.instagram,
        a.youtube,
        a.website,
        a.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to update this user ' + error + '');
    }
  }
  // Delete artist
  async deleteOne(id: string): Promise<Artist> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM artists WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to delete this user ' + error + ' ');
    }
  }
}

export default ArtistModel;
