import React, { useState } from 'react'
import  { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import WorkshopDetails from '../WorkshopFeed/WorkshopDetails'
import Modal from '../BaseComponents/Modal'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { deleteRegistration } from './RegisteredWorkshopSlice'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            outlineColor: '#36386D',
        },
    },
}))


const RegisteredWorkshopModal = ({ handleCloseModal, workshop, ...props }) => {

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const JoinWorkshopVideoChat = () => {

        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            <WorkshopDetails workshop={workshop} {...props}/>
            <Grid className={classes.root} container display="flex" direction="row" justify="space-evenly" alignItems="center">
                { new Date() >= new Date(workshop.start_time) - 6.048e+8 ? <Button variant="contained" color="primary" type="submit" onClick = {() => history.push(`/videoConference/${workshop.user_id}${workshop.workshop_id}`)}>Join VideoChat</Button> : null}
                <Button variant="contained" color="primary" onClick={handleCloseModal}>Close</Button>
                <Button variant="contained" color="primary" type="submit" onClick={handleNext}>Cancel Registration</Button> 
            </Grid>
        </Grid>
    }

    const UnregisterWorkshop = () => {
    
    
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
            return <JoinWorkshopVideoChat />
            case 1:
            return <UnregisterWorkshop />
            default:
            return 'Unknown step';
        }
    }

    return (
        <>

        <Grid className={classes.roott} container display="flex" direction="column" justify="space-evenly" alignItems="center">{getStepContent(activeStep)}</Grid>


        
            <Grid className={classes.root} container display="flex" direction="row" justify="space-evenly" alignItems="center">
                <Button variant="contained" color="primary" onClick={handleBack}>Cancel</Button>
                <Button variant="contained" color="primary" type="submit" onClick = {() => dispatch(deleteRegistration(workshop.id))}>Unregister</Button> 
            </Grid>

        </>
    )
}

export default RegisteredWorkshopModal;

