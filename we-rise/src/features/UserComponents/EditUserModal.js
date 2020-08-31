import React, { useState } from 'react'
import  { useDispatch } from 'react-redux'
import axios from 'axios'
import { DateTime } from 'luxon'
import { useHistory} from 'react-router-dom'
import { apiURL } from '../../Utilities/apiURL'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { current } from '@reduxjs/toolkit'




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


const EditUserModal = ({ handleCloseModal, currentUser }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

    
  const currentUser = useSelector((state) => state.currentUserSession.uid);
  
    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            <Typography variant='h4'>{}</Typography>
            <Typography variant='h6'>Email: {`${currentUser.email}`}</Typography>
            <Typography variant='h10'>Bio: {currentUser.bio}</Typography>
            <img className={classes.image} src={currentUser.user_pic} alt="user_image"/>
           
        </Grid>
    )
}

export default EditUserModal;
