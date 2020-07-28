const workshops = require("express").Router();
const {
  createWorkshop,
  getWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  editWorkshop,
} = require("../Queries/WorkshopQueries");

const { searchWorkshops } = require("../Queries/WorkshopSearchQuery")

workshops.post("/", createWorkshop);
workshops.get("/:id", getWorkshop);
workshops.delete("/:id", deleteWorkshop);
workshops.get("/", getAllWorkshops);
workshops.put("/:id", editWorkshop);
workshops.get('/search/', searchWorkshops)

module.exports = workshops;
