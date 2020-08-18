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

CREATE INDEX created_workshops_index ON created_workshops(start_time);
CREATE INDEX registered_workshops_index ON registered_workshops(workshop_id);
CREATE INDEX workshop_skills_index ON workshop_skills(skills);

INSERT INTO users
(id, firstn, lastn,  email, user_pic, bio)
VALUES
('1', 'Jay', 'Jones', 'jayjones@pursuit.org','https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FJohnJay.jpeg?alt=media&token=90c32acb-5e72-4c20-8d7b-b57821c5017e', '6.4 Pursuit Fellow'),
('2', 'Deja', 'Flynn', 'dejaflynn@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FDejaFlynn.jpeg?alt=media&token=2f62e3c4-a344-454e-ba15-f5e3ec70f58f', '6.4 Pursuit Fellow'),
('3', 'Nilber', 'Remon', 'nilberremon@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FNilberRemon.png?alt=media&token=35d9a08c-a430-4843-9988-e6582d0443cf', '6.4 Pursuit Fellow'),
('4', 'Uduakabasi', 'Abasiurua', 'uduakabasiabasiurua@pursuit.org','https://ca.slack-edge.com/TCVA3PF24-UN3UXSZMY-e20128673daa-512', '6.4 Pursuit Fellow'),
('5', 'Danielle', 'Cherry', 'daniellecherry@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FDanielleCherry.png?alt=media&token=d16969cf-fe72-4d92-a2a8-b48802c0354e', '6.4 Pursuit Fellow'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', 'Demo', 'Account', 'demo@nilber.dev', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FTessaThompson.jpg?alt=media&token=02554b12-bfc8-419f-a1db-36d7cde08770', 'Hi im the Demo Account!'),
('E093QRw1swaW4KCQUON44IU2gcy2', 'Guest', 'Account', 'guest@werise.org','https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FTessaThompson.jpg?alt=media&token=b8212f99-0cf4-4a34-8c91-a5694fc2ecd7', 'Hi im the Guest Account!');

INSERT INTO created_workshops
(id, posted, user_id, title, descriptions, start_time, end_time, category, participants, workshop_img)
VALUES
('1', '2020-05-22 10:00-04', '2', 'SQL Tutorial', 'An Intro to Mastering SQL', '2020-08-22 10:00-04', '2020-08-22 12:00-04', 'Technology, Coding & Programming',  4, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FSQLTutorial.png?alt=media&token=4a05132b-d42c-4375-988c-56029054a8a2'),
('2', '2020-06-22 15:00-04', '1', 'Get Your Cardio On', 'Burn those Love Handles and Get Fit in Quarantine', '2020-09-22 15:00-04', '2020-09-22 16:00-04' , 'Health, Fitness & Wellness', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FCardioWorkout.jpg?alt=media&token=cec95c60-464b-4c5c-a12c-690e9e329dc1'),
('3', '2020-06-23 18:00-04', '5', 'Drama Therapy in COVID Times', 'Express Yourself while Socially Distancing', '2020-09-23 18:00-04', '2020-09-23 19:00-04' , 'Film, Photography & Theatre', 3, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FDramaTherapy.jpg?alt=media&token=07f82c15-ec78-41cc-95a1-1bb6195c72d1'),
('4', '2020-07-01 17:00-04', '4', 'I Love Javascript', 'Start Your Coding Journey with a Bit of JS Basics', '2020-10-01 17:00-04', '2020-10-01 18:00-04' ,'Technology, Coding & Programming', 2, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FILoveJavascript.png?alt=media&token=3370fe6f-9cd4-469f-84a5-f2e2b567b2bb'),
('5', '2020-08-14 16:00-04', '3', 'Werq it Vogue', 'Learn how to burn the runway with your vogue moves', '2020-10-16 16:00-04', '2020-10-16 17:00-04', 'Dance & Music', 5,'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FWerqitVogue.jpg?alt=media&token=931e1304-a1a2-45ad-813c-7f35b67cae5b'),
('6', '2020-07-25 18:00-04', '3', 'Accessorizing Your Wardrobe', 'Its never too much, elevating your style with accessories.', '2020-09-16 18:00-04', '2020-09-16 19:00-04', 'Beauty & Fashion', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FAccessoriesWorkshop.jpg?alt=media&token=32bb8056-961c-4a84-93fc-04f787e96777'),
('7', '2020-07-10 15:00-04', '3', 'Creating Community Change Through Tech', 'Brainstorming strategies for sharing technical know-how and skills for driving social justice in our communities', '2020-10-01 17:00-04', '2020-10-01 20:00-04', 'Community Organizing & Activism', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FCommunityRainbow.jpg?alt=media&token=067f5d9f-0b69-42a3-9fa3-811948262065'),
('8', '2020-06-25 13:00-04', 'E093QRw1swaW4KCQUON44IU2gcy2', 'MIDI basics', 'Musical Instrument Digital Interface', '2020-07-16 16:00-04', '2020-07-16 18:00-04',  'Dance & Music', 5, 'https://cdn.sparkfun.com/assets/learn_tutorials/4/0/8/daisy-2.png'),
('9', '2020-08-25 13:00-04', 'E093QRw1swaW4KCQUON44IU2gcy2', 'Mics and Speakers', 'Defining quality Mics and Speakers', '2020-09-20 16:00-04', '2020-09-20 18:00-04',  'Dance & Music', 3, 'https://www.fullcompass.com/common/products/lgr/320192.jpg'),
('10', '2020-09-25 13:00-04', 'E093QRw1swaW4KCQUON44IU2gcy2', 'Classic Films', 'Breaking down great movies', '2020-10-16 10:00-04', '2020-10-16 12:00-04',  'Film, Photography and Theater', 5, 'https://cdn.sparkfun.com/assets/learn_tutorials/4/0/8/daisy-2.png');

INSERT INTO registered_workshops
(user_id, workshop_id)
VALUES
('2', '3'),
('3', '1'),
('1', '2'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '2'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '3'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '5'),
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
('5', '3', 'community activism'),
('6','3', 'dance');


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
('11', '6', 'fashion budgeting');