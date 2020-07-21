import database from '../Database/database';

const getRegisteredWorkshop = async (req, res, next) => {
    try {
      let workshop = await db.any(
          "SELECT ",
        //TITLE,IMAGE, DATE, START TIME END TIME, USER
        req.params.id
      );
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
  

  module.exports = {
    getRegisteredWorkshop,
  }