import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RegisteredWorkshopCard from './RegisteredWorkshopCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import Loading from './RegisteredWorkshopLoader'
import { fetchMyWorkshops } from './RegisteredWorkshopSlice'

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


const RegisteredWorkshops = () => {
    
    
    const classes = useStyles();
    
    const registeredWorkshopsFeed = useSelector( state => state.registeredWorkshops.feed);
    const loading = useSelector( state => state.registeredWorkshops.loading)

    const dispatch = useDispatch();


    useEffect ( () => {
        dispatch(fetchMyWorkshops())
    }, [])

    
    let workshops = registeredWorkshopsFeed.map(workshop => {
        return <RegisteredWorkshopCard key={workshop.id} id={workshop.id} workshop={workshop}/>
    })
    
    const RegisteredWorkshopFeedPlaceholder = () => {
        
        return (
            <Paper className={classes.paperContainer}>
                <Paper className={classes.paper}>
                    <img className={classes.image} src={WeRiseFist} alt={'WeRiseLogo'} />
                    <Typography align='center' className={classes.text} variant="h6">CREATE YOUR COMMUNITY & REGISTER FOR A WORKSHOP!</Typography>
                </Paper>
            </Paper>
        )
    }

    //setIsLoading(false)

    return (
        <>
        {loading ? <Loading/> : registeredWorkshopsFeed.length ?
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
            {workshops} 
        </Grid> : <RegisteredWorkshopFeedPlaceholder /> 
        }
        </>
    )
}

export default RegisteredWorkshops;
