import React, { useState, useEffect } from 'react'
import { apiURL } from '../../Utilities/apiURL'
import axios from 'axios'
import WorkshopFeedCard from '../WorkshopFeed/WorkshopFeedCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

const RecentlyPostedWorkshops = () => {
    const [recentPost, setrecentPost] = useState([]);

    const recentlyPosted = async() => {
        try{
            let res = await axios.get(`${apiURL()}/recentPosted/`)
            setrecentPost(res.data.payload)
            debugger
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

    useEffect(() => {

        recentlyPosted();
        
    }, []);


    debugger
    let recentlypostedpost =  recentPost.map(workshop => {
        return <WorkshopFeedCard key={workshop.id} id={workshop.id} workshop={workshop}/>
    })
    return (
    <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
        {recentlypostedpost}
    </Grid>
        // <div>
        //     <ul>
        //     {recentPost.map(post => {
        //           return <li onClick={() => {debugger}} id={post}>{post.title} {post.date} {post.starttime} - {post.endtime} </li>
        //        })}
        //     </ul>
        // </div>
    )
}

export default RecentlyPostedWorkshops;
