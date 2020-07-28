const database = require("../Database/database");

const searchWorkshops = async (req, res) => {
    
    try {
      let search = await database.any(
        "SELECT * FROM createdWorkshops WHERE title=$1", title.req.params
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