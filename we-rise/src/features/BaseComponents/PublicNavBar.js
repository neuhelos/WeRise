import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Modal from '../BaseComponents/Modal'
import SignUpModal from '../Authentication/SignUpModal'
import SignInModal from '../Authentication/SignInModal'

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
        flexGrow: 1,
    },
    button: {
        fontFamily: 'audiowide',
        margin: theme.spacing(1),
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
                <Typography className={classes.title} variant="h1" noWrap>
                    WeRise
                </Typography>
                <Button className={classes.button} variant='contained' size="large" onClick={toggleSignInModal}>SignIn</Button>
                <Button className={classes.button} variant='contained' size="large" onClick={toggleSignUpModal}>SignUp</Button>

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