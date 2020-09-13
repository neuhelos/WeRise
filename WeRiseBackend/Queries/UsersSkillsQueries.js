const database = require("../Database/database");

const createUserSkills = async (req, res, next) => {
  try {
    let userSkill = await db.one(
     "INSERT INTO users (user_id, skills) VALUES (${user_id}, ${skills}) " + 
     "RETURNING *", req.body 
    );
    res.json({
      status: "Success",
      message: "User Skill Created",
      payload: userSkill

    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: "Error",
      message: "User Skill not Created",
      payload: error
    });
  }
  
};

const getUsersSkills = async (req, res) => {
  try {
    let skills = await database.any(
      "SELECT * FROM users_skills WHERE user_id = $1", 
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      message: "Skills By User",
      payload: skills
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "Skills Not Found",
      payload: null
    });
  }
};

module.exports = {
  createUserSkills,
  getUsersSkills,
};
