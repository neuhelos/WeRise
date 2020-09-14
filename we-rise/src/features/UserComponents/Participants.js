import React, { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import axios from 'axios';
import { apiURL } from '../../Utilities/apiURL';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            outlineColor: '#36386D',
            border: 'none',
        },
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        '&:hover': {
            border: '3px solid #F89B29'
        }
    },
    participant: {
        width: '20%',
        '&:hover': {
            cursor: 'pointer'
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
        <Grid className={classes.root} container display="flex" direction="row" justify="center" alignItems="center">
            {WorkshopParticipants.map(participant => {
                return(
                    <Grid className={classes.participant} container onClick={userProfileLink} display="flex" direction="column" justify="center" alignItems="center">
                        <Avatar src= {participant.user_pic} className={classes.avatar} onClick={userProfileLink}/>
                        <Typography align='center' onClick={userProfileLink} className={classes.text}>{participant.firstn} {participant.lastn}</Typography> 
                    </Grid>
                )})}
        </Grid>
        <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
        </>
    )
}

export default ParticipantsModal;