const users = require("express").Router();
const { createUser, deleteUser, getUser } = require("../Queries/UsersQueries");

users.post("/", createUser);
users.delete("/", deleteUser);
users.get("/:id", getUser);

module.exports = users;
