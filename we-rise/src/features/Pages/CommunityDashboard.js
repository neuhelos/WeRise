import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import WorkshopFeed from '../WorkshopFeed/WorkshopFeed'
import WorkshopFeedSearchForm from '../WorkshopFeed/WorkshopFeedSearchForm'

import UserWorkshopAgenda from '../UserWorkshopsAgenda/UserWorkshopsAgenda'
import RecentlyPostedWorkshops from '../RecentlyPostedWorkshops/RecentlyPostedWorkshops'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'nowrap'
        }
    },
    gridSection: {
        padding: theme.spacing(1),
        height: '100%',
        width: '100%',
    },
    paper: {
        width: '90%',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        backgroundColor: '#282828',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    paperWrapper: {
        width: '90%',
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


const CommunityDashboard = () => {

    const classes = useStyles()

    return (
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems="center">
            <Grid className={classes.gridSection} container item direction="column" justify="flex-start" alignItems="center" sm={12} md={7}>
                <Paper className={classes.paperWrapper}>
                    <Paper className={classes.paperTitle}>
                        <Typography className={classes.text} variant='h5'>WORKSHOPS</Typography>
                    </Paper>
                </Paper>
                <Paper className={classes.paper}>
                    <WorkshopFeedSearchForm />
                </Paper>
                <Paper className={classes.paper}>
                    <WorkshopFeed />
                </Paper>
            </Grid>
            <Grid className={classes.gridSection}  container item direction="column" justify="flex-start" alignItems="center" sm={12} md={5}>
                <Paper className={classes.paperWrapper}>
                    <Paper className={classes.paperTitle}>
                        <Typography className={classes.text} variant='subtitle1'>Workshops I'm Attending</Typography>
                    </Paper>
                </Paper>
                <Paper className={classes.paper}>
                    <UserWorkshopAgenda />
                </Paper>
                <Paper className={classes.paperWrapper}>
                    <Paper className={classes.paperTitle}>
                        <Typography className={classes.text} variant='subtitle1'>Recently Posted Workshops</Typography>
                    </Paper>
                </Paper>
                <Paper className={classes.paper}>
                    <RecentlyPostedWorkshops />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CommunityDashboard;
