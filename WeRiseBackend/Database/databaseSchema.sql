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
    posted TIMESTAMPTZ DEFAULT NOW(),
    user_id VARCHAR REFERENCES users(id),
    title VARCHAR(280),
    descriptions VARCHAR,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    category VARCHAR,
    participants INT,
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
('1', 'Jay', 'Jones', 'jayjones@pursuit.org','http://localhost:3000/JohnJay.jpeg', '6.4 Pursuit Fellow'),
('2', 'Deja', 'Flynn', 'dejaflynn@pursuit.org', 'http://localhost:3000/DejaFlynn', '6.4 Pursuit Fellow'),
('3', 'Nilber', 'Remon', 'nilberremon@pursuit.org', 'http://localhost:3000/NilberRemonCroppedCircle.png', '6.4 Pursuit Fellow'),
('4', 'Uduakabasi', 'Abasiurua', 'uduakabasiabasiurua@pursuit.org','https://ca.slack-edge.com/TCVA3PF24-UN3UXSZMY-e20128673daa-512', '6.4 Pursuit Fellow'),
('5', 'Danielle', 'Cherry', 'daniellecherry@pursuit.org','http://localhost:3000/DanielleCherry', '6.4 Pursuit Fellow'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', 'Demo', 'Account', 'demo@nilber.dev','https://www.aceshowbiz.com/images/photo/drake.jpg', 'Hi im the Demo Account!'),
('E093QRw1swaW4KCQUON44IU2gcy2', 'Guest', 'Account', 'guest@werise.org','https://www.aceshowbiz.com/images/photo/drake.jpg', 'Hi im the Guest Account!');

INSERT INTO created_workshops
(id, posted, user_id, title, descriptions, start_time, end_time, category, participants, workshop_img)
VALUES
('1', '2020-05-22 10:00-04', '2', 'Intro to SQL', 'tech', '2020-08-22 10:00-04', '2020-08-22 12:00-04', 'Technology, Coding & Programming',  4, 'jpeg'),
('2', '2020-06-22 15:00-04', '1', 'Cardio Workout', 'exercise', '2020-09-22 15:00-04', '2020-09-22 16:00-04' , 'Health, Fitness & Wellness', 5, 'jpeg'),
('3', '2020-06-23 18:00-04', '5', 'Drama Therapy in COVID Times', 'acting', '2020-09-23 18:00-04', '2020-09-23 19:00-04' , 'Film, Photography & Theatre', 3, 'jpeg'),
('4', '2020-07-01 17:00-04', '4', 'Javascript Coding', 'Code', '2020-10-01 17:00-04', '2020-10-01 18:00-04' ,'Technology, Coding & Programming', 2, 'jpeg'),
('5', '2020-08-16 16:00-04', '3', 'Vogue Dancing', 'Dance', '2020-10-16 16:00-04', '2020-10-16 17:00-04', 'Dance & Music', 5,'jpeg');

INSERT INTO registered_workshops
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
('E093QRw1swaW4KCQUON44IU2gcy2', '5');

INSERT INTO users_skills
(user_id, skills)
VALUES
('E093QRw1swaW4KCQUON44IU2gcy2', 'javascript'),
('E093QRw1swaW4KCQUON44IU2gcy2', 'cooking cajun'),
('E093QRw1swaW4KCQUON44IU2gcy2', 'ballet');

INSERT INTO workshop_skills
(workshop_id, skills)
VALUES
('1', 'sql'),
('2', 'aerobics'),
('5','dance');

