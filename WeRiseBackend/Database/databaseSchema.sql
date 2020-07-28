DROP DATABASE IF EXISTS we_rise;
CREATE DATABASE we_rise;

\c we_rise;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS created_workshops;
DROP TABLE IF EXISTS registered_workshops;
DROP TABLE IF EXISTS video_chat;
DROP TABLE IF EXISTS workshop_skills;
DROP TABLE IF EXISTS users_skills;
DROP TABLE IF EXISTS direct_messages;

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

CREATE TABLE created_workshops(
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

CREATE TABLE registered_workshops(
id SERIAL PRIMARY KEY,
user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
workshop_id VARCHAR REFERENCES created_workshops(id) ON DELETE SET NULL
);

CREATE TABLE video_chat(
id SERIAL PRIMARY KEY,
workshop_id VARCHAR REFERENCES created_workshops(id) ON DELETE SET NULL,
url VARCHAR
);
CREATE TABLE users_skills(
id SERIAL PRIMARY KEY,
user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
skills VARCHAR
);

CREATE TABLE workshop_skills(
id SERIAL PRIMARY KEY,
workshop_id VARCHAR REFERENCES created_workshops(id) ON DELETE SET NULL,
skills VARCHAR
);

CREATE TABLE direct_messages(
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
('ilFicLgXB5O9utKaS8WCn4UaQh53', 'Demo', 'Account', 'demo@nilber.dev','https://www.aceshowbiz.com/images/photo/drake.jpg', 'hi im the demo account!');

INSERT INTO created_workshops
(id, user_id, title, descriptions, date, start_time, end_time, workshop_img)
VALUES
('1', '2', 'Intro to SQL', 'tech', '03/12/2020', '300', '400', 'jpeg'),
('2', '3', 'Intro to cardio', 'exercise', '08/12/2020', '400', '500', 'jpeg'),
('3', 'abc1', 'Intro rollplay', 'acting', '11/12/2020', '800', '900', 'jpeg'),
('4', 'abc1', 'Intro Coding', 'code', '11/15/2020', '800', '900', 'jpeg'),
('5', 'abc1', 'Intro Dance', 'Dance', '11/24/2020', '800', '900', 'jpeg')
;

INSERT INTO registered_workshops
(user_id, workshop_id)
VALUES
('2', '3'),
('3', '1'),
('1', '2'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '2'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '3'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '5')
;

INSERT INTO workshop_skills
(id, workshop_id, skills)
VALUES
('1', '1', 'sql'),
('2', '2', 'aerobics'),
('3','5','dance')