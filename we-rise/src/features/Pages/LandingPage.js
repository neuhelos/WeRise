import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import PublicNavBar from '../NavBar/PublicNavBar'
import SloganVideoSource from '../../styling/Assets/Media/SloganAnimation.mp4'
import WeRiseBackground from '../../styling/Assets/Media/WeRiseGradientCircleGridBackground.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& *': {
            fontFamily: 'audiowide'
        }
    },
    container: {
        width: '100%',
        minHeight: '30rem',
        padding: theme.spacing(2),
        '& *': {
            color: '#FFFFFF'
        }
    },
    wrapper : {
        margin: theme.spacing(1)
    },
    paper: {
        backgroundColor: '#282828',
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    },
    logo: {
        maxWidth: '20rem',
        maxHeight: '20rem'
    
    },
    media: {
        maxWidth: '30rem',
        maxHeight: '20rem',
        borderRadius: '4px',
    },
    video: {
        maxWidth: '20rem',
        maxHeight: '20rem',
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
            
            {/* Section 1 */}
            <Grid className={classes.container} container item display="flex" direction="row" justify='center' alignItems='center' wrap='nowrap' md={12}>
                <Grid className={classes.wrapper} container item display="flex" direction="column" justify='center' alignItems='center' wrap='nowrap' md={6}>
                    <Box bgColor='#282828' style={{display:'flex', justifyContent:'center'}}>
                        <img className={classes.logo} src={WeRiseLogo} alt="Video Chat"/>
                    </Box>
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

            {/* Section 2 */}
            <Grid className={classes.container} container item style={{backgroundImage: `url(${WeRiseBackground})`, minHeight: '35rem'}} display="flex" direction="column" justify='center' alignItems='center' wrap='nowrap' md={12}>
                <Paper className={classes.paper} style={{width: '100%'}} >
                    <Grid className={classes.wrapper} container item display="flex" direction="row" justify='center' alignItems='center' wrap='nowrap'>
                        <Box bgcolor="#121212" style={{display:'flex', justifyContent:'center', width: '50%', borderRadius: '4px'}}>
                            <video className={classes.video} loop='loop' autoPlay='autoplay' muted>
                                <source src={SloganVideoSource} type="video/mp4"/>
                                Your browser does not support this video.
                            </video>
                        </Box>
                        <Box p={4} style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'flex-start', width: '50%', height:'100%'}}>
                            <Typography variant='h4' gutterBottom={true} align='center'>
                            Build Your Skills
                            </Typography>
                            <Typography variant='h4' gutterBottom={true} align='center'>
                            Build Your Community
                            </Typography>
                        </Box>
                    </Grid>
                </Paper>
                <Grid className={classes.wrapper} container item display="flex" direction="row" justify='space-between' alignItems='center' wrap='nowrap'>
                    <Paper style={{backgroundColor: '#121212', display:'flex', justifyContent:'flex-start', flexDirection: 'column', width: '49%'}}>
                        <Typography variant='h5' gutterBottom={true} align='center'>
                            Empower Your Community with Your Skills and Knowledge 
                        </Typography>
                        <Typography variant='subtitle1' gutterBottom={true} align='center'>
                            Create a workshop 
                        </Typography>
                    </Paper>
                    <Paper style={{backgroundColor: '#121212', display:'flex', justifyContent:'flex-start', flexDirection: 'column', width: '49%'}}>
                        <Typography variant='h5' gutterBottom={true} align='center'>
                           Empower Yourself and Share in Your Commmunity's Collective Knowledge
                        </Typography>
                        <Typography variant='subtitle1' gutterBottom={true} align='center'>
                            Join and participate 
                        </Typography>
                    </Paper>


                </Grid>
            </Grid>

            {/* <Grid container item className={classes.container} display="flex" direction="row" justify='space-evenly' alignItems='center' wrap='nowrap' sm={12}>
                <Grid container item justify='flex-end' alignItems='center' sm={12} md={6}>
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
