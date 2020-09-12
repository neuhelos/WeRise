import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { fetchUserById } from "../../Utilities/FetchFunctions";
import {  useRouteMatch } from "react-router-dom";
import Modal from '../BaseComponents/Modal'
import EditUserModal from "./EditUserModal";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import {apiURL} from '../../Utilities/apiURL'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  gridSection: {
    padding: theme.spacing(1),
    height: '100%',
    width: '100%',
 
},
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    backgroundColor: "white",
    margin: "auto",
    justifyContent: 'left',
    alignContent: 'center',
    border: '2px solid  #FF0F7B'

  },
  text: {
    fontFamily: "audiowide",
    fontSize: 18,
    color: "black",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));
const FetchUser = () => {
  const currentUser = useSelector((state) => state.currentUserSession.uid);
  const classes = useStyles();
  const [profile, setProfile] = useState([]);
  const [firstn, setFirstn] = useState("");
  const [lastn, setLastn] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const params = useParams();
  let user_id = params.id;
  

  const fetchUser = async () => {
     let res = await fetchUserById(user_id);
    setProfile(res);
    // console.log(setProfile(res.id));
    setFirstn(res.firstn);
    setLastn(res.lastn);
    setEmail(res.email);
    setBio(res.bio);
    setPic(res.user_pic);
  };

  useEffect(() => {
    fetchUser();
  }, [user_id]);

  const [open , setOpen] = useState(false)
  const toggleModal = () => {
      setOpen(!open)
  }


  


  return (
    <div className="userProfile">
      <Paper className={classes.paper}>
        <Card className={classes.root} onClick={toggleModal}>
        <Grid className={classes.gridSection}  container item direction="column" justify="flex-start" alignItems="center" sm={12} md={5}>
          {/* <Card className="Container" /> */}
          <CardHeader
            className={classes.header}
            avatar={
              <Avatar aria-label="user" className={classes.avatar} src={pic} />
            }
            title={
              <Typography className={classes.text}>
                {" "}
                {firstn} {lastn}
              </Typography>
            }
            subheader={
              <>
                <Typography className={classes.text}>{email}</Typography>
              </>
            }
          />
          <CardMedia className={classes.media} image={pic} />
          <CardContent value={(firstn, lastn)} image={pic}>
            <Typography className={classes.text}>My Bio: {bio}</Typography>
          </CardContent>
        </Grid>
          </Card>
          <Modal open={open} toggleModal={toggleModal}>
               
                <EditUserModal handleCloseModal={toggleModal} currentUser={currentUser}/>
            </Modal>
      </Paper>
    </div>
  );
};
export default FetchUser;