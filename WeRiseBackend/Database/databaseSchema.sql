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
    id VARCHAR PRIMARY KEY UNIQUE,
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
    workshop_id VARCHAR REFERENCES created_workshops(id) ON DELETE SET NULL,
    workshop_id_user_id VARCHAR UNIQUE
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
('otmKzEboQMby4tLzx6X8vC33ve83', 'Jay', 'Jones', 'jayjones@pursuit.org','https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FJohnJay.jpeg?alt=media&token=90c32acb-5e72-4c20-8d7b-b57821c5017e', '6.4 Pursuit Fellow'),
('4BoeoW9pLWdNKD2WKq8Widdxmkj2', 'Deja', 'Flynn', 'dejaflynn@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FDejaFlynn.jpeg?alt=media&token=2f62e3c4-a344-454e-ba15-f5e3ec70f58f', '6.4 Pursuit Fellow'),
('QYkHDRiXmATQFHQS4wKcjKhqUGa2', 'Nilber', 'Remon', 'nilberremon@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FNilberRemon.png?alt=media&token=35d9a08c-a430-4843-9988-e6582d0443cf', '6.4 Pursuit Fellow'),
('rVOVAIwKwdUchSqjZl0xh3qqe0q1', 'Uduakabasi', 'Abasiurua', 'uduakabasiabasiurua@pursuit.org','https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FUduakabasiAbasiurua.jpeg?alt=media&token=4d85a760-0c46-4cb6-a8ae-aa0d3a857281', '6.4 Pursuit Fellow'),
('8uvDSPKzhjU5rllJU1Fy40Gn8x23', 'Danielle', 'Cherry', 'daniellecherry@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FDanielleCherry.png?alt=media&token=d16969cf-fe72-4d92-a2a8-b48802c0354e', '6.4 Pursuit Fellow'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', 'Demo', 'Account', 'demo@nilber.dev', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FTessaThompson.jpg?alt=media&token=02554b12-bfc8-419f-a1db-36d7cde08770', 'Hi im the Demo Account!'),
('E093QRw1swaW4KCQUON44IU2gcy2', 'WeRise', 'Together', 'guest@werise.org','https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FRainbowSmileyDefaultAvatar.png?alt=media&token=379959f1-6d89-43a4-bf01-92a68841c643', 'Hi im the Guest Account!'),
('eokavuu8ObRdvLA47RfSCZ74dI52', 'Samantha', 'Jimenez', 'samanthajimenez@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FSamanthaJimenez.jpeg?alt=media&token=752cf4ee-e663-4520-b7b8-30e5f2798d9a', '6.4 Pursuit Fellow'),
('ORwZBVSWrwW0Nug7HS3UgLl6Me63', 'Marializa', 'Martinez', 'mariamartinez@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FMarializaMartinez.jpeg?alt=media&token=1a4eeaec-0e19-47e6-b5d6-0d456ccfc01c', '6.4 Pursuit Fellow'),
('acKHM3rlo1ZZxwwTVEgC0gzUDBy2', 'Caroline', 'Kang', 'carolinekang@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FCarolineKang.jpeg?alt=media&token=6ab4d28f-156b-4267-9df3-a19160ef0045', 'Pursuit 6.4 Program Manager'),
('ZIRgXopThgcOFwZ5f4ZjVedPnSj1', 'Isaiah', 'Collazo', 'isaiahcollazo@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FIsaiahCollazo.jpeg?alt=media&token=7e6b8ae4-03fe-4577-8c0a-db4065394636', '6.4 Pursuit Fellow'),
('nB6JehE4RidvMjwTAq31D4EaGDS2', 'Corey', 'Ladovsky', 'coreyladovsky@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FCoreyLadovsky.jpeg?alt=media&token=c7826ddb-e083-4171-95b2-7e864b3fc119', 'Pursuit Lead Web Instructor'),
('C3vMD8SYhoOPP1mccTTW5adBkow1', 'Jimmy', 'Byess', 'jimmy@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FJImmyByess.jpeg?alt=media&token=9e2cbbdc-e5a7-444b-b08e-11ef2386b24f', 'Pursuit Lead Instructor'),
('5y3iP5DXmMXDslcRues5GaQHbCE3', 'Kong', 'Yang', 'congsongyang@pursuit.org', 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FCongsongYang.jpeg?alt=media&token=e0c0b378-3894-41fe-b69d-dfaac8be1681', '6.4 Pursuit Fellow');

INSERT INTO created_workshops
(id, posted, user_id, title, descriptions, start_time, end_time, category, participants, workshop_img)
VALUES
('1', '2020-08-22 10:00-04', '4BoeoW9pLWdNKD2WKq8Widdxmkj2', 'SQL Tutorial', 'An Intro to Mastering SQL', '2020-09-24 10:00-04', '2020-09-24 12:00-04', 'Technology, Coding & Programming',  4, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FSQLTutorial.png?alt=media&token=4a05132b-d42c-4375-988c-56029054a8a2'),
('2', '2020-06-22 15:00-04', 'otmKzEboQMby4tLzx6X8vC33ve83', 'Get Your Cardio On', 'Burn those Love Handles and Get Fit in Quarantine', '2020-09-22 15:00-04', '2020-09-22 16:00-04' , 'Health, Fitness & Wellness', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FCardioWorkout.jpg?alt=media&token=cec95c60-464b-4c5c-a12c-690e9e329dc1'),
('3', '2020-06-23 18:00-04', '8uvDSPKzhjU5rllJU1Fy40Gn8x23', 'Drama Therapy in COVID Times', 'Express Yourself while Socially Distancing', '2020-09-23 18:00-04', '2020-09-23 19:00-04' , 'Film, Photography & Theatre', 3, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FDramaTherapy.jpg?alt=media&token=07f82c15-ec78-41cc-95a1-1bb6195c72d1'),
('4', '2020-07-01 17:00-04', 'rVOVAIwKwdUchSqjZl0xh3qqe0q1', 'I Love Javascript', 'Start Your Coding Journey with a Bit of JS Basics', '2020-10-01 17:00-04', '2020-10-01 18:00-04' ,'Technology, Coding & Programming', 2, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FILoveJavascript.png?alt=media&token=3370fe6f-9cd4-469f-84a5-f2e2b567b2bb'),
('5', '2020-08-30 16:00-04', 'QYkHDRiXmATQFHQS4wKcjKhqUGa2', 'Werq it Vogue', 'Learn how to burn the runway with your vogue moves', '2020-10-16 16:00-04', '2020-10-16 17:00-04', 'Dance & Music', 5,'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FWerqitVogue.jpg?alt=media&token=931e1304-a1a2-45ad-813c-7f35b67cae5b'),
('6', '2020-07-25 18:00-04', 'QYkHDRiXmATQFHQS4wKcjKhqUGa2', 'Accessorizing Your Wardrobe', 'Its never too much, elevating your style with accessories.', '2020-09-18 18:00-04', '2020-09-18 19:00-04', 'Beauty & Fashion', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FAccessoriesWorkshop.jpg?alt=media&token=32bb8056-961c-4a84-93fc-04f787e96777'),
('7', '2020-07-10 15:00-04', 'QYkHDRiXmATQFHQS4wKcjKhqUGa2', 'Creating Community Change Through Tech', 'Brainstorming strategies for sharing technical know-how and skills for driving social justice in our communities', '2020-10-01 17:00-04', '2020-10-01 20:00-04', 'Community Organizing & Activism', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FCommunityRainbow.jpg?alt=media&token=067f5d9f-0b69-42a3-9fa3-811948262065'),
('8', '2020-06-25 13:00-04', 'E093QRw1swaW4KCQUON44IU2gcy2', 'MIDI basics', 'Musical Instrument Digital Interface', '2020-11-16 16:00-04', '2020-11-16 18:00-04',  'Dance & Music', 5, 'https://cdn.sparkfun.com/assets/learn_tutorials/4/0/8/daisy-2.png'),
('9', '2020-07-13 13:00-04', 'nB6JehE4RidvMjwTAq31D4EaGDS2', 'Mics and Speakers', 'Defining quality Mics and Speakers', '2020-11-20 16:00-04', '2020-11-20 18:00-04',  'Dance & Music', 3, 'https://www.fullcompass.com/common/products/lgr/320192.jpg'),
('10', '2020-08-25 13:00-04', 'E093QRw1swaW4KCQUON44IU2gcy2', 'Classic Films', 'Breaking down great movies', '2020-10-16 10:00-04', '2020-10-16 12:00-04',  'Film, Photography and Theater', 5, 'https://cdn.sparkfun.com/assets/learn_tutorials/4/0/8/daisy-2.png'),

('4c94f9ff-c634-4e78-9816-7313b7d6f5b2s', '2020-09-03 16:00-04', 'eokavuu8ObRdvLA47RfSCZ74dI52', 'Women, Nonbinary & POC-Centric Wikipedia Editing', 
'Join me for a workshop on how to update Wikipedia articles and write new ones.
I will also share my experience on donating work to Wikipedia and how to contribute to it in a way that helps
make marginalized communities more visible. All skill levels are welcome.
I"m working towards creating a space that encourages people of color and women to join the Wikipedia
movement and asks white men to focus on gaps in coverage on Wikipedia.',
'2020-09-20 17:00-04', '2020-09-20 19:00-04', 'Technology, Coding & Programming', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FWikipediaEditing.jpg?alt=media&token=5412b179-05fd-474d-b66d-f82022e2e6f3'),

('12985d00-a2c5-4c78-86da-b4860648f2f9', '2020-08-26 17:00-04', 'ORwZBVSWrwW0Nug7HS3UgLl6Me63','Reimagine Graphic Design in a Liberatory World', 
'Learn the bare-bones basics of Illustrator and Indesign, the leading software professionals and non-professionals use to 
design great posters, flyers and logos. We’ll cover making and editing vectors in Illustrator and basic layout for a poster 
in Indesign. If you don’t own a copy of the Illustrator and InDesign please download the free 30-day a trial 
version from Adobe Creative Suite prior to the workshop so you can follow along!',
'2020-10-03 17:00-04', '2020-10-03 20:00-04', 'Art & Design', 4, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FVisualResistance.png?alt=media&token=664084da-3e75-4c27-be5b-6b2bc0d725a4'),

('f0c950de-d484-418d-b25a-7447cdbace5f', '2020-08-29 18:00-04', 'acKHM3rlo1ZZxwwTVEgC0gzUDBy2', 'Women Know Power Tools', 
'A series of household DIY tutorials made by women, for women giving instructions on basic DIY power tool enhanced tasks 
like changing a lightbulb, smashing a window, painting a wall and using a drill.
You are encouraged to share your power tool sharpened knowledge and create your own workshop',
'2020-09-17 16:00-04', '2020-09-17 18:00-04', 'Home Improvement & Garden', 3, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FDIYWomen.jpg?alt=media&token=050d1114-6e07-4b6f-a2f3-9c26f22375e6'),

( '7e01c9e2-4fed-4a7e-80f2-6a8509ad1417', '2020-09-05 14:00-04', 'ZIRgXopThgcOFwZ5f4ZjVedPnSj1', 'Job Ready in Tech',
'Becoming job ready in the pursuit of a career in the tech field. From DSA-intensive technical interviews to resume building and
building and developing portfolio-ready projects for showcasing to recruiters', 
'2020-11-20 16:00-04', '2020-11-20 18:00-04', 'Job Readiness & Professional Development', 3, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FJobReady.jpeg?alt=media&token=6fab506d-5a14-4cde-9bd2-ec0c4e3e907d'),

( 'c542f259-f4de-4bb4-bcc9-80f03c615362', '2020-09-05 14:00-04', 'C3vMD8SYhoOPP1mccTTW5adBkow1', 'Cooking Hacks You Should Know',
'A hack is a celebration of a certain amount of acquired understanding. When you understand a problem in a certain way and can 
find a way to fix it, there’s great joy in that. Make your kitchen your laboratory and experience the thrill of experimentation
with hacks that will sharpen your culinary skills',
'2020-11-06 15:00-04', '2020-11-06 16:00-04', 'Food & Culinary Arts', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FCookingHacks.jpg?alt=media&token=65faf311-3f80-4ce5-b97a-60b203d93535'),

( '0a317023-8ac4-42c5-ae61-c044eb9e8a7a', '2020-08-29 13:00-04', '5y3iP5DXmMXDslcRues5GaQHbCE3', 'DIY Radical Collaborative Publishing', 
'This workshop covers the history and contemporary applications of radical independent and collaborative publishing models 
including Cartoneras, zines, protest posters, prints, mud stencils, social sculptures, art builds, and more.
Participants will learn effective devices of democratization by creating unique hand-painted, hinge and stab bound 
structures using cardboard and up-cycled materials. Such structures enable social, political, and artistic expressions 
and merge visual and literary forms. The hinge-bound structure can double as a multi tool (“swiss army knife”) of protest posters 
— made for and by the people! Participants are responsible for sourcing their own supplies from the materials list. 
Teaching artists will answer questions about materials in advance of the workshop start date.',
'2020-12-13 18:00-04', '2020-12-13 21:00-04', 'Creative Writing & Literature', 5, 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/Workshop%2FHingeandStabBoundStructures.jpg?alt=media&token=7939d795-bd39-4099-bd69-f44fe2f95183');


INSERT INTO registered_workshops
(user_id, workshop_id, workshop_id_user_id)
VALUES
('4BoeoW9pLWdNKD2WKq8Widdxmkj2', '3','4BoeoW9pLWdNKD2WKq8Widdxmkj23'),
('QYkHDRiXmATQFHQS4wKcjKhqUGa2', '1','QYkHDRiXmATQFHQS4wKcjKhqUGa21'),
('otmKzEboQMby4tLzx6X8vC33ve83', '2','otmKzEboQMby4tLzx6X8vC33ve832'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '2', 'ilFicLgXB5O9utKaS8WCn4UaQh532'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '3', 'ilFicLgXB5O9utKaS8WCn4UaQh533'),
('ilFicLgXB5O9utKaS8WCn4UaQh53', '5', 'ilFicLgXB5O9utKaS8WCn4UaQh535'),
('E093QRw1swaW4KCQUON44IU2gcy2', '3','E093QRw1swaW4KCQUON44IU2gcy23'),
('E093QRw1swaW4KCQUON44IU2gcy2', '4','E093QRw1swaW4KCQUON44IU2gcy24'),
('E093QRw1swaW4KCQUON44IU2gcy2', '5','E093QRw1swaW4KCQUON44IU2gcy25');

INSERT INTO users_skills
(id, user_id, skills)
VALUES
('1','E093QRw1swaW4KCQUON44IU2gcy2', 'javascript'),
('2','E093QRw1swaW4KCQUON44IU2gcy2', 'cooking cajun'),
('3','E093QRw1swaW4KCQUON44IU2gcy2', 'ballet'),
('4', 'QYkHDRiXmATQFHQS4wKcjKhqUGa2', 'styling and fashion design'),
('5', 'QYkHDRiXmATQFHQS4wKcjKhqUGa2', 'community activism'),
('6','QYkHDRiXmATQFHQS4wKcjKhqUGa2', 'dance');


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