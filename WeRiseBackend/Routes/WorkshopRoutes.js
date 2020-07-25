const workshops = require("express").Router();
const {
  createWorkshop,
  getWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  editWorkshop,
  searchWorkshopByDate
} = require("../Queries/WorkshopQueries");
workshops.post("/", createWorkshop);
workshops.get("/:id", getWorkshop);
workshops.delete("/:id", deleteWorkshop);
workshops.get("/", getAllWorkshops);
workshops.put("/:id", editWorkshop);
workshops.get('/search/', searchWorkshopByDate)

module.exports = workshops;
