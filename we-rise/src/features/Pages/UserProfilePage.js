import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../Utilities/apiURL";
import UserWorkshopAgenda from "../UserWorkshopsAgenda/UserWorkshopsAgenda";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { setCurrentUser } from "../Authentication/AuthenticationSlice";

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
    <Grid container className={classes.root}>
      User Profile
      <UserWorkshopAgenda />
    </Grid>
  );
};

export default UserProfilePage;
