import React, { useState } from 'react';

import { DateTime } from 'luxon'

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
import { Link } from 'react-router-dom'
import Modal from '../BaseComponents/Modal'
import WorkshopRegistration from './WorkshopRegistration'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F5F5F5'
    },
    header: {
        width: '60%'
    },
    media: {
        width: '40%',
        //paddingTop: '56.25%', // 16:9
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    text: {
        fontFamily:'audiowide'
    },
    participants: {
        fontFamily:'audiowide',
        color: '#FF0F7B',
        fontWeight: 700
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

const WorkshopFeedCard = ( props ) => {
    
    const classes = useStyles();
    const { workshop } = props

    let date = `${DateTime.fromISO(workshop.start_time).toFormat('EEE')}, 
    ${DateTime.fromISO(workshop.start_time).toFormat('MMM')} 
    ${DateTime.fromISO(workshop.start_time).toFormat('d')},  
    ${DateTime.fromISO(workshop.start_time).toFormat('y')}`

    let time = `${DateTime.fromISO(workshop.start_time).toFormat('T')} ${DateTime.fromISO(workshop.start_time).toFormat('ZZZZ')}`

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }

    let participantsData = workshop.participants !== workshop.workshop_count? `Participants: ${workshop.workshop_count} / ${workshop.participants}` : `WORKSHOP FULL`

    return (
        <Paper className={classes.paper}>
            <Card className={classes.root} onClick={toggleModal}>
                <CardHeader
                className={classes.header}
                avatar={
                    <Avatar aria-label="facilitator" className={classes.avatar} src={workshop.user_pic} alt={workshop.firstn.toUpperCase()}/>
                }
                title= {
                    <Typography className={classes.text}>{workshop.title}</Typography>
                }
                subheader = {
                    <>
                    <Link to={`/Profile/${workshop.user_id}`}className="profile">
                    <Typography className={classes.text}>{`${workshop.firstn} ${workshop.lastn}`}
				
                    </Typography>
				</Link>
                    <Typography className={classes.text}>{`${date}`}</Typography>
                    <Typography className={classes.text}>{`${time}`}</Typography>
                    <Typography className={workshop.participants !== workshop.workshop_count ? classes.text : classes.participants}>{participantsData}</Typography>
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
                <WorkshopRegistration handleCloseModal={toggleModal} dateTime={{date: date, time: time}} {...props} />
            </Modal>

        </Paper>
    );
}

export default WorkshopFeedCard;
