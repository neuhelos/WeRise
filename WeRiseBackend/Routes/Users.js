const users = require("express").Router();
const { createUser, deleteUser, getUser, getAllUsers } = require("../Queries/UsersQueries");

users.post("/", createUser);
users.delete("/", deleteUser);
users.get("/:id", getUser);
users.get("/", getAllUsers)

module.exports = users;
