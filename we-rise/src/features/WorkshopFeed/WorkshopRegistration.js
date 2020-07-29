import React from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

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


const WorkshopRegistration = ({ workshop }) => {
    
    const classes = useStyles();

    const workshopImage = workshop.workshop_img

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            <Typography variant='h4'>{workshop.title}</Typography>
            <Typography variant='h6'>Facilitator: {`${workshop.firstn} ${workshop.lastn}`}</Typography>
            <Typography variant='h10'>Description: {workshop.descriptions}</Typography>
            <img className={classes.image} src={workshopImage} alt="workshop.title"/>
            <Button variant="contained" color="primary" type="submit"> REGISTER FOR THIS WORKSHOP </Button>
        </Grid>
    )
}

export default WorkshopRegistration;
