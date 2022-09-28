-- create table colors --
CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    color VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    products_id INT NOT NULL,
    FOREIGN KEY(products_id) REFERENCES products(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);