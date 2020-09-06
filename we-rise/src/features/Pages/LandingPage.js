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

import VideoChatPartyGif from '../../styling/Assets/Media/VideoChatParty.gif'
import WeRiseBackground from '../../styling/Assets/Media/WeRiseGradientCircleGridBackground.png'
import WeRiseLogo from '../../styling/Assets/Media/WeRiseLogo.png'
import ConnectingKnowledgeImage from '../../styling/Assets/Media/ConnectingKnowledge.gif'

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
        minHeight: '40rem',
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
        backgroundColor: '#282828',
        height: '100%'
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
    button: {
        fontFamily: 'audiowide',
        width: '25%',
        backgroundColor: '#FFFFFF',
        color: '#FF07FB',
        fontSize: '2rem',
        '&:hover': {
            border: '3px solid  #F89B29',
            cursor: 'pointer'
        },
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
            <Grid className={classes.container} container item style={{backgroundImage: `url(${WeRiseBackground})`, minHeight: '45rem'}} display="flex" direction="column" justify='center' alignItems='center' wrap='nowrap' md={12}>
                <Paper className={classes.paper} style={{width: '100%'}} >
                    <Grid className={classes.wrapper} container item display="flex" direction="row" justify='flex-start' alignItems='center' wrap='nowrap'>
                        <Box bgcolor="#666666" p={2} style={{display:'flex', justifyContent:'center', borderRadius: '4px'}}>
                            <img className={classes.media} src={ConnectingKnowledgeImage} alt="Connections"/>
                        </Box>
                        <Box p={4} style={{display:'flex', justifyContent:'space-around', flexDirection:'column', alignItems:'flex-start'}}>
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
                            Inspire Folx to Learn and Take Action
                            </Typography>
                        </Box>
                    </Grid>
                </Paper>
                <Grid className={classes.wrapper} container item display="flex" direction="row" justify='space-between' alignItems='center' wrap='nowrap'>
                    <Paper className={classes.paperWrapper}>
                        <Paper style={{backgroundColor: '#F5F5F5', display:'flex', justifyContent:'flex-start', flexDirection: 'column', padding: '0.25rem', height: '100%'}}>
                            <Typography variant='h6' gutterBottom={true} align='center' style={{color: '#000000'}}>
                                Empower Your Community with Your Skills and Knowledge 
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom={true} align='center' style={{color: '#000000'}}>
                                Create a workshop 
                            </Typography>
                        </Paper>
                    </Paper>
                    <Paper className={classes.paperWrapper}>
                        <Paper style={{backgroundColor: '#F5F5F5', display:'flex', justifyContent:'flex-start', flexDirection: 'column', padding: '0.25rem',  height: '100%'}} >
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
            <Grid className={classes.container} container item style={{backgroundColor: "#121212"}} display="flex" direction="column" justify='center' alignItems='center' wrap='nowrap' md={12}>
                <Typography variant='h4' gutterBottom={true} align='center' style={{padding: '1rem'}}>
                    Experience Upcoming Workshops or Create Your Own
                </Typography>
                <Grid container item display="flex" direction="row" justify='space-evenly' alignItems='center' wrap='nowrap' md={12}>
                    {workshops.map(workshop => {
                        return <LandingPageWorkshopCard key={workshop.workshop_id} workshop={workshop}/>
                    })}
                </Grid>
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
