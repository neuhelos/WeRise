const registered = require("express").Router();
const {
  getRegisteredWorkshop,
  deleteRegistration,
  createRegistration,
  getRegisteredCount
} = require("../Queries/RegisteredQueries");

registered.get("/:id", getRegisteredWorkshop);
registered.delete("/:id", deleteRegistration);
//registered.get("/all/:id", getAllRegistered);
registered.get("/count/:id", getRegisteredCount);
registered.post("/", createRegistration);


module.exports = registered;
