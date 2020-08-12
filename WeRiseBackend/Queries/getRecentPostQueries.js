const database = require("../Database/database");

const getRecentPost = async (req, res) => {
  try {
    let search = await database.any("SELECT * from created_workshops INNER JOIN users ON created_workshops.user_id = users.id ORDER BY created_workshops.id DESC LIMIT 3");
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
