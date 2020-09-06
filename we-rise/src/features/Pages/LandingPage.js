import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'

import PublicNavBar from '../NavBar/PublicNavBar'
import Modal from '../BaseComponents/Modal'
import SignUpModal from '../Authentication/SignUpModal'
import SignInModal from '../Authentication/SignInModal'
import LandingPageWorkshopCard from './LandingPageWorkshopCard'

import SloganVideoSource from '../../styling/Assets/Media/SloganAnimation.mp4'
import WeRiseBackground from '../../styling/Assets/Media/WeRiseGradientCircleGridBackground.png'
import WeRiseLogo from '../../styling/Assets/Media/WeRiseLogo.png'
import VideoChatPartyGif from '../../styling/Assets/Media/VideoChatParty.gif'

import { workshops } from './LandingPageWorkshops'

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
        width: '25%',
        backgroundColor: '#FFFFFF',
        color: '#FF07FB',
        fontSize: '2rem'
    }
}))

const LandingPage = () => {
    
    const classes = useStyles()

    const [openSignIn , setOpenSignIn] = useState(false)
    const [openSignUp , setOpenSignUp] = useState(false)

    const toggleSignInModal = () => {
        setOpenSignIn(!openSignIn)
    }
    const toggleSignUpModal = () => {
        setOpenSignUp(!openSignUp)
    }

    return (
        <>
        <Grid container className={classes.root} display="flex" direction="column" wrap='nowrap'>
            <PublicNavBar toggleSignInModal={toggleSignInModal} toggleSignUpModal={toggleSignUpModal} />
            
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
                        <Box p={4} style={{display:'flex', justifyContent:'space-around', flexDirection:'column', alignItems:'flex-start', width: '50%'}}>
                            <Typography variant='h4' gutterBottom={true} align='center'>
                            Build Your Skills
                            </Typography>
                            <Typography variant='subtitle1' align='center' style={{marginBottom: '2rem'}}>
                            Explore Workshops that Spark your Horizons 
                            </Typography>
                            <Typography variant='h4' gutterBottom={true} align='center'>
                            Build Your Community
                            </Typography>
                            <Typography variant='subtitle1' gutterBottom={true} align='center'>
                            Inspire Folx to Take Action and Learn
                            </Typography>
                        </Box>
                    </Grid>
                </Paper>
                <Grid className={classes.wrapper} container item display="flex" direction="row" justify='space-between' alignItems='center' wrap='nowrap'>
                    <Paper className={classes.paperWrapper}>
                        <Paper style={{backgroundColor: '#F5F5F5', display:'flex', justifyContent:'flex-start', flexDirection: 'column', padding: '0.25rem'}}>
                            <Typography variant='h6' gutterBottom={true} align='center' style={{color: '#000000'}}>
                                Empower Your Community with Your Skills and Knowledge 
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom={true} align='center' style={{color: '#000000'}}>
                                Create a workshop 
                            </Typography>
                        </Paper>
                    </Paper>
                    <Paper className={classes.paperWrapper}>
                        <Paper style={{backgroundColor: '#F5F5F5', display:'flex', justifyContent:'flex-start', flexDirection: 'column', padding: '0.25rem'}} >
                            <Typography variant='h6' gutterBottom={true} align='center' style={{color: '#000000'}}>
                            Empower Yourself and Share in Your Commmunity's Collective Knowledge
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom={true} align='center' style={{color: '#000000'}}>
                                Join and participate 
                            </Typography>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
                
            {/* Section 3 */}
            <Grid className={classes.container} container item style={{backgroundColor: "#121212"}} display="flex" direction="row" justify='center' alignItems='center' wrap='nowrap' md={12}>
                {workshops.map(workshop => {
                    return <LandingPageWorkshopCard key={workshop.title} workshop={workshop}/>
                })}
            </Grid>
            
            {/* Section 4 */}
            <Grid className={classes.container} container item style={{backgroundImage: `url(${WeRiseBackground})`}} display="flex" direction="column" justify='space-evenly' alignItems='center' wrap='nowrap' md={12}>
                <Typography variant='h3' gutterBottom={true} align='center'>
                            Ready to Share in Your Future Communities?
                </Typography>
                <Button className={classes.button} variant='contained' onClick={toggleSignUpModal}>SIGN UP</Button>
            </Grid>


        </Grid>


        <Modal open={openSignIn} toggleModal={toggleSignInModal}>
                    <SignInModal toggleSignUpModal={toggleSignUpModal} toggleModal={toggleSignInModal}/>
                </Modal>
                <Modal open={openSignUp} toggleModal={toggleSignUpModal}>
                    <SignUpModal toggleSignInModal={toggleSignInModal} toggleModal={toggleSignUpModal}/>
        </Modal>
        </>
    )
}

export default LandingPage;
