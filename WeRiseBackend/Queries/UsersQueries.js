const db = require("../Database/database");

const createUser = async (req, res, next) => {
  try {
      let newUser = await db.one(
          'INSERT INTO users(firstName, lastName, password, email, user_pic, bio, instagram, facebook, twitter, linkedIn) VALUES(${firstName}${lastName}${password}${email}${user_pic}${bio}${instagram}${facebook}${twitter}${linkedIn}) RETURNING *',
         req.body 
      );
      res.status(200).json({
          status: 'success',
          message: 'new user created',
          payload: newUser
      })
  } catch (error) {
      res.status(404).json({
          status: error,
          message: "user cannot be created, try again",
          payload: null
      });
  }
};
const deleteUser = async (req, res, next) => {
  try {
      await db.none("DELETE FROM  users WHERE id = $1", req.params.id)
      res.status(200).json({
          status: 'success', 
          message: "user deleted"
      })
  } catch (error) {
      res.status(404).json({
          status: error,
          message: "user cannot ve deleted, try again"
      })
  }
};
const getUser = async (req, res, next) => {
  try {
    let user = await db.one(
      "SELECT  * FROM users WHERE firstName =$1 ",
      req.params.firstName
    );
    res.status(200).json({
      status: "success",
      message: "found user",
      payload: user,
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "user not found",
      payload: null,
    });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
};
