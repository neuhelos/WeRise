import React, { useState } from 'react';
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
import WorkshopRegistration from './WorkshopRegistration'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F5F5F5'
    },
    header: {
        width: '50%'
    },
    media: {
        width: '50%',
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

const WorkshopFeedCard = ( props ) => {
    
    const classes = useStyles();
    const { workshop } = props

    const date = `${new Date(workshop.start_time).getMonth()+1}-${new Date(workshop.start_time).getDate()}-${new Date(workshop.start_time).getFullYear()}`
    const startTime = `@${new Date(workshop.start_time).getHours()}:${new Date(workshop.start_time).getMinutes()}0`

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }

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
                    <Typography className={classes.text}>{`${workshop.firstn} ${workshop.lastn}`}</Typography>
                    <Typography className={classes.text}>{date}</Typography>
                    <Typography className={classes.text}>{startTime}</Typography>
                    <Typography className={classes.text}>{workshop.category}</Typography>
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
                <WorkshopRegistration handleCloseModal={toggleModal} {...props} />
            </Modal>

        </Paper>
    );
}

export default WorkshopFeedCard;
