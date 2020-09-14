import React, {useState} from 'react';
import { useSelector } from 'react-redux'

import WorkshopRegistration from '../WorkshopFeed/WorkshopRegistration'
import FacilitatorModal from './FacilitatorModal'

import { dateFormat } from '../../Utilities/dateFormat'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Paper from '@material-ui/core/Paper'
import Modal from '../BaseComponents/Modal'


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
        margin: theme.spacing(1),
        '&:hover': {
            cursor: 'pointer',
            border: '2px solid  #FF0F7B'
        }
    },
    participants: {
        fontFamily:'audiowide',
        color: '#FF0F7B',
        fontWeight: 700
    },
    }));

const FacilitatorWorkshopCard = ( props ) => {
    
    const currentUser = useSelector( state => state.currentUserSession.uid );

    const { workshop } = props

    let date = dateFormat(workshop.start_time).date
    let startTime = dateFormat(workshop.start_time).time
    let endTime = dateFormat(workshop.end_time).time
    let timezone = dateFormat(workshop.start_time).timezone

    let participantsData = workshop.participants !== Number(workshop.workshop_count) ? `Participants: ${workshop.workshop_count} / ${workshop.participants}` : `WORKSHOP FULL`;

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }


    
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
                    <Typography className={classes.text}>{`${startTime}-${endTime} ${timezone}`}</Typography>
                    <Typography className={workshop.participants !== Number(workshop.workshop_count) ? classes.text : classes.participants}>{participantsData}</Typography>
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
                {workshop.user_id === currentUser || new Date(workshop.end_time) <= new Date() ?
                <FacilitatorModal handleCloseModal={toggleModal} workshop={workshop} participantsData={participantsData}/>
                : <WorkshopRegistration handleCloseModal={toggleModal} participantsData={participantsData} {...props} />}
            </Modal>

        </Paper>
    );
}

export default FacilitatorWorkshopCard;
