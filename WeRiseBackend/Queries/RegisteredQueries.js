const db = require('../Database/database');

const {queryColumns} = require('./queryUniversal')


const getRegisteredWorkshop = async (req, res, next) => {
    try {
      let workshops = await db.any(`SELECT created_workshops.id AS workshop_id, registered_workshops.id, created_workshops.title, created_workshops.start_time, firstn, lastn, USER_pic, created_workshops.descriptions, created_workshops.workshop_img 
      FROM registered_workshops 
      JOIN created_workshops ON registered_workshops.workshop_id = created_workshops.id 
      JOIN users ON created_workshops.user_id = users.id  
      WHERE registered_workshops.user_id = $1 
      ORDER BY created_workshops.start_time`,
      [
        req.params.id,
      ]);
      res.status(200).json({
        status: "success",
        message: "User Registered Workshops",
        payload: workshops,
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: err,
        message: "No Registered Workshops Found for User",
        payload: null,
      });
    }
  };

  // const getAllRegistered = async (req, res, next)=>{
  //   try {
  //     const registered = await db.any(
  //       `SELECT registered_workshops.workshop_id, users.firstn, users.lastn FROM registered_workshops 
  //       INNER JOIN users ON registered_workshops.user_id = users.id 
  //       WHERE registered_workshops.workshop_id = $1 
  //       ORDER BY registered_workshops.id DESC`, 
  //       [req.params.id]
  //     );
  //     res.json({
  //       status: "success",
  //       message: 'users registered for workshop',
  //       payload: registered
  //     })
      
  //   } catch (error) {
  //     res.status(404).json({
  //       status: err,
  //       message: "There are no workshop found for the specified user",
  //       payload: null,
  //     });
      
  //   }
  // }

  const getRegisteredCount = async (req, res, next)=>{
    try {
      const registered = await db.any(
        'SELECT count(workshop_id) AS workshop_count FROM registered_workshops'
      );
      res.json({
        status: "success",
        message: 'Workshop Participant Count',
        payload: registered
      })
      
    } catch (error) {
      res.status(404).json({
        status: err,
        message: "There are no workshop found for the specified user",
        payload: null,
      });
      
    }
  }

  const deleteRegistration = async (req, res) => {
    try {
      let resWork = await db.one('DELETE FROM registered_workshops WHERE id = $1 RETURNING workshop_id',req.params.id);
      let workshop = await db.one(`SELECT ${queryColumns} from users JOIN created_workshops ON created_workshops.user_id = users.id WHERE created_workshops.id =$1`, resWork.workshop_id);
      res.status(200).json({
        status: "success",
        message: "The workshop is unregistered",
        payload: workshop
      });
    } catch (err) {
      console.log(err)
      res.status(404).json({
        status: err,
        message: "The workshop was not deleted"
      });
    }
  };

  const createRegistration = async (req, res, next) => {
    console.log(req.body)
    try {
        let registration = await db.one('INSERT INTO registered_workshops (user_id, workshop_id, workshop_id_user_id) VALUES( ${user_id}, ${workshop_id}, ${workshop_id_user_id} ) RETURNING *', req.body);
        let workshop = await db.one(`SELECT ${queryColumns} from users JOIN created_workshops ON created_workshops.user_id = users.id where created_workshops.id =$1`, registration.workshop_id);
        res.status(200).json({
            status: "Success",
            message: "Successful Workshop Registration",
            payload: workshop
        })
    } catch (error){
        res.status(400).json({
            status: "Error",
            message: "Error",
            payload: error
        })
    }
}

  module.exports = {
    getRegisteredWorkshop, deleteRegistration, createRegistration, getRegisteredCount
  }