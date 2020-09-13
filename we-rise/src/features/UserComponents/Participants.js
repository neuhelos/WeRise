import React, { useState, useEffect } from 'react'
import  { useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import axios from 'axios';
import { apiURL } from '../../Utilities/apiURL';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
    },
}))


const ParticipantsModal = ({ handleCloseModal, workshop, handleBack }) => {
    
    const history = useHistory();
    const classes = useStyles();
    const [WorkshopParticipants, setWorkshopParticipants] = useState([]);

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
                <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
                <ul>
                    <li><img src= {participant.user_pic}/> {participant.firstn} {participant.lastn}</li>
                </ul>
                
                </Grid>

        )})}
        <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
        </>
    )
}

export default ParticipantsModal;