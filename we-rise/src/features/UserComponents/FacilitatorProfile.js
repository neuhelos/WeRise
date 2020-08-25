import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { isMobile } from "react-add-to-calendar-hoc/lib/utils";
import {fetchUserById} from '../../Utilities/FetchFunctions'
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
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

  const FacilitatorProfile = ({props})=>{
    const {user} =props
    const match = useRouteMatch(`/Profile/:id`)
    const history = useHistory();

    const classes = useStyles();
    const [firstn, setFirstn] = useState("");
    const [lastn, setLastn] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [pic, setPic] = useState("");
    
    const fetchUser = async(id)=>{
       
    let res = await fetchUserById(id)
            debugger
    
    console.log(res)

    }
    useEffect(()=>{
        fetchUser(match.params.id)
    }, [match.params.id])
    // useEffect(()=>{
    //     fetchUser(id)
    // },[])
    return(
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

       <Typography>Facilitator's Bio: {bio}</Typography>
     </CardContent>
   </Grid>
     </Paper>
     </div>


    )
  }

  export default FacilitatorProfile;