import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Authentication/AuthenticationSlice";
import Jiti from '../jitsi/JitsiComponent'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
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
   
    return (
        <div className = 'videoComponent'>
            <h1>Welcome to the Workshop</h1>
            <Jiti></Jiti>
        </div>
    )
}

export default VideoConference;
