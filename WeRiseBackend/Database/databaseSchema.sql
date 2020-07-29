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
('ilFicLgXB5O9utKaS8WCn4UaQh53', 'Demo', 'Account', 'demo@nilber.dev','https://www.aceshowbiz.com/images/photo/drake.jpg', 'hi im the demo account!'),
('E093QRw1swaW4KCQUON44IU2gcy2', 'Guest', 'Account', 'guest@werise.org','https://www.aceshowbiz.com/images/photo/drake.jpg', 'hi im the Guest account!');

INSERT INTO created_workshops
(id, posted, user_id, title, descriptions, start_time, end_time, category, workshop_img)
VALUES
('1', '2020-05-22 10:00-04', '2', 'Intro to SQL', 'tech', '2020-08-22 10:00-04', '2020-08-22 12:00-04', 'Technology, Coding & Programming','jpeg'),
('2', '2020-06-22 15:00-04', '3', 'Cardio Workout', 'exercise', '2020-09-22 15:00-04', '2020-09-22 16:00-04' , 'Health, Fitness & Wellness', 'jpeg'),
('3', '2020-06-23 18:00-04', 'abc1', 'Drama Therapy in COVID Times', 'acting', '2020-09-23 18:00-04', '2020-09-23 19:00-04' , 'Film, Photography & Theatre','jpeg'),
('4', '2020-07-01 17:00-04', 'abc1', 'Javascript Coding', 'Code', '2020-10-01 17:00-04', '2020-10-01 18:00-04' ,'Technology, Coding & Programming', 'jpeg'),
('5', '2020-08-16 16:00-04', 'abc1', 'Vogue Dancing', 'Dance', '2020-10-16 16:00-04', '2020-10-16 17:00-04', 'Dance & Music','jpeg');

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

