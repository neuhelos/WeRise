import React, { useState } from 'react'
import  { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { DateTime } from 'luxon'
import { useHistory} from 'react-router-dom'
import { apiURL } from '../../Utilities/apiURL'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../BaseComponents/Modal'
import EditWorkshop from './editWorkshop'




const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            textAlign: 'center',
            outlineColor: '#36386D',
            border: 'none',
            margin: theme.spacing(1)
        },
    },
    image : {
        width:'50%',
        height: '50%'
    }
}))


const FacilitatorModal = ({ handleCloseModal, workshop }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector( state => state.currentUserSession.uid );
  const [open , setOpen] = useState(false)

  const toggleModal = () => {
    setOpen(!open)
}

  
    let date = `${DateTime.fromISO(workshop.start_time).toFormat('EEE')}, 
        ${DateTime.fromISO(workshop.start_time).toFormat('MMM')} 
        ${DateTime.fromISO(workshop.start_time).toFormat('d')},  
        ${DateTime.fromISO(workshop.start_time).toFormat('y')}`

    let time = `${DateTime.fromISO(workshop.start_time).toFormat('T')} ${DateTime.fromISO(workshop.start_time).toFormat('ZZZZ')}`

  const workshopImage = workshop.workshop_img
  // Button should only show if the start_time is the same as the current time!
    return (
        <>
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            <Typography variant='h4'>{workshop.title}</Typography>
            <Typography variant='h6'>Facilitator: {`${workshop.firstn} ${workshop.lastn}`}</Typography>
            <Typography variant='h10'>Description: {workshop.descriptions}</Typography>
            <img className={classes.image} src={workshopImage} alt="workshop.title"/>
            <Typography variant='h6'>Number of Participants Registered: {workshop.participants}</Typography>
            <Typography variant='h6'>Workshop Date: {date}</Typography>
            <Grid>

                {workshop.user_id === currentUser ? <Button variant="contained" color="primary" type="submit" onClick = {() => history.push(`/videoConference/${workshop.workshop_id}`)}>Join VideoChat</Button> : null }
                {workshop.user_id === currentUser ? <Button variant="contained" color="Green" type="submit" onClick = {toggleModal}>Edit Workshop</Button> : null }
                {/* {workshop.user_id === currentUser ? <Button variant="contained" color="secondary" type="submit"`>Delete Workshop</Button> : null } */}
            </Grid>
        </Grid>

        <Modal open={open} toggleModal={toggleModal}>
            <EditWorkshop workshop={workshop} handleCloseModal={toggleModal} />
        </Modal>
        </>
    )
}

export default FacilitatorModal;

