import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            outlineColor: '#36386D',
        },
    },
    container: {
        width: '50%',
        flex: 1,
        marginBottom: theme.spacing(2)
    },
    image : {
        width: '75%',
        border: '2px solid #666666', 
        borderRadius: '4px'
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
    text: {
        width: '100%',
    }
    }))


const WorkshopDetails = ( { workshop, dateTime, participantsData } ) => {
    
    const classes = useStyles();

    return (
            <>
                <Typography align='center' style={{color: '#FF0F7B'}} className={classes.text} gutterBottom={true} variant='h5'>{workshop.title}</Typography>
                <Grid className={classes.root} container display="flex" direction="row" justify="center" alignItems="flex-start">
                    <Grid className={classes.container} container display="flex" direction="column" justify="flex-start" alignItems="center">
                        <div style={{display:"flex", width: '100%'}}>
                            <Typography align='left' variant='subtitle1' gutterBottom={true}>Facilitator:</Typography>
                            <Link to={`/Profile/${workshop.user_id}`} className={classes.profileLink}>
                            <Typography align='left' className={classes.text} variant='subtitle1' gutterBottom={true} >{` ${workshop.firstn} ${workshop.lastn}` }</Typography>
                            </Link>
                        </div>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >{`${dateTime.date} ${dateTime.time}`}</Typography>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >Description: {workshop.descriptions}</Typography>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >Category: {workshop.category}</Typography>
                        <Typography align='left' variant='body1' gutterBottom={true}  className={workshop.participants !== workshop.workshop_count ? classes.text : classes.participants}>{participantsData}</Typography>
                    </Grid>
                    <Grid className={classes.container} container display="flex" direction='row' justify="center" alignItems="center">
                        <img className={classes.image} src={workshop.workshop_img} alt={workshop.title} />
                    </Grid>
                </Grid>
            </>
    )
}

export default WorkshopDetails
