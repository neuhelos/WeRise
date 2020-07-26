const database = require("../Database/database");

const createUser = async (req, res) => {
  try {
    // const {
    //   id, firstName, lastName, email, user_pic, bio, password
    // } = req.body
    let newUser = await database.one('INSERT INTO users(id, email, firstn, lastn, user_pic, bio) VALUES (${id}, ${email}, ${firstn}, ${lastn}, ${user_pic}, ${bio}) RETURNING *', req.body);
    res.status(200).json({
      status: "success",
      message: "new user created",
      payload: newUser
    });
    

  } catch (error) {
    console.log(error)
    res.status(500).json({
      
      status: error,
      message: "user cannot be created, try again",
      payload: null
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    await database.none('DELETE FROM users WHERE id = $1 RETURNING *', req.params.id);
    res.status(200).json({
      status: "success",
      message: "user deleted"
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "user cannot be deleted, try again",
    });
  }
};
const getUser = async (req, res) => {
  try {
    let user = await database.any(
      "SELECT * FROM users WHERE id =$1", [
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
const getAllUsers = async (req, res) => {
  try {
    let search = await database.any("SELECT * from users");
    res.status(200).json({
      status: "Success",
      message: "Found all users",
      payload: search
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "Could not find all users",
      payload: null
    });
  }
};
module.exports = {
  createUser,
  deleteUser,
  getUser,
  getAllUsers
};
