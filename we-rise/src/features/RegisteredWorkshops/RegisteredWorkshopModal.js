import React, { useState } from 'react'
import  { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import WorkshopDetails from '../WorkshopFeed/WorkshopDetails'

import { deleteRegistration } from './RegisteredWorkshopSlice'
import { useInput } from '../../Utilities/CustomHookery'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'



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

    const [activeModalView, setActiveModalView] = useState(0);

    const handleNext = () => {
    setActiveModalView((prevActiveModalView) => prevActiveModalView + 1);
    };

    const handleBack = () => {
    setActiveModalView((prevActiveModalView) => prevActiveModalView - 1);
    };

    const JoinWorkshopVideoChat = () => {

        return (
            <>
                <WorkshopDetails workshop={workshop} {...props}/>
                <Grid className={classes.root} container display="flex" direction="row" justify="space-evenly" alignItems="center">
                    { new Date() >= new Date(workshop.start_time) - 6.048e+8 ? <Button variant="contained" color="primary" type="submit" onClick = {() => history.push(`/videoConference/${workshop.user_id}${workshop.workshop_id}`)}>Join VideoChat</Button> : null}
                    <Button variant="contained" color="primary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="contained" color="primary" type="submit" onClick={handleNext}>Cancel Registration</Button> 
                </Grid>
            </>
        )
    }

    const UnregisterWorkshop = () => {
        
        const message = useInput("")


        return (
            <>
                <Typography className={classes.text} align='center' variant='h6' gutterBottom="true">Cancel Your Workshop Registration</Typography>
                <TextField id="message" className={classes.input} label="Message to the Facilitator (Optional)" placeholder="Please explain to the Facilitator your workshop cancellation" variant="filled" multiline rows={5} {...message} />
                <Grid className={classes.root} container display="flex" direction="row" justify="space-evenly" alignItems="center">
                    <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
                    <Button variant="contained" color="primary" type="submit" onClick = {() => dispatch(deleteRegistration(workshop.id))}>Unregister</Button> 
                </Grid>
            </>
        )
    }

    const getModalContent = (activeModalView) => {
        switch (activeModalView) {
            case 0:
            return <JoinWorkshopVideoChat />
            case 1:
            return <UnregisterWorkshop />
            default:
            return 'Unknown View';
        }
    }

    return (

        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            {getModalContent(activeModalView)}
        </Grid>

    )
}

export default RegisteredWorkshopModal;

