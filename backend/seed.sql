
DROP DATABASE IF EXISTS hackathon_db;

CREATE DATABASE hackathon_db;

\c hackathon_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR,
    firstname VARCHAR, 
    lastname VARCHAR
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE,
    password VARCHAR,
    name VARCHAR,
    businessId INT UNIQUE
);

CREATE TABLE textiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  pic VARCHAR,
  care VARCHAR,
  environmentalImpact VARCHAR
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(id) ON DELETE CASCADE,
    type VARCHAR,
    name VARCHAR,
    defaultPic VARCHAR,
    description VARCHAR,
    specifications VARCHAR,
    closingDate DATE, 
    textile_id INT REFERENCES textiles(id)
);

CREATE TABLE styles  (
  id SERIAL PRIMARY KEY, 
  name VARCHAR,
  pic VARCHAR,
  product_id  INT  REFERENCES products(id)
);



CREATE TABLE wishlist (
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

INSERT INTO users (username, email, password, firstname, lastname)
    VALUES ('kingjames', 'lebronjames@gmail.com', 'lakersforlife', 'lebron', 'james'),
            ('inmyfeelings', 'drake@jumpman.com', 'godsplan', 'Aubrey', 'Graham');

INSERT INTO brands (email, password, name, businessId)
    VALUES ('Uber@gmail.com', 'UberEats', 'Uber', 9245632),
           ('Nba@gmail.com', 'leberon', 'Espn', 272774721);


             
           
