import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import WorkshopFeedCard from './WorkshopSearchFeedCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';


import { fetchUpcomingWorkshops } from './WorkshopFeedSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
        width: '100%'
    },
}))

const WorkshopFeed = () => {

    const classes = useStyles()

    const workshopFeed = useSelector( state => state.workshopFeed)
    const dispatch = useDispatch()
    
    useEffect ( () => {
        dispatch(fetchUpcomingWorkshops())
    }, [])
    
    useEffect ( () => {
    }, [workshopFeed])

    let workshops = workshopFeed.map(workshop => {
        return <WorkshopFeedCard key={workshop.workshop_id} id={workshop.workshop_id} workshop={workshop}/>
    })
    
    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
            {workshops}
        </Grid>
    )
}

export default WorkshopFeed;
