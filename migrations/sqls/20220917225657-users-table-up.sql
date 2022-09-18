-- create table users --
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fName VARCHAR(50) NOT NULL,
    lName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    postalcode INT NOT NULL DEFAULT 0,
    city VARCHAR(30) UNIQUE NOT NULL,
    addressOne VARCHAR(100) NOT NULL DEFAULT 0,
    addressTwo VARCHAR(100),
    region VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    blockNumber INT NOT NULL DEFAULT 0,
    floorNumber INT NOT NULL DEFAULT 0,
    appartmentNumber INT NOT NULL DEFAULT 0
);