import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

import Modal from '../BaseComponents/Modal'
import SignUpModal from '../Authentication/SignUpModal'
import SignInModal from '../Authentication/SignInModal'

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
        //backgroundSize: '600% 600%',
        //animationName: 'navBarGradient',
        //overflow: 'hidden',
        // '-webkit-animation': 'navBarGradient 12s ease infinite',
        // '-moz-animation': 'navBarGradient 12s ease infinite',
        //animation: '$navBarGradient 12s ease infinite',
        // '@-webkit-keyframes navBarGradient': {
        //     '0%': {backgroundPosition: '0% 10%'},
        //     '50%': {backgroundPosition: '100% 91%'},
        //     '100%': {backgroundPosition: '0% 10%'},
        // },
        // '@-moz-keyframes navBarGradient': {
        //     '0%': {backgroundPosition:'0% 10%'},
        //     '50%': {backgroundPosition:'100% 91%'},
        //     '100%': {backgroundPosition:'0% 10%'},
        // },
        // '@keyframes navBarGradient': {
        //     '0%': {backgroundPosition:'0% 10%' },
        //     '50%': {backgroundPosition:'100% 91%'},
        //     '100%': {backgroundPosition:'0% 10%'},
        // },
        flexGrow: 1,
        }, 
    button: {
        fontFamily: 'audiowide',
        width: '30%',
        margin: theme.spacing(2),
        backgroundColor: 'white',
        color: '#FF07FB'
    },
    title: {
        fontFamily: 'audiowide',
        flexGrow: 1,
    },
}));

const PublicNavBar = () => {
    const classes = useStyles();

    const [openSignIn , setOpenSignIn] = useState(false)
    const [openSignUp , setOpenSignUp] = useState(false)

    const toggleSignInModal = () => {
        setOpenSignIn(!openSignIn)
    }
    const toggleSignUpModal = () => {
        setOpenSignUp(!openSignUp)
    }

    return (
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h1" noWrap>
                            WeRise
                        </Typography>
                    </Grid>

                    <Grid container item xs={4} direction="row" justify="flex-end" alignItems="center">
                        <Button className={classes.button} variant='contained' size="large" onClick={toggleSignInModal}>SignIn</Button>
                        <Button className={classes.button} variant='contained' size="large" onClick={toggleSignUpModal}>SignUp</Button>
                    </Grid>
                </Grid>

                <Modal open={openSignIn} toggleModal={toggleSignInModal}>
                    <SignInModal />
                </Modal>
                <Modal open={openSignUp} toggleModal={toggleSignUpModal}>
                    <SignUpModal />
                </Modal>
            </Toolbar>
        </AppBar>
    );
}

export default PublicNavBar