-- create products table --
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description VARCHAR(250) NOT NULL,
    price INT NOT NULL,
    deposit INT NOT NULL,
    qty INT NOT NULL DEFAULT 1,
    picture VARCHAR(255) NOT NULL UNIQUE,
    time_number INT NOT NULL,
    time_type VARCHAR(50) NOT NULL,
    reviewed boolean NOT NULL DEFAULT false,
    review_comment VARCHAR(255),
    approved boolean NULL NULL DEFAULT false,
    artists_id INT NOT NULL,
    categories_id INT NOT NULL,
    FOREIGN KEY(categories_id) REFERENCES categories(id),
    FOREIGN KEY(artists_id) REFERENCES artists(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)