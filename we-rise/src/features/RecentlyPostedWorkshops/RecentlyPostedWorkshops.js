import React, { useState, useEffect } from 'react'
import { apiURL } from '../../Utilities/apiURL'
import axios from 'axios'
import WorkshopFeedCard from '../WorkshopFeed/WorkshopFeedCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

const RecentlyPostedWorkshops = () => {
    
    const [recentlyPosted, setRecentlyPosted] = useState([]);

    const fetchRecentlyPosted = async() => {
        try{
            let res = await axios.get(`${apiURL()}/recentPosted/`)
            setRecentlyPosted(res.data.payload)
        } catch (err){
            console.log(err)
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            fontFamily: 'audiowide',
            width: '100%'
        },
    }))

    const classes = useStyles();

    useEffect( () => {
        fetchRecentlyPosted();

    }, []);

    let recentlyPostedWorkshops =  recentlyPosted.map(workshop => {
        return <WorkshopFeedCard key={workshop.workshop_id} id={workshop.workshop_id} workshop={workshop}/>
    })
    
    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
            {recentlyPostedWorkshops}
        </Grid>
    )
}

export default RecentlyPostedWorkshops;
