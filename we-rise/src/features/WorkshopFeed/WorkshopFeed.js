import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import { fetchUpcomingWorkshops } from './workshopFeedSlice'


const WorkshopFeed = () => {

    const workshopFeed = useSelector( state => state.workshopFeed)
    const dispatch = useDispatch()

    useEffect ( () => {
        
        dispatch(fetchUpcomingWorkshops())

    , [workshopFeed]})


    return (
        <Grid>
            WORKSHOP FEED
        </Grid>
    )
}

export default WorkshopFeed;
