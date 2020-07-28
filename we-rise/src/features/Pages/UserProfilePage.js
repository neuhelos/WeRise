import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../Utilities/apiURL";
import UserWorkshopAgenda from "../UserWorkshopsAgenda/UserWorkshopsAgenda";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { setCurrentUser } from "../Authentication/AuthenticationSlice";
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
const API = apiURL();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
}));

const UserProfilePage = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUserSession.uid);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentUser());
  }, []);
  useEffect(() => {}, [currentUser]);

//   let displayUser = currentUser.map((user) => {});

  return (
    <Grid container className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
      User Profile
      <Card className='Container'/>
      <CardHeader title="My Profile"
      subheader='User Name'
      />
      <CardMedia
      className = {classes.media}
      image="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
      title='profilePic'
      />
      <CardContent>

          <Typography>
              this holds the bio 
          </Typography>
          </CardContent>

      <UserWorkshopAgenda />
    </Grid>
  );
};

export default UserProfilePage;
