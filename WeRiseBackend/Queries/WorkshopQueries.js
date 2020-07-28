const database = require("../Database/database");
const createWorkshop = async (req, res) => {
  try {
    let newWorkshop = await database.one('INSERT INTO createdworkshops(id, title, category, descriptions, date, start_time, end_time, workshop_image) VALUES(${id}, ${title}, ${descriptions}, ${category}, ${date}, ${start_time}, ${end_time}, ${workshop_image}) RETURNING *', req.body);
    res.status(200).json({
      status: "success",
      message: "A new workshop was created",
      payload: newWorkshop
    });
  } catch (err) {
 
    res.status(404).json({
      status: err,
      message: "Workshop was not created",
      payload: null,
    });
  }
};
const getWorkshop = async (req, res) => {
  try {
    let workshop = await database.any(
      "SELECT * FROM createdworkshops WHERE id = $1",
      req.params.id
    );
    res.status(200).json({
      status: "success",
      message: "All workshops for one user",
      payload: workshop
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "There are no workshop found for the specified user",
      payload: null
    });
  }
};
const deleteWorkshop = async (req, res) => {
  try {
    await database.none(`DELETE FROM createdworkshops WHERE id = ${req.params.id} RETURNING *`);
    res.status(200).json({
      status: "success",
      message: "The workshop is deleted"
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "The workshop was not deleted"
    });
  }
};

const searchWorkshop = async (req, res) => {
  try {
    let search = await database.any(
      "SELECT * FROM createdworkshops WHERE title=$1", title.req.params
    );
    res.status(200).json({
      status: "Success",
      message: "Found workshop",
      payload: search
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "Could not find workshop",
      payload: null
    });
  }
};
const getAllWorkshops = async (req, res) => {
  try {
    let search = await database.any("SELECT * from createdworkshops");
    res.status(200).json({
      status: "Success",
      message: "Found all workshop",
      payload: search
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "Could not find all workshop",
      payload: null
    });
  }
};
const editWorkshop = async (req, res, next) => {
  try {
    let update = await database.one(
      `UPDATE createdworkshops SET date= '${req.body.date}', startTime=${req.body.startTime}', endTime = ${req.body.endTime}' WHERE id=${req.params.id} RETURNING *  `
    );
    res.status(200).json({
      status: "success",
      message: "workshop updated",
      payload: update
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "could not be updated",
      payload: null
    });
    next(error);
  }
};
// const searchWorkshopByDate = async (req, res, next) => {
//   try {
//     let searchByDate = await database.any(
//       `SELECT DISTINCT date,
//       ARRAY_AGG(createdWorkshops.id) AS id,
//       ARRAY_AGG(createdWorkshops.user_id) AS user_id,
//       ARRAY_AGG(createdWorkshops.title) AS title,
//       ARRAY_AGG(createdWorkshops.description) AS description,
//       ARRAY_AGG(createdWorkshops.date) AS date,
//       ARRAY_AGG(createdWorkshops.startTime) AS startTime,
//       ARRAY_AGG(createdWorkshops.endTime) AS endTime
//       FROM createdWorkshops
//       `
//     );
//     res.status(200).json({
//       status: "success",
//       message: "retrieved all workshops from date",
//       payload: searchByDate
//     });
//   } catch (error) {}
// };

module.exports = {
  createWorkshop,
  getWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  editWorkshop
};
