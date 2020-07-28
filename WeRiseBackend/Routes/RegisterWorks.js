const registered = require("express").Router();
const {
  getRegisteredWorkshop,
  deleteRegistration,
  getAllRegistered,
  createRegistration
} = require("../Queries/RegisteredQueries");

registered.get("/:id", getRegisteredWorkshop);
registered.delete("/:id", deleteRegistration);
registered.get("/all/:id", getAllRegistered);
registered.post("/", createRegistration);


module.exports = registered;
