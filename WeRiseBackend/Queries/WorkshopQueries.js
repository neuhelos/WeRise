const database = require("../Database/database");


const createWorkshop = async (req, res) => {
  try {
    let newWorkshop = await database.one('INSERT INTO created_workshops(id, posted, user_id, title, descriptions, start_time, end_time, category, participants, workshop_img) VALUES(${id}, ${title}, ${descriptions}, ${category}, ${posted}, ${start_time}, ${end_time}, ${workshop_image}, ${participants}) RETURNING *', req.body);
    res.status(200).json({
      status: "success",
      message: "A new workshop was created",
      payload: newWorkshop
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({
      status: err,
      message: "Workshop was not created",
      payload: null,
    });
  }
};
const getWorkshop = async (req, res) => {
  try {
    let workshop = await database.one(
      "SELECT * FROM created_workshops WHERE id = $1",
      req.params.id
    );
    res.status(200).json({
      status: "success",
      message: "Workshop Found",
      payload: workshop
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "No Workshop Found",
      payload: null
    });
  }
};
const deleteWorkshop = async (req, res) => {
  try {
    await database.none(`DELETE FROM created_workshops WHERE id = ${req.params.id} RETURNING *`);
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
      "SELECT * FROM created_workshops WHERE title=$1", title.req.params
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
    let search = await database.any("SELECT * FROM created_workshops JOIN users ON created_workshops.user_id = users.id ORDER BY created_workshops.start_time");
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
      `UPDATE created_workshops SET date= '${req.body.date}', startTime=${req.body.startTime}', endTime = ${req.body.endTime}' WHERE id=${req.params.id} RETURNING *  `
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


module.exports = {
  createWorkshop,
  getWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  editWorkshop
};
