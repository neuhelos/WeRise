import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import PublicNavBar from '../NavBar/PublicNavBar'

import SloganVideoSource from '../../styling/Assets/Media/SloganAnimation.mp4'
import WeRiseBackground from '../../styling/Assets/Media/WeRiseGradientCircleGridBackground.png'
import WeRiseLogo from '../../styling/Assets/Media/WeRiseLogo.png'
import VideoChatPartyGif from '../../styling/Assets/Media/VideoChatParty.gif'

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
        color: '#FFFFFF'
    },
    wrapper : {
        margin: theme.spacing(1)
    },
    paper: {
        backgroundColor: '#282828',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        color: '#FFFFFF'
    },
    paperWrapper : {
        padding: theme.spacing(1),
        width: '49%',
        backgroundColor: '#282828'
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
    },
    button: {
        fontFamily: 'audiowide',
        width: '20%',
        backgroundColor: '#FFFFFF',
        color: '#FF07FB' 
    }
}))

const LandingPage = () => {
    
    const classes = useStyles()
    
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
                    <Paper className={classes.paperWrapper}>
                        <Paper style={{backgroundColor: '#F5F5F5', display:'flex', justifyContent:'flex-start', flexDirection: 'column', padding: '0.25rem'}}>
                            <Typography variant='h5' gutterBottom={true} align='center' style={{color: '#000000'}}>
                                Empower Your Community with Your Skills and Knowledge 
                            </Typography>
                            <Typography variant='subtitle1' gutterBottom={true} align='center' style={{color: '#000000'}}>
                                Create a workshop 
                            </Typography>
                        </Paper>
                    </Paper>
                    <Paper className={classes.paperWrapper}>
                        <Paper style={{backgroundColor: '#F5F5F5', display:'flex', justifyContent:'flex-start', flexDirection: 'column', padding: '0.25rem'}} >
                            <Typography variant='h5' gutterBottom={true} align='center' style={{color: '#000000'}}>
                            Empower Yourself and Share in Your Commmunity's Collective Knowledge
                            </Typography>
                            <Typography variant='subtitle1' gutterBottom={true} align='center' style={{color: '#000000'}}>
                                Join and participate 
                            </Typography>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
                
            {/* Section 3 */}
            <Grid className={classes.container} container item style={{backgroundColor: "#282828"}} display="flex" direction="row" justify='center' alignItems='center' wrap='nowrap' md={12}>

            </Grid>
            
            {/* Section 4 */}
            <Grid className={classes.container} container item style={{backgroundImage: `url(${WeRiseBackground})`}} display="flex" direction="column" justify='space-evenly' alignItems='center' wrap='nowrap' md={12}>
                <Typography variant='h2' gutterBottom={true} align='center'>
                            Ready to Share in Our Community?
                </Typography>
                <Button className={classes.button} variant='contained' size="large" onClick={""}>SIGN UP</Button>
            </Grid>


        </Grid>
    )
}

export default LandingPage;
