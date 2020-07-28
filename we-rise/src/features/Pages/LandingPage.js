import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import PublicNavBar from '../NavBar/PublicNavBar'
import SloganVideoSource from '../../styling/Assets/Media/SloganAnimation.mp4'
import VideoChatGif from '../../styling/Assets/Media/VideoChatParty.gif'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
    },
    paper: {
        backgroundColor: '#282828',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    media: {
        width: '30rem',
        height: '20rem',
        borderRadius: '4px',
    },
    video: {
        width: '25rem',
        height: '25rem',
        borderRadius: '4px',
        border: 'solid 10px #282828',
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    }
}))

const LandingPage = () => {
    
    const classes = useStyles()
    
    return (
        <Grid container className={classes.root} display="flex" direction="column" wrap='nowrap'>
            <PublicNavBar />
            <Grid container item className={classes.container} display="flex" direction="row" justify='space-evenly' alignItems='center' wrap='nowrap' sm={12}>
                <Grid container item justify='flex-end' alignItems='center' sm={12} md={6}>
                    <video className={classes.video} loop='loop' autoPlay='autoplay' muted>
                        <source src={SloganVideoSource} type="video/mp4"/>
                        Your browser does not support this video.
                    </video>
                </Grid>
                <Grid container item justify='flex-start' alignItems='center' sm={12} md={6}>
                    <Paper className={classes.paper}>
                        <img className={classes.media} src={VideoChatGif} alt="Video Chat"/>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LandingPage;
