import React, { useState } from 'react'
import { useHistory} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            textAlign: 'center',
            outlineColor: '#36386D',
            border: 'none',
            margin: theme.spacing(1)
        },
    },
    image : {
        width:'50%',
        height: '50%'
    }
}))


const MyWorkshopModal = ({ workshop }) => {
  const history = useHistory();
  const classes = useStyles();

  const currentTime = new Date().toLocaleString();
  const date = `${new Date(workshop.start_time).getMonth()+1}-${new Date(workshop.start_time).getDate()}-${new Date(workshop.start_time).getFullYear()}`
  const startTime = `${new Date(workshop.start_time).getHours()}:${new Date(workshop.start_time).getMinutes()}0`
  sessionStorage.setItem("workshopTitle", workshop.title);


  const workshopImage = workshop.workshop_img
  // Button should only show if the start_time is the same as the current time!
  return (
      <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
          <Typography variant='h4'>{workshop.title}</Typography>
          <Typography variant='h6'>Facilitator: {`${workshop.firstn} ${workshop.lastn}`}</Typography>
          <Typography variant='h10'>Description: {workshop.descriptions}</Typography>
          <img className={classes.image} src={workshopImage} alt="workshop.title"/>
          <Button variant="contained" color="primary" type="submit" onClick = {() => history.push("/videoConference")}> Join workshop </Button> 
      </Grid>
  )
}

export default MyWorkshopModal;

