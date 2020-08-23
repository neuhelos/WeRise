const database = require("../Database/database");

const queryColumns = `
    created_workshops.id AS workshop_id,
    created_workshops.user_id,
    created_workshops.title,
    created_workshops.descriptions,
    created_workshops.start_time,
    created_workshops.end_time,
    created_workshops.category,
    created_workshops.participants,
    created_workshops.workshop_img,
    users.id AS user_id,
    users.firstn,
    users.lastn,
    users.email,
    users.user_pic
  `

const getRecentPost = async (req, res) => {
  try {
    let search = await database.any(`
    SELECT ${queryColumns},
    (SELECT COUNT(workshop_id) FROM registered_workshops WHERE created_workshops.id = registered_workshops.workshop_id) AS workshop_count
    FROM created_workshops 
    INNER JOIN users ON created_workshops.user_id = users.id
    WHERE created_workshops.start_time >= NOW()
    ORDER BY created_workshops.posted DESC LIMIT 3`);
    res.status(200).json({
      status: "Success",
      message: "Workshop Recent Posts Successful",
      payload: search
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "No Workshops Found",
      payload: null
    });
  }
};


module.exports = {
    getRecentPost,
};
