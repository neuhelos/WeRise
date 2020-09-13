const usersSkills = require("express").Router();
const { createUserSkills, getUsersSkills} = require("../Queries/UsersSkillsQueries");

usersSkills.post("/", createUserSkills);
usersSkills.get("/:id", getUsersSkills);


module.exports = usersSkills;
