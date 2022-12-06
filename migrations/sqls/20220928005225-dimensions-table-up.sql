-- create table dimensions --
CREATE TABLE dimensions (
    id SERIAL PRIMARY KEY,
    width INT NOT NULL,
    height INT NOT NULL,
    length INT NOT NULL,
    products_id INT NOT NULL,
    FOREIGN KEY(products_id) REFERENCES products(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);