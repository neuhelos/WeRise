import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import { signIn } from '../../Utilities/firebaseFunctions'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../BaseComponents/loadingSlice';


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
        }, 
    button: {
        fontFamily: 'audiowide',
        width: '20%',
        margin: theme.spacing(1),
        backgroundColor: 'white',
        color: '#FF07FB'
    },
    title: {
        fontFamily: 'audiowide',
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            fontSize: '3rem',
            
        },
    },
}));

const PublicNavBar = ( {toggleSignInModal, toggleSignUpModal}) => {
    const classes = useStyles();

    const dispatch = useDispatch();


    const history = useHistory();

    const slowcode = async() => {
        return new Promise(function(resolve, reject){
          setTimeout(resolve, 2000)
        })
      }
    const handleGuestSignIn = async () => {
        dispatch(toggleLoading());
        await slowcode();
        await signIn("guest@werise.org","weriseguest");
        history.push("/CommunityDashboard")
    }

    return (
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Grid container spacing={1} alignItems="center" >
                    <Grid container item justify="flex-start" alignItems="center" xs={5}>
                        <Typography className={classes.title} variant="h1" noWrap>
                            WeRise
                        </Typography>
                    </Grid>

                    <Grid container item xs={7} direction="row" justify="flex-end" alignItems="center">
                        <Button className={classes.button} variant='contained' size="large" onClick={toggleSignInModal}>SignIn</Button>
                        <Button className={classes.button} variant='contained' size="large" onClick={toggleSignUpModal}>SignUp</Button>
                        <Button className={classes.button} variant='contained' size="large" onClick={handleGuestSignIn}>Guest</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default PublicNavBar