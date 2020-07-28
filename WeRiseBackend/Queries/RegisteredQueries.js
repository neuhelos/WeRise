const db = require('../Database/database');

const getRegisteredWorkshop = async (req, res, next) => {
    try {
      let workshop = await db.any("SELECT registeredworkshops.id, createdworkshops.title, createdworkshops.date, createdworkshops.start_time, createdworkshops.end_time FROM registeredworkshops INNER JOIN createdworkshops ON registeredworkshops.workshop_id = createdworkshops.id WHERE registeredworkshops.user_id = $1 ORDER BY registeredworkshops.id DESC",
      [
        req.params.id,
      ]);
      res.status(200).json({
        status: "success",
        message: "All registered workshops for one user",
        payload: workshop,
      });
    } catch (err) {
      res.status(404).json({
        status: err,
        message: "There are no workshop found for the specified user",
        payload: null,
      });
    }
  };
  
  // const fetchAllRegisteredWorkshop = async (req, res, next)=>{
  //   try {
  //     const registered = await db.any(
  //       'SELECT * FROM registeredWorkshops JOIN users ON registeredWorkshops.user_id = users.id WHERE registeredWorkshops.users.id', 
  //       [req.params.id]
  //     );
  //     res.json({
  //       status: "success",
  //       message: 'workshop is registered by user',
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
  

  const getAllRegistered = async (req, res, next)=>{
    try {
      const registered = await db.any(
        'SELECT registeredworkshops.workshop_id, users.firstn, users.lastn FROM registeredworkshops INNER JOIN users ON registeredworkshops.user_id = users.id WHERE registeredworkshops.workshop_id = $1 ORDER BY registeredworkshops.id DESC', 
        [req.params.id]
      );
      res.json({
        status: "success",
        message: 'users registered for workshop',
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
      await db.none(`DELETE FROM registeredworkshops WHERE id = ${req.params.id} RETURNING *`);
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

  const createRegistration = async (req, res, next) => {
    try {
        let registration = await db.one('INSERT INTO registeredworkshops (user_id, workshop_id) VALUES( ${user_id}, ${workshop_id},) RETURNING *', req.body);
        res.status(200).json({
            status: "success",
            message: "created a new Registration",
            payload: registration
        })
    } catch (err){
        console.log(err)
        console.log("Hey now",req.body)
        res.status(400).json({
            status: "Error",
            message: "Error",
            payload: err
        })
        next()  
    }
}

  module.exports = {
    getRegisteredWorkshop, getAllRegistered, deleteRegistration, createRegistration
  }