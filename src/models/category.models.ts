import db from '../database';
import Category from '../types/category.types';

class CategoryModel {
  //Create new Category
  async create(c: Category): Promise<Category> {
    try {
      //open connection with DB
      const connection = await db.connect();
      //Run Query
      const sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
      //Run Query
      const result = await connection.query(sql, [c.name]);
      //Release Connection
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create this Category ${(error as Error).message}`
      );
    }
  }
  //Get all Categories
  async getMany(): Promise<Category[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM categories';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Unable to Get all Categories ${(error as Error).message}`
      );
    }
  }
  //Get specific Category
  async getOne(id: string): Promise<Category> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM categories WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to get this category ${(error as Error).message}`
      );
    }
  }
  //Update Category
  async updateOne(c: Category): Promise<Category> {
    try {
      const connection = await db.connect();
      const sql = 'UPDATE categories SET name=$1 WHERE id=$2 RETURNING *';
      const result = await connection.query(sql, [c.name, c.id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to update this category ${(error as Error).message}`
      );
    }
  }
  //Delete Category
  async deleteOne(id: string): Promise<Category> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM categories WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to delete this category ${(error as Error).message}`
      );
    }
  }
}

export default CategoryModel;
