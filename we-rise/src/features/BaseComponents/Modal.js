import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
        top: '1rem'
        
    },
    paperContainer: {
        backgroundColor: '#A3A3A3',
        padding: theme.spacing(3),
        width: '60%',
        [theme.breakpoints.down('sm')]:{
            width: '90%'
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outlineColor: '#36386D',
    },
    paper: {
        backgroundColor: '#F5F5F5',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const WeRiseModal = ( {children, open, toggleModal, ...props} ) => {
    const classes = useStyles();
    
    return (

        <Modal
            aria-labelledby=""
            aria-describedby=""
            className={classes.modal}
            open={open}
            onClose={toggleModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
                <Paper className={classes.paperContainer}>
                    <Paper className={classes.paper}>{children}</Paper>
                </Paper>
            </Fade>
        </Modal>

    );
}

export default WeRiseModal