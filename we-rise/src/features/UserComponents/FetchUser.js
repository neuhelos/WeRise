import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { fetchUserById } from "../../Utilities/FetchFunctions";

import Modal from '../BaseComponents/Modal'
import EditUserModal from "./EditUserModal";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import {apiURL} from '../../Utilities/apiURL'
import Button from '@material-ui/core/Button';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import WeRiseTogether from '../../styling/Assets/Media/WeRiseTogetherProfileHeader.gif'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),

    '& *': {
        fontFamily: 'audiowide',
        outlineColor: '#36386D',
    },
  },
  paperWrapper: {
    width: '100%',
    padding: theme.spacing(1),
    background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
  },
  paper: {
    backgroundImage: `url(${WeRiseTogether})`,
    backgroundPosition: 'center',
    backgroundSize: '50%'
  },
  opacity: {
    backgroundColor: 'rgba(255,255,255,0.75)'
  },
  text: {
    color: "black",
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: theme.spacing(1),
    border: '4px solid  #F89B29',
  },
  icon : {
    color: '#FF0F7B',
    '&:hover': {
      color: '#F89B29',
      cursor: 'pointer'
    },
  },
}));
const FetchUser = () => {
  const currentUser = useSelector((state) => state.currentUserSession);
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

  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (

      
      <Paper className={classes.paperWrapper}>
          <Paper className={classes.paper}>
            <Paper className={classes.opacity}>
              <Grid className={classes.root}  container direction="row" justify="center" alignItems="center">
                <Grid container item direction="row" justify="flex-start" alignItems="center" xs={6}>
                  <Avatar aria-label="user" className={classes.avatar} src={pic} />
                  <Grid direction="column" justify="flex-start" alignItems="center">
                    <Typography variant='h5' gutterBottom={true}>{firstn} {lastn}</Typography>
                    <Grid direction="row" justify="flex-start" alignItems="center">
                      <FacebookIcon className={classes.icon} fontSize='large'/>
                      <InstagramIcon className={classes.icon} fontSize='large'/>
                      <TwitterIcon className={classes.icon} fontSize='large'/>
                      <LinkedInIcon className={classes.icon} fontSize='large'/>
                    </Grid>
                    {user_id === currentUser.uid ? 
                      <Button variant="contained" color="disabled" type="submit" onClick = {toggleModal}>Edit Your Profile</Button> 
                      : <Button variant="contained" color="primary" type="submit" onClick = {""}>Contact Me</Button>}
                  </Grid>
                </Grid>
                <Grid container item direction="row" justify="flex-end" alignItems="center" xs={6}>
                  <Typography variant='subtitle1' className={classes.text} gutterBottom={true}>My Bio: {bio}</Typography>
                </Grid>
              </Grid>
            </Paper>
        </Paper>

            <Modal open={open} toggleModal={toggleModal}>
                <EditUserModal handleCloseModal={toggleModal} currentUser={currentUser}/>
            </Modal>

 
      </Paper>
  );
};
export default FetchUser;
