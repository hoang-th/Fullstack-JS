// @ts-ignore
import Client from '../database';

type Weapon = {
    id? : Number | null;
    name: string;
    type: string;
    weight: number;
}
class MythicalWeaponStore {
    async index(): Promise<Weapon[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM mythical_weapons';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;            
        } catch (err) {
            throw new Error(`Can not get weapons ${err}`);
        }
    }

    async show(id: string): Promise<Weapon> {
        try {
        const sql = 'SELECT * FROM mythical_weapons WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find weapon ${id}. Error: ${err}`)
        }
      }

    async create(b: Weapon): Promise<Weapon> {
        try {
      const sql = 'INSERT INTO mythical_weapons (name, type, weight) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [b.name, b.type, b.weight])
  
      const book = result.rows[0]
  
      conn.release()
  
      return book
        } catch (err) {
            throw new Error(`Could not add new weapon ${b.name}. Error: ${err}`)
        }
    }

    async update(id: string, updatedWeapon: Weapon): Promise<Weapon> {
        try {
          const sql = 'UPDATE mythical_weapons SET name=$1, type=$2, weight=$3 WHERE id=$4 RETURNING *';
          // @ts-ignore
          const conn = await Client.connect();
      
          const result = await conn.query(sql, [updatedWeapon.name, updatedWeapon.type, updatedWeapon.weight, id]);
      
          const weapon = result.rows[0];
      
          conn.release();
      
          return weapon;
        } catch (err) {
          throw new Error(`Could not update weapon ${id}. Error: ${err}`);
        }
      }
  
    async delete(id: string): Promise<Weapon> {
        try {
      const sql = 'DELETE FROM mythical_weapons WHERE id in ($1)'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const book = result.rows[0]
  
      conn.release()
  
      return book
        } catch (err) {
            throw new Error(`Could not delete weapon ${id}. Error: ${err}`)
        }
    }
}

module.exports = MythicalWeaponStore;

export { Weapon };