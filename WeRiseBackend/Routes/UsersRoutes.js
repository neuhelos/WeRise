const users = require("express").Router();
const { createUser, deleteUser, getUser, getAllUsers, editUser } = require("../Queries/UsersQueries");

users.post("/", createUser);
users.delete("/:id", deleteUser);
users.get("/", getAllUsers)
users.get("/:id", getUser);
users.patch("/:id", editUser)

module.exports = users;
