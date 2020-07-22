const db = require("../Database/database");

const createUser = async (req, res) => {
  try {
    let newUser = await db.one(
      'INSERT INTO users(id, firstName, lastName, password, email, user_pic, bio, instagram, facebook, twitter, linkedIn) VALUES(${firstName}${lastName}${password}${email}${user_pic}${bio}${instagram}${facebook}${twitter}${linkedIn}) RETURNING *',
      [
        req.body.id,
        req.body.firstName,
        req.body.lastName,
        req.body.password,
        req.body.email,
        req.body.user_pic,
        req.body.bio,
        req.body.instagram,
        req.body.facebook,
        req.body.twitter,
        req.body.linkedIn



      ]
    );
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
    await db.none(`DELETE FROM users WHERE id = ${req.params.id} RETURNING *`);
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
    let user = await db.any(
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
    let search = await db.any("SELECT * from users");
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
