import React, { useState, useEffect } from 'react'
import  { useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import axios from 'axios';
import { apiURL } from '../../Utilities/apiURL';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../BaseComponents/Modal'


import EditWorkshop from './editWorkshop'
import WorkshopDetails from '../WorkshopFeed/WorkshopDetails'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            outlineColor: '#36386D',
            border: 'none',
        },
        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            '&:hover': {
                border: '3px solid #F89B29'
            }
        },
        text: {

        },
        participants: {
            fontFamily:'audiowide',
            color: '#FF0F7B',
            fontWeight: 700
        },
    },
}))


const ParticipantsModal = ({ handleCloseModal, workshop, handleBack }) => {
    
    const history = useHistory();
    const classes = useStyles();
    const [WorkshopParticipants, setWorkshopParticipants] = useState([]);

    const userProfileLink = () => {
        history.push(`/Profile/${workshop.user_id}`)
    }

    const getAllWhoRegistered = async() => {
        try{
            let participants = await axios.get(`${apiURL()}/registered/all/${workshop.workshop_id}`)
            setWorkshopParticipants(participants.data.payload); 
        } catch(err){
            console.log(err)
            throw Error(err)
        }
    }

    useEffect(() => {
        getAllWhoRegistered();
    },[workshop])


    return (
        <>
        {WorkshopParticipants.map(participant => {
            return(
                <Grid onClick={userProfileLink} className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">

                    <Avatar src= {participant.user_pic} className={classes.avatar} onClick={userProfileLink}/>
                    <Typography onClick={userProfileLink} className={classes.text}>{participant.firstn} {participant.lastn}</Typography> 
                
                </Grid>

        )})}
        <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
        </>
    )
}

export default ParticipantsModal;