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
('2', 'Deja', 'Flynn', 'dejaflynn@pursuit.org', 'http://localhost:3000/DejaFlynn.jpeg', '6.4 Pursuit Fellow'),
('3', 'Nilber', 'Remon', 'nilberremon@pursuit.org', 'http://localhost:3000/NilberRemonCroppedCircle.png', '6.4 Pursuit Fellow'),
('4', 'Uduakabasi', 'Abasiurua', 'uduakabasiabasiurua@pursuit.org','https://ca.slack-edge.com/TCVA3PF24-UN3UXSZMY-e20128673daa-512', '6.4 Pursuit Fellow'),
('5', 'Danielle', 'Cherry', 'daniellecherry@pursuit.org','http://localhost:3000/DanielleCherry.png', '6.4 Pursuit Fellow'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', 'Demo', 'Account', 'demo@nilber.dev','https://www.aceshowbiz.com/images/photo/drake.jpg', 'Hi im the Demo Account!'),
('E093QRw1swaW4KCQUON44IU2gcy2', 'Guest', 'Account', 'guest@werise.org','https://www.aceshowbiz.com/images/photo/drake.jpg', 'Hi im the Guest Account!');

INSERT INTO created_workshops
(id, posted, user_id, title, descriptions, start_time, end_time, category, participants, workshop_img)
VALUES
('1', '2020-05-22 10:00-04', '2', 'SQL Tutorial', 'An Intro to Mastering SQL', '2020-08-22 10:00-04', '2020-08-22 12:00-04', 'Technology, Coding & Programming',  4, 'https://lh3.googleusercontent.com/ZWYWjkdD41Rrw8r7tNjTvOePzGOVpq-zSk1yAD3wv4iWjUSgKzw_QVHgehPevnaotRo'),
('2', '2020-06-22 15:00-04', '1', 'Get Your Cardio On', 'Burn those Love Handles and Get Fit in Quarantine', '2020-09-22 15:00-04', '2020-09-22 16:00-04' , 'Health, Fitness & Wellness', 5, 'https://legacy.travelnoire.com/wp-content/uploads/2019/10/Canva-African-American-Woman-Covered-in-Sweat-from-Boxing-Punching-Bag-Taking-off-Gloves.jpg'),
('3', '2020-06-23 18:00-04', '5', 'Drama Therapy in COVID Times', 'Express Yourself while Socially Distancing', '2020-09-23 18:00-04', '2020-09-23 19:00-04' , 'Film, Photography & Theatre', 3, 'https://www.marinshakespeare.org/wp-content/uploads/2018/10/Ariel-DSC_0749.jpg'),
('4', '2020-07-01 17:00-04', '4', 'I Love Javascript', 'Start Your Coding Journey with a Bit of JS Basics', '2020-10-01 17:00-04', '2020-10-01 18:00-04' ,'Technology, Coding & Programming', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRkILRijL6r1-ctV9uojAyUxg21EZLwjWOMAg&usqp=CAU'),
('5', '2020-08-14 16:00-04', '3', 'Werq it Vogue', 'Learn how to burn the runway with your vogue moves', '2020-10-16 16:00-04', '2020-10-16 17:00-04', 'Dance & Music', 5,'https://i2.wp.com/nypost.com/wp-content/uploads/sites/2/2019/06/21a.mjheaderta_rr.jpg?quality=80&strip=all&ssl=1'),
('6', '2020-07-25 18:00-04', '3', 'Accessorizing Your Wardrobe', 'Its never too much, elevating your style with accessories.', '2020-09-16 18:00-04', '2020-09-16 19:00-04', 'Beauty & Fashion', 5, 'image'),
('7','2020-07-10 15:00-04', '3', 'Creating Community Change Through Tech', 'Brainstorming strategies for sharing technical know-how and skills for driving social justice in our communities', '2020-10-01 17:00-04', '2020-10-01 20:00-04' 'Community Organizing & Activism', 5, 'image');

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
('E093QRw1swaW4KCQUON44IU2gcy2', '5');

INSERT INTO users_skills
(id, user_id, skills)
VALUES
('1','E093QRw1swaW4KCQUON44IU2gcy2', 'javascript'),
('2','E093QRw1swaW4KCQUON44IU2gcy2', 'cooking cajun'),
('3','E093QRw1swaW4KCQUON44IU2gcy2', 'ballet'),
('4', '3', 'styling and fashion design'),
('4', '3', 'community activism'),
('4','3', 'dance')


INSERT INTO workshop_skills
(id, workshop_id, skills)
VALUES
('1','1', 'sql'),
('2','2', 'aerobics'),
('3','5','dance'),
('4', '3', 'acting'),
('5', '4', 'programming'),
('6', '6', 'fashion outfit design'),
('7', '6', 'styling'),
('8', '7', 'civic tech'),
('9', '7', 'social justice'),
('10', '7', 'community organizing activism'),
('11', '6', 'fashion budgeting')