import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useSelector} from 'react-redux'
import {AuthSlice} from '../Authentication/AuthenticationSlice';
import UserWorkshopAgenda from '../UserWorkshopsAgenda/UserWorkshopsAgenda'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
}));

const UserProfilePage = () => {
  const classes = useStyles();
  const currUser = useSelector((state)=> state.currUser);
  useEffect(()=>{
      console.log(currUser)
  },[currUser])
  const displayCurrUser = ()=>{
      const{firstName  } = currUser.APIURL.firstName
      return(
          <>
         <p> {firstName}</p>
          </>
      )
  }

  return (
    <Grid container className={classes.root}>
      User Profile
      
      {displayCurrUser}
      <UserWorkshopAgenda/>
    </Grid>
  );
};

export default UserProfilePage;
