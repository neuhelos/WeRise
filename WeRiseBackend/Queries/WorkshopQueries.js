const database = require("../Database/database");

const {queryColumns} = require('./queryBase')

const createWorkshop = async (req, res) => {
  try {
    let newWorkshop = await database.one('INSERT INTO created_workshops(id, user_id, title, descriptions, start_time, end_time, category, participants, workshop_img) VALUES(${id}, ${user_id}, ${title}, ${description}, ${start_time}, ${end_time}, ${category}, ${participants}, ${workshop_img}) RETURNING *', req.body);
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
    let workshop = await database.any(
      `SELECT ${queryColumns} 
      FROM created_workshops  
      INNER JOIN users 
      ON created_workshops.user_id = users.id  
      WHERE user_id = $1 AND created_workshops.start_time > NOW()` ,
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

const getSingleWorkshop = async (req, res) => {
  try {
    let workshop = await database.any(
      `SELECT created_workshops.id AS workshop_id, 
      created_workshops.user_id AS user_id, created_workshops.title, 
      created_workshops.descriptions, created_workshops.start_time, 
      created_workshops.end_time, created_workshops.category, 
      created_workshops.participants, created_workshops.workshop_img, 
      USERs.firstn, users.lastn, users.email, users.user_pic 
      FROM created_workshops  
      INNER JOIN users 
      ON created_workshops.user_id = users.id  
      WHERE created_workshops.id = $1 ` ,
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

const getPastWorkshop = async (req, res) => {
  try {
    let workshop = await database.any(
      `SELECT ${queryColumns} 
      FROM created_workshops  
      INNER JOIN users 
      ON created_workshops.user_id = users.id  
      WHERE user_id = $1 AND created_workshops.start_time < NOW()` ,
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


const getAllWorkshops = async (req, res) => {
  try {
    let search = await database.any(
      `SELECT ${queryColumns} 
      FROM created_workshops
      JOIN users ON created_workshops.user_id = users.id
      WHERE created_workshops.start_time >= NOW() AND 
      created_workshops.user_id != $1 AND
      created_workshops.id NOT IN (SELECT registered_workshops.workshop_id FROM registered_workshops WHERE registered_workshops.user_id = $1 )
      ORDER BY created_workshops.start_time`,
      [req.query.id]
    );
    res.status(200).json({
      status: "Success",
      message: "Found all workshop",
      payload: search
    });
  } catch (err) {
    console.log(err)
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
  getPastWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  editWorkshop,
  getSingleWorkshop
};
