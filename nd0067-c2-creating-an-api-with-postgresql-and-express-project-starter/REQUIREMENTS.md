# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index
    GET /products/
- Show
    GET /products/:id
- Create [token required]
    POST /products/
- Delete [token required]
    Delete /products/:id

#### Users
- Index [token required] 
    GET /users/
- Show [token required]
    GET /users/:id
- Create [token required]
    POST /users/
- Delete [token required]
    Delete /users/:id
- Authenticate
    Post /users/authenticate

#### Orders
- Index
    GET /orders/
- Show
    GET /orders/:id
- Create [token required]
    POST /orders/
- Delete [token required]
    Delete /orders/:id
- Current Order by user (args: user id)[token required]
    Post /orders/:id/user_id

## Data Shapes
#### Product
-  id
- name
- price
    
    name VARCHAR(50),
    price integer,
    id SERIAL PRIMARY KEY

#### User
- id
- firstName
- lastName
- password

    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password_digest VARCHAR(100)

#### Orders
- id
- user_id
- status of order (active or complete)

    id SERIAL PRIMARY KEY,
    user_id INTEGER	REFERENCES users(id),
    status VARCHAR(20)

#### order_products
- id
- quantity
- order_id
- product_id

    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE ,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE 

