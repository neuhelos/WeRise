import React, {useState} from 'react';
import { dateFormat } from '../../Utilities/dateFormat'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Modal from '../BaseComponents/Modal'
import RegisteredWorkshopModal from './RegisteredWorkshopModal';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    header: {
        width: '60%'
    },
    media: {
        width: '40%',
        //paddingTop: '56.25%', // 16:9
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    text: {
        fontFamily:'audiowide'
    },
    paper: {
        width: '100%',
        backgroundColor: '#666666',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '&:hover': {
            cursor: 'pointer',
            border: '2px solid  #FF0F7B'
        }
    }
    }));

const RegisteredWorkshopCard = ( { workshop } ) => {
    
    let date = dateFormat(workshop.start_time).date
    let time = dateFormat(workshop.start_time).time


    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }

    let participantsData = workshop.participants !== workshop.workshop_count? `Participants: ${workshop.workshop_count} / ${workshop.participants}` : `WORKSHOP FULL`

    
    const classes = useStyles();
    return (
        <Paper  className={classes.paper}>
            <Card className={classes.root} onClick={toggleModal}>
                <CardHeader
                className={classes.header}
                title= {
                    <Typography className={classes.text}>{workshop.title}</Typography>
                }
                subheader = {
                    <>
                    <Typography className={classes.text}>{`${date}`}</Typography>
                    <Typography className={classes.text}>{`${time}`}</Typography>
                    </>
                }
                />
                <CardMedia
                className={classes.media}
                image={workshop.workshop_img}
                title={workshop.title}
                />
            </Card>

            <Modal open={open} toggleModal={toggleModal}>
                <RegisteredWorkshopModal handleCloseModal={toggleModal} workshop={workshop} dateTime={{date: date, time: time}} participantsData={participantsData}/>
            </Modal>

        </Paper>
    );
}

export default RegisteredWorkshopCard;
