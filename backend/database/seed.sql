
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
  textile_name VARCHAR,
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
    product_name VARCHAR,
    default_pic VARCHAR,
    description VARCHAR,
    closing_date DATE, 
    textile_id INT REFERENCES textiles(id),
    going_to_production BOOlEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE votes  (
    id SERIAL PRIMARY KEY,
    product_vote_id INT REFERENCES products(id) ON DELETE CASCADE,
    user_vote_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE wishlists (
  wishlist_id SERIAL PRIMARY KEY,
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
    VALUES  ('briany@gmail.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Briany', 'T'),
            ('chuck@gmail.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Chuck', 'A'),
            ('suzette@gmail.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Suzette', 'I'),
            ('amin@gmail.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Amin', 'B');

INSERT INTO brands (brand_email, brand_password, brand_name, business_id)
    VALUES ('info@nike.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Nike', 1234567),
('info@hermes.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Hermes', 1234568),
('info@louis vuitton.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Louis Vuitton', 1234569),
('info@cartier.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Cartier', 1234570),
('info@rolex.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Rolex', 1234571),
('info@uniqlo.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Uniqlo', 1234572),
('info@h&m.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'H&M', 1234573),
('info@zara.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Zara', 1234574),
('info@gucci.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Gucci', 1234575),
('info@adidas.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Adidas', 1234576),
('info@chanel.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Chanel', 1234577),
('info@swarovski.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Swarovski', 1234578),
('info@burberry.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Burberry', 1234579),
('info@tom ford.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Tom Ford', 1234580),
('info@lululemon.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Lululemon', 1234581),
('info@the north face.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'The North Face',1234582),
('info@prada.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Prada', 1234584),
('info@new balance.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'New Balance', 1234585),
('info@michael kors.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Michael Kors', 1234586),
('info@chow tai fook.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Chow Tai Fook', 1234587),
('info@under armour.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Under Armour', 1234588),
('info@tj maxx.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'TJ Maxx', 1234589),
('info@tiffany & co..com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Tiffany & Co.', 1234590),
('info@coach.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Coach', 1234591),
('info@foot locker inc..com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Foot Locker Inc.', 1234592),
('info@c&a.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'C&A', 1234594),
('info@next.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Next', 1234595),
('info@chopard.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Chopard', 1234596),
('info@dolce & gabbana.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Dolce & Gabbana', 1234597),
('info@patek philippe.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Patek Philippe',1234598),
('info@moncler.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Moncler', 1234599),
('info@christian louboutin.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Christian Louboutin', 1234600),
('info@omega.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Omega', 1234601),
('info@ray ban.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Ray Ban', 1234602),
('info@salvatore ferragamo.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Salvatore Ferragamo', 1234603),
('info@vera wang.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Vera Wang', 1234604),
('info@dior.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Dior', 1234605),
('info@hugo boss.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Hugo Boss', 1234606),
('info@armani.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Armani', 1234607),
('info@nine west.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Nine West', 1234608),
('info@fendi.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Fendi', 1234609),
('info@skechers.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Skechers', 1234610),
('info@old navy.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Old Navy', 1234611),
('info@iwc schaffhausen.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'IWC Schaffhausen', 1234612),
('info@primark.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Primark', 1234613),
('info@max mara.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Max Mara', 1234614),
('info@polo ralph lauren.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Polo Ralph Lauren', 1234615),
('info@manolo blahnik.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Manolo Blahnik',1234616),
('info@audemars piguet.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Audemars Piguet', 1234617),
('info@diesel.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Diesel', 1234618),
('info@calvin klein.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Calvin Klein', 1234619),
('info@net-a-porter.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Net-a-Porter', 1234620),
('info@furla.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Furla', 1234621),
('info@gap.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'GAP', 1234622),
('info@longines.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Longines', 1234623),
('info@forever 21.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Forever 21', 1234624),
('info@steve madden.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Steve Madden', 1234625),
('info@stuart weitzman.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Stuart Weitzman', 1234626),
('info@urban outfitters.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Urban Outfitters', 1234627),
('info@longchamp.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Longchamp', 1234628),
('info@puma.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Puma', 1234629),
('info@sisley.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Sisley', 1234630),
('info@lao feng xiang.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Lao Feng Xiang',1234631),
('info@tissot.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Tissot', 1234632),
('info@tommy hilfiger.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Tommy Hilfiger',1234633),
('info@zalando.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Zalando', 1234634),
('info@nordstrom.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Nordstrom', 1234635),
('info@asos.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'ASOS', 1234636),
('info@tory burch.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Tory Burch', 1234637),
('info@lacoste.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Lacoste', 1234638),
('info@topshop.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Topshop', 1234639),
('info@g-star.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'G-star', 1234640),
('info@aldo.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Aldo', 1234641),
('info@oakley.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Oakley', 1234642),
('info@cole haan.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Cole Haan', 1234643),
('info@jimmy choo.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Jimmy Choo', 1234644),
('info@valentino.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Valentino', 1234646),
('info@elie taharie.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Elie Taharie', 1234647),
('info@jaeger-le coultre.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Jaeger-Le Coultre', 1234648),
('info@fossil.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Fossil', 1234649),
('info@vacheron constantin.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Vacheron Constantin', 1234650),
('info@american eagle outfitters.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'American Eagle Outfitters', 1234651),
('info@elie saab.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Elie Saab', 1234652),
('info@patagonia.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Patagonia', 1234653),
('info@ted baker.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Ted Baker', 1234654),
('info@bogner.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Bogner', 1234655),
('info@new look.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'New Look', 1234656),
('info@asics.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Asics', 1234657),
('info@breguet.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Breguet', 1234658),
('info@escada.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'ESCADA', 1234659),
('info@tag heuer.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Tag Heuer', 1234660),
('info@banana republic.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Banana Republic', 1234661),
('info@desigual.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Desigual', 1234662),
('info@swatch.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Swatch', 1234663),
('info@cavalli.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Cavalli', 1234664),
('info@brunello cucinelli.com', '$2b$12$BnlkuACZiHUs8h0TLWejv.NaSyBXQGNWnczdYt8KrdDEDV9VHQ4/O', 'Brunello Cucinelli', 1234665);

INSERT INTO textiles (textile_name, pic, care, environmental_impact)
    VALUES ('wool', '/images/textiles/wool.jpg', 'You shoulc care for wool', 'wool is natural because sheep'),
          ('polyester', '/images/textiles/polyester.jpg', 'You shouldnt care for polyester', 'bad for environment, bad for you');


INSERT INTO styles (style_name)
    VALUES ('red stuff');

INSERT INTO types (type_name)
    VALUES ('Baby Boys Shoes'),
           ('Baby Girls Shoes'),
           ('Boys Activewear'),
           ('Boys Coats & Jackets'),
           ('Boys Jeans'),
           ('Boys Newborn'),
           ('Boys Pajamas'),
           ('Boys Pants'),
           ('Boys Sets & Outfits'),
           ('Boys Shirts'),
           ('Boys Shoes'),
           ('Boys Shorts'),
           ('Boys Socks'),
           ('Boys Suits & Dress Shirts'),
           ('Boys Sweaters'),
           ('Boys Sweatshirts & Hoodies'),
           ('Boys Swimwear'),
           ('Boys Underwear'),
           ('Girls Activewear'),
           ('Girls Coats & Jackets'),
           ('Girls Dresses'),
           ('Girls Jeans'),
           ('Girls Leggings & Pants'),
           ('Girls Newborn'),
           ('Girls Pajamas'),
           ('Girls Sets & Outfits'),
           ('Girls Shoes'),
           ('Girls Shorts'),
           ('Girls Socks & Tights'),
           ('Girls Sweaters'),
           ('Girls Sweatshirts & Hoodies'),
           ('Girls Swimwear'),
           ('Girls Tops'),
           ('Girls Underwear'),
           ('Men Activewear'),
           ('Men Athletic Shoes & Sneakers'),
           ('Men Bags & Backpacks'),
           ('Men Belts & Suspenders'),
           ('Men Big & Tall'),
           ('Men Blazers & Sport Coats'),
           ('Men Boots'),
           ('Men Casual Shoes'),
           ('Men Coats & Jackets'),
           ('Men Dress Shirts'),
           ('Men Dress Shoes'),
           ('Men Hats-Gloves-Scarves'),
           ('Men Hoodies & Sweatshirts'),
           ('Men Jeans'),
           ('Men Jewelry & Cufflinks'),
           ('Men Loafers & Drivers'),
           ('Men Luggage'),
           ('Men Pajamas-Lounge-Sleepwear'),
           ('Men Pants'),
           ('Men Polos'),
           ('Men Sandals & Flip-Flops'),
           ('Men Shirts'),
           ('Men Shorts'),
           ('Men Slippers'),
           ('Men Suits & Tuxedos'),
           ('Men Sunglasses'),
           ('Men Sweaters'),
           ('Men Swimwear'),
           ('Men T-Shirts'),
           ('Men Ties-Bowties-Pocket Squares'),
           ('Men Underwear & Socks'),
           ('Men Wallets'),
           ('Men Watches'),
           ('Women Activewear'),
           ('Women Boots'),
           ('Women Bras, Panties & Lingerie'),
           ('Women Cashmere'),
           ('Women Coats'),
           ('Women Dresses'),
           ('Women Flats'),
           ('Women Handbags & Wallets'),
           ('Women Hats, Gloves & Scarves'),
           ('Women Heels & Pumps'),
           ('Women Jackets & Blazers'),
           ('Women Jeans'),
           ('Women Jewelry'),
           ('Women Jumpsuits & Rompers'),
           ('Women Pajamas, Robes & Loungewear'),
           ('Women Pants & Leggings'),
           ('Women Skirts'),
           ('Women Suits & Suit Separates'),
           ('Women Sunglasses By Sunglass Hut'),
           ('Women Sweaters'),
           ('Women Swimwear'),
           ('Women Tights, Socks, & Hosiery'),
           ('Women Tops'),
           ('Women Watches');

INSERT INTO  products (brand_id, type_id, product_name, default_pic, description, closing_date, textile_id)
    VALUES (1, 1, 'red shirt', '/images/products/redshirt.jpg', 'This is a red shirt', '2008-11-11', 1 ),
            (2, 2, 'red pants', '/images/products/redpants.jpg', 'These are red pants', '2009-11-11', 2);

INSERT INTO wishlists (willing_to_buy, user_id, product_id) 
    VALUES (true, 1, 2), (false, 2, 1), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2), (true, 1, 2);

INSERT INTO facts (fact)
    VALUES ('Your use of this site helps the environment 100%'), ('This is amazing');

 
       


             
     
