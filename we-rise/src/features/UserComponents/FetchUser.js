import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {apiURL} from '../../Utilities/apiURL'
import axios from "axios";
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
  const FetchUser =()=>{
    const currentUser = useSelector((state) => state.currentUserSession.uid);
    const classes = useStyles();

  const [profile, setProfile] = useState([]);
  const [firstn, setFirstn] = useState("");
  const [lastn, setLastn] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const API = apiURL();
  const fetchUser = async () => {
      try {
        // let res = await axios.get(`${API}/users/${currentUser}`);
        let res = await fetchUserById(currentUser)
        debugger
        console.log(setProfile(res[0].id));
        setProfile(res[0].id);
        setFirstn(res[0].firstn);
        setLastn(res[0].lastn);
        setEmail(res[0].email);
        setBio(res[0].bio);
        setPic(res[0].user_pic);
          
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="userProfile">
    <Paper className={classes.paper}>

   <Grid
     container
     className={classes.root}
     container
     display="flex"
     direction="column"
     justify="left"
     alignItems="left"
     wrap="nowrap"
     
     
     >
     <Card className="Container" />
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

       <Typography>My Bio: {bio}</Typography>
     </CardContent>
   </Grid>
     </Paper>
     </div>

  )

}
export default FetchUser;