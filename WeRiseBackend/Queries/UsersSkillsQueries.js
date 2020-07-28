const database = require("../Database/database");

const createUserSkills = async (req, res, next) => {
  try {

    console.log(req.body)
    let newUser = await db.one(
     "INSERT INTO users (user_id, skills) VALUES (${user_id}, ${skills}) " + 
     "RETURNING *", req.body 
    );
    res.json({
      status: "Success",
      message: "users Skills",
      payload: newUser

    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: "Error",
      message: "user skills cannot be created, try again",
      payload: error
    });
    
    next();
  }
  
};

const getUserSkills = async (req, res) => {
  try {
    let user = await database.any(
      "SELECT * FROM usersSkills WHERE id =$1", [
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "success",
      message: "found user",
      payload: user
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "user not found",
      payload: null
    });
  }
};

module.exports = {
  createUserSkills,
  getUserSkills,
};
