const database = require("../Database/database");

const getRecentPost = async (req, res) => {
  try {
    let search = await database.any("SELECT * from createdWorkshops ORDER BY id desc LIMIT 3");
    res.status(200).json({
      status: "Success",
      message: "Found all workshop",
      payload: search
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "Could not find any workshop",
      payload: null
    });
  }
};


module.exports = {
    getRecentPost,
};
