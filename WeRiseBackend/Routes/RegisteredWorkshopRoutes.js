const registered = require("express").Router();
const {
  getAllRegisteredWorkshops,
  deleteRegistration,
  createRegistration,
  getRegisteredCount,
  getAllWhoRegistered
} = require("../Queries/RegisteredQueries");

registered.get("/:id", getAllRegisteredWorkshops);
registered.delete("/:id", deleteRegistration);
registered.get("/all/:id", getAllWhoRegistered);
registered.get("/count/:id", getRegisteredCount);
registered.post("/", createRegistration);


module.exports = registered;
