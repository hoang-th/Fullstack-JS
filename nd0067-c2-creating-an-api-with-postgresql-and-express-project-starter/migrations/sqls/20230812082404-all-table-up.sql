CREATE TABLE products(name VARCHAR(50), price integer, id SERIAL PRIMARY KEY);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password_digest VARCHAR(100)
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER	REFERENCES users(id),
    status VARCHAR(20)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE ,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE 
);