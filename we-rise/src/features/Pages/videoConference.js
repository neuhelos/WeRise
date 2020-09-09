import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { apiURL } from '../../Utilities/apiURL';
import { useParams } from 'react-router-dom';
import Jitsi from '../jitsi/JitsiComponent'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

import '../../styling/jitsi.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'nowrap'
        }
    },
    gridSection: {
        padding: theme.spacing(1),
        height: '100%',
        width: '100%',
    },
    paper: {
        width: '90%',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        backgroundColor: '#282828',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    paperWrapper: {
        width: '90%',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: '#282828',
    },
    paperTitle: {
        width: '100%',
        backgroundColor: '#666666',
        color: '#FFFFFF',
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'audiowide'
    }
}))


const VideoConference = () => {
    const [registeredWorkshop, setRegisteredWorkshops] = useState([]);
    
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
        <Grid display='flex' direction='column' justify='center' className='videoComponent' alignItems='center'>
            <h1>Welcome to {registeredWorkshop.title}</h1>
            <h3>Led by : {registeredWorkshop.firstn} {registeredWorkshop.lastn}</h3>
            <Jitsi workshop = {registeredWorkshop}/>

            <h5>Description</h5>
            <p>{registeredWorkshop.descriptions}</p>
        </Grid>
    )
}

export default VideoConference;
