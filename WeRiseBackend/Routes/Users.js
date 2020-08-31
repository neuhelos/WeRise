const users = require("express").Router();
const { createUser, deleteUser, getUser, getAllUsers } = require("../Queries/UsersQueries");

users.post("/", createUser);
users.delete("/:id", deleteUser);
users.get("/", getAllUsers)
users.get("/:id", getUser);

module.exports = users;
