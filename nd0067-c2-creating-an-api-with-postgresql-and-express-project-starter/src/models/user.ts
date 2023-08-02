import Client from "../database";
import bcrypt from "bcrypt";

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
} = process.env

export type User = {
    id?: Number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;            
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
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
            const sql = 'INSERT INTO users (firstName, lastName, password_digest) VALUES($1, $2, $3) RETURNING *'
    
            const hash = bcrypt.hashSync(
                u.password + BCRYPT_PASSWORD, 
                parseInt(SALT_ROUNDS as string)
            );
    
            const result = await conn.query(sql, [u.firstName, u.lastName, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch(err) {
            throw new Error(`Could not create user ${u.firstName} ${u.lastName}. Error: ${err}`)
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
            console.log(`user ${user}`)    
            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async authenticate(firstName: string, lastName: string, password: string): Promise<User | null> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT password_digest FROM users WHERE firstName=($1)'
            const { rows } = await conn.query(sql, [firstName])
            if(rows.length) {
                const user = rows[0]
                if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password_digest)) {
                    return user
                }
            }
            return null;
        } catch (err) {
            throw new Error(`Could not delete user ${firstName} ${lastName}. Error: ${err}`)
        }
    }
}