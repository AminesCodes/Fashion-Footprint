
DROP DATABASE IF EXISTS fashion_footprint_db;

CREATE DATABASE fashion_footprint_db;

\c fashion_footprint_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    firstname VARCHAR NOT NULL, 
    lastname VARCHAR NOT NULL,
    agreed_on_terms BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    business_id INT UNIQUE NOT NULL
);

CREATE TABLE textiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  pic VARCHAR,
  care VARCHAR,
  environmental_impact VARCHAR
);

CREATE TABLE types (
  id SERIAL PRIMARY KEY, 
  name VARCHAR
);


CREATE TABLE styles  (
  id SERIAL PRIMARY KEY, 
  name VARCHAR
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(id) ON DELETE CASCADE,
    type_id INT REFERENCES types(id),
    name VARCHAR,
    default_pic VARCHAR,
    description VARCHAR,
    closing_date DATE, 
    textile_id INT REFERENCES textiles(id),
    going_to_production BOOlEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE votes  (
    product_id INT 
)

CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  willing_to_buy BOOLEAN DEFAULT false,
  user_id INT REFERENCES users(id),
  product_id INT  REFERENCES products(id),
  style_id INT REFERENCES styles(id)
);

CREATE TABLE facts (
  id SERIAL PRIMARY KEY,
  fact VARCHAR
);

INSERT INTO users (email, password, firstname, lastname)
    VALUES ('lebronjames@gmail.com', 'lakersforlife', 'lebron', 'james'),
            ('drake@jumpman.com', 'godsplan', 'Aubrey', 'Graham');

INSERT INTO brands (email, password, name, business_id)
    VALUES ('Uber@gmail.com', 'UberEats', 'Uber', 9245632),
           ('Nba@gmail.com', 'leberon', 'Espn', 272774721);

INSERT INTO textiles (name, pic, care, environmental_impact)
    VALUES ('wool', '/images/textiles/wool.jpg', 'You shoulc care for wool', 'wool is natural because sheep'),
          ('polyester', '/images/textiles/polyester.jpg', 'You shouldnt care for polyester', 'bad for environment, bad for you');


INSERT INTO styles (name)
    VALUES ('red stuff');

INSERT INTO types (name)
    VALUES ('shirt'), ('pants');

INSERT INTO  products (brand_id, type_id, name, default_pic, description, closing_date, textile_id)
    VALUES (1, 1, 'red shirt', '/images/products/redshirt.jpg', 'This is a red shirt', '2008-11-11', 1 ),
            (2, 2, 'red pants', '/images/products/redpants.jpg', 'These are red pants', '2009-11-11', 2);

INSERT INTO wishlists (willing_to_buy, user_id, product_id) 
    VALUES (true, 1, 2), (false, 2, 1), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2);

INSERT INTO facts (fact)
    VALUES ('Your use of this site helps the environment 100%'), ('This is amazing');


             
     
