import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { apiURL } from '../../Utilities/apiURL'

import RegWorkCard from './RegisteredWorkshopCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

import { fetchMyWorkshops } from './RegisterWorkshopSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
        width: '100%'
    },
}))


const UserWorkshopsAgenda = () => {
    const classes = useStyles();

    const regworkshopFeed = useSelector( state => state.registeredWorkshops);

    const dispatch = useDispatch();

    useEffect ( () => {
        dispatch(fetchMyWorkshops())
    }, [])

    let workshopsReq = regworkshopFeed.map(workshop => {
        return <RegWorkCard key={workshop.id} id={workshop.id} workshop={workshop}/>
    })
    

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
            {workshopsReq}
        </Grid>
    )
}

export default UserWorkshopsAgenda;
