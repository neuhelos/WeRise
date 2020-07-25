-- DROP DATABASE IF EXISTS database_db;
-- CREATE DATABASE database_db;

-- \c database_db;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS createdWorkshops;
-- DROP TABLE IF EXISTS registeredWorkshops;
-- DROP TABLE IF EXISTS videoChat;
-- DROP TABLE IF EXISTS workshopSkills;
-- DROP TABLE IF EXISTS usersSkills;
-- DROP TABLE IF EXISTS directMessages;

-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     firstName text NOT NULL,
--     lastName text NOT NULL,
--     password VARCHAR,
--     email VARCHAR UNIQUE,
--     user_pic VARCHAR,
--     bio VARCHAR,
--     instagram VARCHAR,
--     facebook VARCHAR,
--     twitter VARCHAR,
--     linkedIn VARCHAR
-- );

-- CREATE TABLE createdWorkshops(
-- id SERIAL PRIMARY KEY,
-- user_id INT REFERENCES users(id),
-- title VARCHAR(280),
-- descriptions VARCHAR,
-- date DATE,
-- startTime VARCHAR,
-- endTime VARCHAR,
-- workshop_image VARCHAR
-- );

-- CREATE TABLE registeredWorkshops(
-- id SERIAL PRIMARY KEY,
-- user_id INT REFERENCES users(id) ON DELETE SET NULL,
-- workshop_id INT REFERENCES createdWorkshops(id) ON DELETE SET NULL
-- );

-- CREATE TABLE videoChat(
-- id SERIAL PRIMARY KEY,
-- workshop_id INT REFERENCES createdWorkshops(id) ON DELETE SET NULL,
-- url VARCHAR
-- );
-- CREATE TABLE usersSkills(
-- id SERIAL PRIMARY KEY,
-- user_id INT REFERENCES users(id) ON DELETE SET NULL,
-- skills VARCHAR
-- );

-- CREATE TABLE workshopSkills(
-- id SERIAL PRIMARY KEY,
-- workshop_id INT REFERENCES createdWorkshops(id) ON DELETE SET NULL,
-- skills VARCHAR
-- );

-- CREATE TABLE directMessages(
-- id SERIAL PRIMARY KEY,
-- senderId INT REFERENCES users(id) ON DELETE SET NULL,
-- recieverId INT REFERENCES users(id) ON DELETE SET NULL,
-- body VARCHAR
-- );

INSERT INTO users
(id, firstName, lastName, password, email, user_pic, bio)
VALUES
('1', 'stan', 'lee', '123abc', 'stan@gmail','jpeg', 'hi im stan'),
('2', 'nats', 'lee', '123abc', 'nats@gmail','jpeg', 'hi im nats'),
('3', 'ants', 'lee', '123abc', 'ants@gmail','jpeg', 'hi im ants');

INSERT INTO createdWorkshops
(id, user_id, title, descriptions, date, startTime, endTime, workshop_image)
VALUES
('1', '2', 'Intro to SQL', 'tech', '03/12/2020', 300, 400, 'jpeg'),
('2', '3', 'Intro to cardio', 'exercise', '08/12/2020', 400, 500, 'jpeg'),
('3', '1', 'Intro rollplay', 'acting', '11/12/2020', 800, 900, 'jpeg')
;

INSERT INTO registeredWorkshops
(user_id, workshop_id)
VALUES
('2', '3'),
('3', '1'),
('1', '2')
;