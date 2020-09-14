import React, { useState } from 'react'
import  { useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../BaseComponents/Modal'

import EditWorkshop from './editWorkshop'
import WorkshopDetails from '../WorkshopFeed/WorkshopDetails'
import ParticipantsModal from './Participants';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            outlineColor: '#36386D',
            border: 'none',
        },
    },
}))


const FacilitatorModal = ({ handleCloseModal, workshop, participantsData }) => {
    
    const history = useHistory();
    const classes = useStyles();

    const currentUser = useSelector( state => state.currentUserSession.uid );

    const [activeModalView, setActiveModalView] = useState(0);
    const handleNext = () => {
        setActiveModalView((prevActiveModalView) => prevActiveModalView + 1);
        };
    
    const handleBack = () => {
        setActiveModalView((prevActiveModalView) => prevActiveModalView - 1);
        };
    
    
    
 
    const FacilitatorWorkshopModal = () => {
        const [open , setOpen] = useState(false)
        const toggleModal = () => {
            setOpen(!open)
        }

        return (
            <>
            <Button variant="contained" color="disabled" size='small' style={{alignSelf: 'flex-end'}} onClick={handleCloseModal}>Close</Button>
            <Grid className={classes.root} display="flex" direction="column" justify="center" alignItems="center">
                <WorkshopDetails workshop={workshop} participantsData={participantsData}/>
                    {workshop.user_id === currentUser ? 
                        <Grid className={classes.root} item container display="flex" direction="row" justify="space-around" alignItems="center">
                            <Button variant="contained" color="primary" type="submit" onClick = {() => history.push(`/videoConference/${workshop.workshop_id}`)}>Join VideoChat</Button>
                            <Button variant="contained" color="disabled" type="submit" onClick = {toggleModal} >Edit Workshop</Button>
                            <Button variant="contained" color="secondary" type="submit">Cancel Workshop</Button>
                            {workshop.workshop_count ?  <Button variant="contained" color="primary" type="submit" onClick = {handleNext} >See Participants</Button> : null }
                        </Grid>
                        : null}
            </Grid>
    
            <Modal open={open} toggleModal={toggleModal}>
                <EditWorkshop workshop={workshop} handleCloseModal={toggleModal} />
            </Modal>
    
    
           
            </>
        )
    }

    const getModalContent = (activeModalView) => {
        switch (activeModalView) {
            case 0:
            return <FacilitatorWorkshopModal />
            case 1:
            return <ParticipantsModal workshop={workshop} handleBack={handleBack}/>
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

export default FacilitatorModal;

