const database = require("../Database/database");

const createUser = async (req, res) => {
  try {
    const {
      id, firstName, lastName, email, user_pic, bio, password
    } = req.body
    let newUser = await database.one(`INSERT INTO users(id, firstName, lastName, user_pic, bio, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [id, firstName, lastName, bio, password, email, user_pic ]);
    res.status(200).json({
      status: "success",
      message: "new user created",
      payload: newUser
    });
    
    
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "user cannot be created, try again",
      payload: null
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    await database.none(`DELETE FROM users WHERE id = ${req.params.id} RETURNING *`);
    res.status(200).json({
      status: "success",
      message: "user deleted"
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "user cannot ve deleted, try again",
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
