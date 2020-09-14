import React from 'react'
import { Link } from 'react-router-dom'

import { dateFormat } from '../../Utilities/dateFormat'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            outlineColor: '#36386D',
        },
        marginBottom: theme.spacing(2)
    },
    container: {
        width: '50%',
        flex: 1,
    },
    image : {
        width: '50%',
        //border: '2px solid #666666', 
        borderRadius: '4px',
        float: 'right',
        margin: theme.spacing(1)
    },
    button: {
        marginRight: theme.spacing(1),
    },
    profileLink: {
        color: '#F89B29',
        '&:hover': {
            color: '#36386D'
        },
    },
    participants: {
        fontFamily:'audiowide',
        color: '#FF0F7B',
        fontWeight: 700
    },
    text: {

    },
    description: {
        display: 'block'
    }
    }))


const WorkshopDetails = ( { workshop, participantsData } ) => {
    
    const classes = useStyles();

    let date = dateFormat(workshop.start_time).date
    let startTime = dateFormat(workshop.start_time).time
    let endTime = dateFormat(workshop.end_time).time
    let timezone = dateFormat(workshop.start_time).timezone

    return (
            <>
                <Typography align='center' style={{color: '#FF0F7B'}} className={classes.text} gutterBottom={true} variant='h5'>{workshop.title}</Typography>
                <Box className={classes.root} >
                        <img className={classes.image} src={workshop.workshop_img} alt={workshop.title} />
                        <div className={classes.text} style={{display: 'flex'}}>
                            <Typography align='left' variant='subtitle1' gutterBottom={true}>Facilitator:</Typography>
                            <Link to={`/Profile/${workshop.user_id}`} className={classes.profileLink}>
                            <Typography align='left' className={classes.text} variant='subtitle1' gutterBottom={true} style={{ marginLeft: '1rem' }}>{`   ${workshop.firstn} ${workshop.lastn}` }</Typography>
                            </Link>
                        </div>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >{`${date}`}</Typography>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >{`Time: ${startTime}-${endTime} ${timezone}`}</Typography>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >Category: {workshop.category}</Typography>
                        <Typography align='left' variant='body1' gutterBottom={true}  className={workshop.participants !== Number(workshop.workshop_count) ? classes.text : classes.participants}>{participantsData}</Typography>
                        <Typography align='left' className={classes.description} variant='body1' gutterBottom={true} >Description: {workshop.descriptions}</Typography>
                </Box>
            </>
    )
}

export default WorkshopDetails
