import React from "react";
import UserWorkshopAgenda from "../UserWorkshopsAgenda/UserWorkshopsAgenda";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import FacilitatorWorkshops from "../UserComponents/FacilitatorWorkshops";


import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import "../../styling/UserProfilePage.css";
import FetchUser from "../UserComponents/FetchUser";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    backgroundColor: 'grey'
 
  },
  text: {
    fontFamily: "audiowide",
    fontSize: 18,
    color: 'white',
   
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
 
}));


const UserProfilePage = ({user}) => {
  


  return (
    <div className="userProfile">
 
        <FetchUser/>
      {/* <UserWorkshopAgenda /> */}
      <FacilitatorWorkshops  />
      
    </div>
  );
};

export default UserProfilePage;
