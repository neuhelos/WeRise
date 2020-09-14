import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { apiURL } from '../../Utilities/apiURL';
import { useParams } from 'react-router-dom';
import Jitsi from '../jitsi/JitsiComponent'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        width: '100%',
        '& *': {
            fontFamily: 'audiowide'
        },
    },
}))


const VideoConference = () => {
    const [registeredWorkshop, setRegisteredWorkshops] = useState([]);
    
    const classes = useStyles()

    const params = useParams(); 

    const getWorkshopInfo = async() =>{
        try {
            const videoWorkshop = await axios.get(`${apiURL()}/workshops/videoConference/${params.workshopid}`)
            setRegisteredWorkshops(videoWorkshop.data.payload[0])
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    
    
    useEffect(() => {
        getWorkshopInfo();
    },[])

    return (
        <Grid className={classes.root} display='flex' direction='column' justify='center' alignItems='center'>
            <h1>Welcome to {registeredWorkshop.title}</h1>
            <h3>Led by : {registeredWorkshop.firstn} {registeredWorkshop.lastn}</h3>
            <Jitsi workshop = {registeredWorkshop}/>

            <h5>Description</h5>
            <p>{registeredWorkshop.descriptions}</p>
        </Grid>
    )
}

export default VideoConference;
