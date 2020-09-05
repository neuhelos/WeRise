import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import PublicNavBar from '../NavBar/PublicNavBar'
import SloganVideoSource from '../../styling/Assets/Media/SloganAnimation.mp4'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& *': {
            fontFamily: 'audiowide'
        }
    },
    container: {
        width: '100%',
        height: '100rem',
        padding: theme.spacing(3),
    },
    wrapper : {
        padding: theme.spacing(2)
    },
    paper: {
        backgroundColor: '#282828',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    logo: {
        maxWidth: '25rem',
        maxHeight: '25rem'
    
    },
    media: {
        maxWidth: '35rem',
        maxHeight: '25rem',
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
    
    let VideoChatPartyGif = 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/appImages%2FVideoChatParty.gif?alt=media&token=2d1bb370-3e81-48b0-9961-30df021fa7d9'
    let WeRiseLogo = 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/appImages%2FWeRise_Logo.png?alt=media&token=8c93514c-69b8-4dea-973e-159f66720dff'

    return (
        <Grid container className={classes.root} display="flex" direction="column" wrap='nowrap'>
            <PublicNavBar />
            <Grid className={classes.container} container item display="flex" direction="row" justify='center' alignItems='center' wrap='nowrap' md={12}>
                <Grid className={classes.wrapper} container item display="flex" direction="column" justify='flex-end' alignItems='center' wrap='nowrap' md={6}>
                    <Paper className={classes.paper} style={{backgroundColor: '#121212', display:'flex', justify:'flex-end'}}>
                        <img className={classes.logo} src={WeRiseLogo} alt="Video Chat"/>
                    </Paper>
                    <Typography variant='h4' gutterBottom={true} align='center'>
                        Sharing Knowledge to Build Communities on the Rise
                    </Typography>
                </Grid>
                <Grid className={classes.wrapper} container item display="flex" direction="column" justify='flex-start' alignItems='center' wrap='nowrap' md={6}>
                    <Paper className={classes.paper}>
                        <img className={classes.media} src={VideoChatPartyGif} alt="Video Chat"/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid className={classes.container} container item display="flex" direction="row" justify='center' alignItems='center' wrap='nowrap' md={12}>
                <Grid className={classes.wrapper} container item display="flex" direction="column" justify='flex-end' alignItems='center' wrap='nowrap' md={6}>
                    <Paper className={classes.paper} style={{backgroundColor: '#121212', display:'flex', justify:'flex-end'}}>
                    </Paper>
                    <Typography variant='h4' gutterBottom={true} align='center'>
                    </Typography>
                </Grid>
                <Grid className={classes.wrapper} container item display="flex" direction="column" justify='flex-start' alignItems='center' wrap='nowrap' md={6}>
                    <Paper className={classes.paper}>
                    </Paper>
                </Grid>
            </Grid>

            {/* <Grid container item className={classes.container} display="flex" direction="row" justify='space-evenly' alignItems='center' wrap='nowrap' sm={12}>
                <Grid container item justify='flex-end' alignItems='center' sm={12} md={6}>
                    <video className={classes.video} loop='loop' autoPlay='autoplay' muted>
                        <source src={SloganVideoSource} type="video/mp4"/>
                        Your browser does not support this video.
                    </video>
                </Grid>
                <Grid container item justify='flex-start' alignItems='center' sm={12} md={6}>
                    <Paper className={classes.paper}>
                        <img className={classes.media} src={VideoChatPartyGif} alt="Video Chat"/>
                    </Paper>
                </Grid>
            </Grid> */}
        </Grid>
    )
}

export default LandingPage;
