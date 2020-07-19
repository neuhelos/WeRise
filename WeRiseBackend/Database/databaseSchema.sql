-- DROP DATABASE IF EXISTS database_db;
-- CREATE DATABASE database_db;

-- \c database_db;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS createdWorkshops;
DROP TABLE IF EXISTS registeredWorkshops;
DROP TABLE IF EXISTS videoChat;
DROP TABLE IF EXISTS workshopSkills;
DROP TABLE IF EXISTS usersSkills;
DROP TABLE IF EXISTS directMessages;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName text NOT NULL,
    lastName text NOT NULL,
    password VARCHAR,
    email VARCHAR UNIQUE,
    user_pic VARCHAR,
    bio VARCHAR,
    instagram VARCHAR,
    facebook VARCHAR,
    twitter VARCHAR,
    linkedIn VARCHAR
);

CREATE TABLE createdWorkshops(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
title VARCHAR(280),
descriptions VARCHAR,
date DATE,
startTime TIMESTAMP,
endTime TIMESTAMP
);

CREATE TABLE registeredWorkshops(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE SET NULL,
workshop_id INT REFERENCES createdWorkshops(id) ON DELETE SET NULL
);

CREATE TABLE videoChat(
id SERIAL PRIMARY KEY,
workshop_id INT REFERENCES createdWorkshops(id) ON DELETE SET NULL,
url VARCHAR
);
CREATE TABLE usersSkills(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE SET NULL,
skills VARCHAR
);

CREATE TABLE workshopSkills(
id SERIAL PRIMARY KEY,
workshop_id INT REFERENCES createdWorkshops(id) ON DELETE SET NULL,
skills VARCHAR
);

CREATE TABLE directMessages(
id SERIAL PRIMARY KEY,
senderId INT REFERENCES users(id) ON DELETE SET NULL,
recieverId INT REFERENCES users(id) ON DELETE SET NULL,
body VARCHAR
);