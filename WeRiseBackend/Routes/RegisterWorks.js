const registered = require("express").Router();
const {
  getWorkshop,
  deleteWorkshop,
  getAllRegistered,
  editWorkshop,
} = require("../Queries/WorkshopQueries");

registered.get("/:id", getWorkshop);
registered.delete("/:id", deleteWorkshop);
// registered.get("/all", getAllRegistered)
// registered.patch("/:id", editWorkshop);

module.exports = registered;
