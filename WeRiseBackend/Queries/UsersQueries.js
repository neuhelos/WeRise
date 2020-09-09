const database = require("../Database/database");

const createUser = async (req, res, next) => {
  try {

    console.log(req.body)
    let newUser = await database.one(
     "INSERT INTO users (id, firstn, lastn, email, bio, user_pic) " +
     "VALUES (${id}, ${firstn}, ${lastn}, ${email}, ${bio}, ${user_pic}) " +
     "RETURNING *", req.body 
    );
    res.json({
      status: "Success",
      message: "New User",
      payload: newUser

    })
  } catch (error) {
    console.log(error, "Hey now")
    res.status(404).json({
      status: "Error",
      message: "user cannot be created, try again",
      payload: error
    });
    
    next();
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
    console.log(req.params.id)
    let user = await database.one(
      "SELECT * FROM users WHERE id =$1", [
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "success",
      message: "User Retrieved",
      payload: user
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "User Not Found",
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
const editUser = async(req, res, next)=>{
  
  try {
    const {firstn, lastn, email, bio, user_pic} = req.body;
    const {id} =req.params;
    let user = {}
    if(firstn){
      let newInfo = await database.one(
        `UPDATE users SET firstn=$1 WHERE id=$2 RETURNING *`, [firstn, id])
        user={...newInfo}
    }
    if(lastn){
      let newInfo = await database.one(
        `UPDATE users SET lastn=$1 WHERE id=$2 RETURNING *`, [lastn, id])
        user={...newInfo}
    }
    if(email){
      let newInfo = await database.one(
        `UPDATE users SET email=$1 WHERE id=$2 RETURNING *`, [email, id])
        user={...newInfo}
    }
    if(bio){
      let newInfo = await database.one(
        `UPDATE users SET bio=$1 WHERE id=$2 RETURNING *`, [bio, id])
        user={...newInfo}
    }
    if(user_pic){
      let newInfo = await database.one(
        `UPDATE users SET user_pic=$1 WHERE id=$2 RETURNING *`, [user_pic, id])
        user={...newInfo}
    }

    res.status(200).json({
      status: "Success",
      user,
      message:"Profile Updated"
    })
  } catch (error) {
    next(error)
  }

}
module.exports = {
  createUser,
  deleteUser,
  getUser,
  getAllUsers,
  editUser
};
