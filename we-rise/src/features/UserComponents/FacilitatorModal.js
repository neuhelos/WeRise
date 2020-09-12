import React, { useState } from 'react'
import  { useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../BaseComponents/Modal'

import EditWorkshop from './editWorkshop'
import WorkshopDetails from '../WorkshopFeed/WorkshopDetails'


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


const FacilitatorModal = ({ handleCloseModal, workshop }) => {
    
    const history = useHistory();
    const classes = useStyles();

    const currentUser = useSelector( state => state.currentUserSession.uid );
    
    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }

    return (
        <>
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            <WorkshopDetails workshop={workshop} />
                {workshop.user_id === currentUser ? 
                    <Grid className={classes.root} item container display="flex" direction="row" justify="space-around" alignItems="center">
                        <Button variant="contained" color="primary" type="submit" onClick = {() => history.push(`/videoConference/${workshop.workshop_id}`)}>Join VideoChat</Button>
                        <Button variant="contained" color="Green" type="submit" onClick = {toggleModal} >Edit Workshop</Button>
                        <Button variant="contained" color="secondary" type="submit">Delete Workshop</Button>
                    </Grid>
                    : null}
        </Grid>

        <Modal open={open} toggleModal={toggleModal}>
            <EditWorkshop workshop={workshop} handleCloseModal={toggleModal} />
        </Modal>
        </>
    )
}

export default FacilitatorModal;

