const db = require('../Database/database');

const getRegisteredWorkshop = async (req, res, next) => {
    try {
      let workshop = await db.any("SELECT * FROM businesses WHERE id= $1", [
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
  
  const fetchAllRegisteredWorkshop = async (req, res, next)=>{
    try {
      const registered = await db.any(
        'SELECT * FROM registeredWorkshops JOIN users ON registeredWorkshops.user_id = users.id WHERE registeredWorkshops.users.id', 
        [req.params.id]
      );
      res.json({
        status: "success",
        message: 'workshop is registered by user',
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
  


  module.exports = {
    getRegisteredWorkshop, fetchAllRegisteredWorkshop
  }