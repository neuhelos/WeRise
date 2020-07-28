const userSkills = require("express").Router();
const { createUserSkills, getUserSkills} = require("../Queries/UsersSkillsQueries");

userSkills.post("/", createUserSkills);
userSkills.get("/:id", getUserSkills);


module.exports = userSkills;
