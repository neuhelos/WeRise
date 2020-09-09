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
        display: 'block',
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
    }
    }))


const WorkshopDetails = ( { workshop, dateTime, participantsData } ) => {
    
    const classes = useStyles();

    return (
            <>
                <Typography align='center' style={{color: '#FF0F7B'}} className={classes.text} gutterBottom={true} variant='h5'>{workshop.title}</Typography>
                <Grid className={classes.root} container>
                    {/* <Grid className={classes.container} container display="flex" direction="column" justify="flex-start" alignItems="center"> */}
                        <div className={classes.text} style={{display: 'flex'}}>
                            <Typography align='left' variant='subtitle1' gutterBottom={true}>Facilitator:</Typography>
                            <Link to={`/Profile/${workshop.user_id}`} className={classes.profileLink}>
                            <Typography align='left' className={classes.text} variant='subtitle1' gutterBottom={true} style={{ marginLeft: '1rem' }}>{`   ${workshop.firstn} ${workshop.lastn}` }</Typography>
                            </Link>
                        </div>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >{`${dateTime.date} ${dateTime.time}`}</Typography>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >Description: {workshop.descriptions}</Typography>
                        <Typography align='left' className={classes.text} variant='body1' gutterBottom={true} >Category: {workshop.category}</Typography>
                        <Typography align='left' variant='body1' gutterBottom={true}  className={workshop.participants !== workshop.workshop_count ? classes.text : classes.participants}>{participantsData}</Typography>
                        <img className={classes.image} src={workshop.workshop_img} alt={workshop.title} />
                    {/* </Grid> */}
                    {/* <Grid className={classes.container} container display="flex" direction='row' justify="center" alignItems="center">
                    </Grid> */}
                </Grid>
            </>
    )
}

export default WorkshopDetails
