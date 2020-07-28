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
    id VARCHAR PRIMARY KEY,
    firstn text NOT NULL,
    lastn text NOT NULL,
    email VARCHAR UNIQUE,
    user_pic VARCHAR,
    bio VARCHAR,
    instagram VARCHAR,
    facebook VARCHAR,
    twitter VARCHAR,
    linkedIn VARCHAR
);

CREATE TABLE createdWorkshops(
id VARCHAR PRIMARY KEY,
user_id VARCHAR REFERENCES users(id),
title VARCHAR(280),
descriptions VARCHAR,
date VARCHAR,
start_time VARCHAR,
end_time VARCHAR,
category VARCHAR,
workshop_img VARCHAR

);

CREATE TABLE registeredWorkshops(
id SERIAL PRIMARY KEY,
user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
workshop_id VARCHAR REFERENCES createdWorkshops(id) ON DELETE SET NULL
);

CREATE TABLE videoChat(
id SERIAL PRIMARY KEY,
workshop_id VARCHAR REFERENCES createdWorkshops(id) ON DELETE SET NULL,
url VARCHAR
);
CREATE TABLE usersSkills(
id SERIAL PRIMARY KEY,
user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
skills VARCHAR
);

CREATE TABLE workshopSkills(
id SERIAL PRIMARY KEY,
workshop_id VARCHAR REFERENCES createdWorkshops(id) ON DELETE SET NULL,
skills VARCHAR
);

CREATE TABLE directMessages(
id SERIAL PRIMARY KEY,
senderId VARCHAR REFERENCES users(id) ON DELETE SET NULL,
recieverId VARCHAR REFERENCES users(id) ON DELETE SET NULL,
body VARCHAR
);

INSERT INTO users
(id, firstn, lastn,  email, user_pic, bio)
VALUES
('1', 'stan', 'lee', 'stan@gmail','jpeg', 'hi im stan'),
('2', 'nats', 'lee', 'nats@gmail','jpeg', 'hi im nats'),
('3', 'ants', 'lee', 'ants@gmail','jpeg', 'hi im ants'),
('abc1', 'Rob', 'lee', 'aabc1@gmail','jpeg', 'hi im abc1'),
('abc2', 'Jacob', 'lee', 'abc2@gmail','jpeg', 'hi im abc2'),
('abc3', 'Mandy', 'lee', 'abc3@gmail','jpeg', 'hi im abc3'),
('abc4', 'Percy', 'lee', 'abc4@gmail','jpeg', 'hi im abc4'),
('abc5', 'James', 'lee', 'abc5@gmail','jpeg', 'hi im abc5'),
('abc6', 'Joey', 'Chestnut', 'abc6@gmail','jpeg', 'hi im abc6'),
('abc7', 'abc', '7', 'abc7@gmail','jpeg', 'hi im abc7'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', 'Demo', 'Account', 'demo@nilber.dev','https://www.aceshowbiz.com/images/photo/drake.jpg', 'hi im the demo account!'),
('E093QRw1swaW4KCQUON44IU2gcy2', 'Guest', 'Account', 'guest@werise.org','https://www.aceshowbiz.com/images/photo/drake.jpg', 'hi im the Guest account!');

INSERT INTO createdWorkshops
(id, user_id, title, descriptions, date, start_time, end_time, workshop_img)
VALUES
('1', '2', 'Intro to SQL', 'tech', '03/12/2020', '300', '400', 'jpeg'),
('2', '3', 'Intro to cardio', 'exercise', '08/12/2020', '400', '500', 'jpeg'),
('3', 'abc1', 'Intro rollplay', 'acting', '11/12/2020', '800', '900', 'jpeg'),
('4', 'abc1', 'Intro Coding', 'code', '11/15/2020', '800', '900', 'jpeg'),
('5', 'abc1', 'Intro Dance', 'Dance', '11/24/2020', '800', '900', 'jpeg')
;

INSERT INTO registeredWorkshops
(user_id, workshop_id)
VALUES
('2', '3'),
('3', '1'),
('1', '2'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '2'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '3'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '5'),
('E093QRw1swaW4KCQUON44IU2gcy2', '2'),
('E093QRw1swaW4KCQUON44IU2gcy2', '3'),
('E093QRw1swaW4KCQUON44IU2gcy2', '4'),
('E093QRw1swaW4KCQUON44IU2gcy2', '1'),
('E093QRw1swaW4KCQUON44IU2gcy2', '5')
;