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
      let res = await axios.get(`${API}/users/`);
      debugger;
      console.log(setProfile(res.data.payload));
      //setProfile(res.data.payload.currentUser)
      setFirstn(res.data.payload[10].firstn);
      setLastn(res.data.payload[10].lastn);
      setEmail(res.data.payload[10].email);
      setBio(res.data.payload[10].bio);
      setPic(res.data.payload[10].user_pic);
    } catch {}
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
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
      User Profile
      <Card className="Container" />
      <CardHeader title={firstn} subheader="User Name" />
      <CardMedia className={classes.media} image={pic} />
      <CardContent>
        <Typography>{bio}</Typography>

        <h2>{firstn}</h2>
        <h2>{lastn}</h2>
        <img src={pic}></img>
        <h3>{email}</h3>
        <h3>{bio}</h3>
      </CardContent>
      <UserWorkshopAgenda />
    </Grid>
  );
};

export default UserProfilePage;
