CREATE DATABASE softjobs;
\c softjobs;

CREATE TABLE usuarios (
    id              SERIAL,
    email           VARCHAR(50) NOT NULL    UNIQUE,
    password        VARCHAR     NOT NULL,
    rol             VARCHAR(25),
    lenguage        VARCHAR(20),
    PRIMARY KEY(id)
    );

SELECT * FROM usuarios;