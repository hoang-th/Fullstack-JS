# Storefront Backend Project
-This is the storefront backend API project. The objective is to build a storefront API using node.js, typescript and express.

## Set up Database

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE shopping;`
    - `CREATE DATABASE shopping_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c shopping`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
        - `GRANT ALL ON SCHEMA public TO shopping_user;`
    - Grant for test database
        - `\c shopping_test`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`
        - `GRANT ALL ON SCHEMA public TO shopping_user;`

## ENVIRONMENT VARIABLES:

Add the specifications below to an env file:

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=abcxyz123

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Installation Instructions

1. Install dependencies from the package.json 

npm install


2. Run the migrations to create the database 

db-migrate up
