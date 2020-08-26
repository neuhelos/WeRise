import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { apiURL } from '../../Utilities/apiURL'

import RegWorkCard from './RegisteredWorkshopCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import { fetchMyWorkshops } from './RegisterWorkshopSlice'

import WeRiseFist from '../../styling/Assets/Media/WeRiseFist.png'

const useStyles = makeStyles((theme) => ({
    root: {
        '& *': {
            fontFamily: 'audiowide',
        }
    },
    paperContainer: {
        width: '100%',
        backgroundColor: '#666666',
        padding: theme.spacing(1),
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
        padding: theme.spacing(2),
        color: '#FF0F7B',
    },
    image: {
        width: '50%',
    }
}))


const UserWorkshopsAgenda = () => {
    const classes = useStyles();

    const regworkshopFeed = useSelector( state => state.registeredWorkshops);

    const dispatch = useDispatch();

    useEffect ( () => {
        let isMounted = true
        if(isMounted) dispatch(fetchMyWorkshops())
        return () => isMounted = false
    }, [])

    let workshopsReq = regworkshopFeed.map(workshop => {
        return <RegWorkCard key={workshop.id} id={workshop.id} workshop={workshop}/>
    })
    
    const RegisteredWorshopFeedPlaceholder = () => {
        
        return (
            <Paper className={classes.paperContainer}>
                <Paper className={classes.paper}>
                    <img className={classes.image} src={WeRiseFist} alt={'WeRiseLogo'} />
                    <Typography align='center' className={classes.text} variant="h6">CREATE YOUR COMMUNITY & REGISTER FOR A WORKSHOP!</Typography>
                </Paper>
            </Paper>
        )
    }

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
            { regworkshopFeed.length ? workshopsReq : <RegisteredWorshopFeedPlaceholder /> }
        </Grid>
    )
}

export default UserWorkshopsAgenda;
