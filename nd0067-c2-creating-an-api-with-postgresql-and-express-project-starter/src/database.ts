import dotenv  from 'dotenv';
import { Pool } from 'pg';

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV,
} = process.env

const Client:Pool = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: ENV==="dev"? POSTGRES_DB : POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD
})

export default Client;