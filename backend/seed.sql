
DROP DATABASE IF EXISTS fashion_footprint_db;

CREATE DATABASE fashion_footprint_db;

\c fashion_footprint_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    firstname VARCHAR NOT NULL, 
    lastname VARCHAR NOT NULL
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    businessId INT UNIQUE NOT NULL
);

CREATE TABLE textiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  pic VARCHAR,
  care VARCHAR,
  environmentalImpact VARCHAR
);

CREATE TABLE styles  (
  id SERIAL PRIMARY KEY, 
  name VARCHAR
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(id) ON DELETE CASCADE,
    type VARCHAR,
    name VARCHAR,
    defaultPic VARCHAR,
    description VARCHAR,
    closingDate DATE, 
    style INT REFERENCES styles(id),
    textile_id INT REFERENCES textiles(id)
);

CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  willingToBuy BOOLEAN,
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

INSERT INTO brands (email, password, name, businessId)
    VALUES ('Uber@gmail.com', 'UberEats', 'Uber', 9245632),
           ('Nba@gmail.com', 'leberon', 'Espn', 272774721);

INSERT INTO textiles (name, pic, care, environmentalImpact)
    VALUeS ('wool', 'http://localhost:3030/textiles/wool.jpg', 'You shoulc care for wool', 'wool is natural because sheep'),
          ('polyester', 'http://localhost:3030/textiles/polyester.jpg', 'You shouldnt care for polyester', 'bad for environment, bad for you');

INSERT INTO styles (name)
    VALUES ('red stuff');

INSERT INTO  products (brand_id, type, name, defaultPic, description, closingDate, style, textile_id)
    VALUES (1, 'shirt', 'red shirt', 'http://localhost:3030/images/redshirt.jpg', 'This is a red shirt', '2008-11-11', 1, 1 ),
            (2, 'pants', 'red pants', 'http://localhost:3030/images/redpants.jpg', 'These are red pants', '2009-11-11', 1, 2);

INSERT INTO wishlists (willingToBuy, user_id, product_id) 
    VALUES (true, 1, 2), (false, 2, 1);

INSERT INTO facts (fact)
    VALUES ('Your use of this site helps the environment 100%'), ('This is amazing');


             
           
