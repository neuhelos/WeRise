const db = require("../Database/database");
const createWorkshop = async (req, res) => {
    try {
      let newWorkshop = await db.one(
        // "INSERT INTO pictures (picture, user_id) VALUES($1, $2) RETURNING id",
        // [req.body.image, req.params.id]
      );
      res.status(200).json({
        status: "success",
        message: "A new workshop was created",
        payload: newWorkshop
      });
    } catch (err) {
      res.status(404).json({
        status: err,
        message: "Workshop was not created",
        payload: null
      });
    }
  };
  const getWorkshop = async (req, res, next) => {
    try {
      let workshop = await db.any(
        // "SELECT p.id, p.picture, COUNT(v.picture_id) AS total_votes FROM pictures p JOIN users u ON u.id = p.user_id JOIN votes v ON v.picture_id = p.id GROUP BY p.picture, p.id, u.id HAVING u.id = $1",
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
    //   await db.none("DELETE FROM users WHERE id = $1", req.params.id);
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
        let search = await db.any("SELECT body FROM hashtags WHERE body LIKE '#%'");
        res.status(200).json({
            status: "Success",
            message: "Found workshop",
            payload: search
        })
    } catch (err) {
        res.status(404).json({
            status: err,
            message: "Could not find workshop",
            payload: null
        })
    }
}
const getAllWorkshops = async (req, res) => {
    try {
        let search = await db.any("SELECT *");
        res.status(200).json({
            status: "Success",
            message: "Found all workshop",
            payload: search
        })
    } catch (err) {
        res.status(404).json({
            status: err,
            message: "Could not find all workshop",
            payload: null
        })
    }
}


module.exports = {
createWorkshop,
getWorkshop,
deleteWorkshop,
getAllWorkshops,
// editWorkshop, 
searchWorkshop
}