import React from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import FacilitatorWorkshops from "../UserComponents/FacilitatorWorkshops";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import "../../styling/UserProfilePage.css";


import UserProfileHeader from "../UserComponents/UserProfileHeader";

import PastFacilitatorWorkshops from '../UserComponents/PastFacilitatorWorkshops'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        padding: theme.spacing(2)
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        backgroundColor: '#282828',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    paperWrapper: {
        width: '100%',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: '#282828',
    },
    paperTitle: {
        width: '100%',
        backgroundColor: '#666666',
        color: '#FFFFFF',
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        
    },
    text: {
        fontFamily: 'audiowide'
    }
}))


const UserProfilePage = () => {

    const classes = useStyles()


    return (

        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems="center">
                <Paper className={classes.paper} >
                    <UserProfileHeader />
                </Paper>
                <Paper className={classes.paperWrapper}>
                    <Paper className={classes.paperTitle}>
                        <Typography className={classes.text} variant='h5'>WORKSHOPS I'M FACILITATING</Typography>
                    </Paper>
                </Paper>
                <Paper className={classes.paper}>
                    <FacilitatorWorkshops  />
                </Paper>
                <Paper className={classes.paperWrapper}>
                    <Paper className={classes.paperTitle}>
                        <Typography className={classes.text} variant='h5'>PAST WORKSHOPS I FACILITATED</Typography>
                    </Paper>
                </Paper>
                <Paper className={classes.paper}>
                    <PastFacilitatorWorkshops  />
                </Paper>
        </Grid>

    );
};
export default UserProfilePage;