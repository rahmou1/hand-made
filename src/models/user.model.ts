import bcrypt from 'bcrypt';
import User from '../types/user.type';
import db from '../database';
import config from '../config';

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
class UserModel {
  //* Create New User
  async create(u: User): Promise<User> {
    try {
      // Open Connection
      const connection = await db.connect();
      const sql = `INSERT INTO users(first_name, last_name, email, password, mobile, city)
      VALUES ($1 ,$2 ,$3 ,$4 ,$5 ,$6) returning id, first_name, last_name, email, mobile, city`;
      // Run Query
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        u.email,
        hashPassword(u.password),
        u.mobile,
        u.city,
      ]);
      // Release the Connection
      connection.release();
      // Return Created User
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create this user (${u.email}): ${(error as Error).message}`
      );
    }
  }

  //* Get all Users
  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT id, first_name, last_name, email, mobile, city from users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`);
    }
  }
  //* Get specific User
  async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, first_name, last_name, email, mobile, city FROM users 
      WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot find user ${id}, ${(error as Error).message}`);
    }
  }
  //* Update User
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users SET first_name=$1, last_name=$2, mobile=$3, password=$4
      WHERE id=$5 RETURNING id, first_name, last_name, mobile`;
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        u.mobile,
        hashPassword(u.password),
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot update user: ${u.first_name} ${u.last_name}, ${
          (error as Error).message
        }`
      );
    }
  }
  //* Delete User
  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users WHERE id=($1) 
      RETURNING id, first_name, last_name, mobile`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot delete this user: ${id}, ${(error as Error).message}`
      );
    }
  }
  //* Authenticate User
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT password FROM users WHERE email=$1';
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, first_name, last_name, email, mobile, city FROM users WHERE email=($1)',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }
  }
  //! Reset Password
}

export default UserModel;
