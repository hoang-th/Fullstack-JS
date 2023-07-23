// @ts-ignore
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Client from '../database';

dotenv.config()

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
} = process.env

type User = {
    id: Number | null;
    username: string;
    password_digest: string;

}

class UserStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;            
        } catch (err) {
            throw new Error(`Can not get users ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT password_digest FROM users WHERE username=($1)'
  
      const result = await conn.query(sql, [username])
  
      console.log(password+BCRYPT_PASSWORD)
  
      if(result.rows.length) {
  
        const user = result.rows[0]
  
        console.log(user)
  
        if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password_digest)) {
          return user
        }
      }
  
      return null
    }

    async show(id: string): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }

    async create(u: User): Promise<User> {
      try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'
  
        const hash = bcrypt.hashSync(
          u.password_digest + BCRYPT_PASSWORD, 
          parseInt(SALT_ROUNDS as string)
        );
  
        const result = await conn.query(sql, [u.username, hash])
        const user = result.rows[0]
  
        conn.release()
  
        return user
      } catch(err) {
        throw new Error(`unable create user (${u.username}): ${err}`)
      } 
    }

    async update(id: string, updatedUser: User): Promise<User> {
        try {
          const sql = 'UPDATE users SET username=$1, password_digest=$2 WHERE id=$3 RETURNING *';
          // @ts-ignore
          const conn = await Client.connect();
      
          const result = await conn.query(sql, [updatedUser.username, updatedUser.password_digest, id]);
      
          const user = result.rows[0];
      
          conn.release();
      
          return user;
        } catch (err) {
          throw new Error(`Could not update user ${id}. Error: ${err}`);
        }
      }
  
    async delete(id: string): Promise<User> {
        try {
      const sql = 'DELETE FROM users WHERE id in ($1)'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const user = result.rows[0]
  
      conn.release()
  
      return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

}

module.exports = UserStore;

export { User };