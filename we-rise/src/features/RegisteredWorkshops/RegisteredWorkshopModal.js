import React, { useState } from 'react'
import  { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import WorkshopDetails from '../WorkshopFeed/WorkshopDetails'

import { chatExistsCheck, submitMessageExistingChat, newChatSubmit} from '../../Utilities/firestoreChatBase'
import { sendEmail } from '../../Utilities/emailBase'
import { deleteRegistration } from './RegisteredWorkshopSlice'
import { useInput } from '../../Utilities/CustomHookery'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            outlineColor: '#36386D',
        },
    },
    input: {
        width: '100%',
        marginBottom: theme.spacing(1)
    }, 
}))


const RegisteredWorkshopModal = ({ handleCloseModal, workshop, ...props }) => {

    const currentUser = useSelector( state => state.currentUserSession )

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()

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
        
        const userMessage = useInput("")

        const handleCancelRegistration = async () => {
            try {

                let automatedMessage = `Automated Message: I'm cancelling my registration for the following workshop: ${workshop.title}.`
                let userCustomMessage = `${workshop.title} Cancellation: ${userMessage.value}`
                let message = userMessage.value ? userCustomMessage : automatedMessage

                sendEmail('nilberremon@pursuit.org', `Participant Cancellation - ${workshop.title}`, message)

                let usersEmail = [workshop.email, currentUser.email].sort()
                let facilitatorDetails = {email: workshop.email, firstName: workshop.firstn, lastName: workshop.lastn, profileImage: workshop.user_pic, userId: workshop.user_id}
                let currentUserDetails = {email: currentUser.email, firstName: currentUser.firstn, lastName: currentUser.lastn, profileImage: currentUser.user_pic, userId: currentUser.uid}
                let usersData = [facilitatorDetails, currentUserDetails]

                let existingChatId = await chatExistsCheck(usersEmail)
                existingChatId ? submitMessageExistingChat(existingChatId, currentUser.uid, currentUser.firstn, message) 
                : newChatSubmit(currentUser.uid, currentUser.firstn, usersData, usersEmail, message)
                
                dispatch(deleteRegistration(workshop.id))
                handleCloseModal()
            } catch(error) {
                console.log(error)
            }
        }


        return (
            <>
                <Typography className={classes.text} align='center' variant='h6' gutterBottom={true}>Cancel Your Workshop Registration</Typography>
                <TextField id="message" className={classes.input} label="Send Message to the Facilitator (Optional)" placeholder="If you'd like, provide the facilitator a reason for your cancellation. Otherwise we will send them an automated message." variant="filled" multiline rows={5} {...userMessage} />
                <Grid className={classes.root} container display="flex" direction="row" justify="space-evenly" alignItems="center">
                    <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
                    <Tooltip title="Can Not Be Undone!">
                        <Button variant="contained" color="primary" type="submit" onClick = {handleCancelRegistration}>Unregister</Button> 
                    </Tooltip>
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

