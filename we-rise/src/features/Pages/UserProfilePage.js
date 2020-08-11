import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../Utilities/apiURL";
import UserWorkshopAgenda from "../UserWorkshopsAgenda/UserWorkshopsAgenda";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { setCurrentUser } from "../Authentication/AuthenticationSlice";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import '../../styling/UserProfilePage.css'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
}));

const UserProfilePage = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUserSession.uid);
  
  const [profile, setProfile] = useState([]);
  const [firstn, setFirstn] = useState("");
  const [lastn, setLastn] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const API = apiURL();
  const fetchUser = async () => {
    try {
      let res = await axios.get(`${API}/users/${currentUser}`);
      console.log(setProfile(res.data.payload[0]));
      setProfile(res.data.payload[0])
      setFirstn(res.data.payload[0].firstn);
      setLastn(res.data.payload[0].lastn);
      setEmail(res.data.payload[0].email);
      setBio(res.data.payload[0].bio);
      setPic(res.data.payload[0].user_pic);
    } catch(error) {
      console.log(error)
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    
    <div className='userProfile'>
    <Grid
      container
      className={classes.root}
      container
      display="flex"
      direction="column"
      justify="center"
      alignItems="center"
      wrap="nowrap"
      
      >
    
      <Card className="Container" />
      <CardHeader title={firstn, lastn} subheader="User Name" />
      <CardMedia className={classes.media} image={pic} />
      <CardContent value={firstn, lastn} image={pic}>
      <Avatar alt='profilePic' src={pic} className={classes.large}></Avatar>
        <h2>{firstn}</h2>
        <h2>{lastn}</h2>
        <img src={pic}></img>
        <h3>{email}</h3>
        <Typography>{bio}</Typography>
        {/* <h3>{bio}</h3> */}
      </CardContent>
    </Grid>
      <UserWorkshopAgenda />
      </div>
  );
};

export default UserProfilePage;
