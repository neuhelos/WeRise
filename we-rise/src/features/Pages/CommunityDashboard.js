import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import WorkshopFeed from '../WorkshopFeed/WorkshopFeed'
import WorkshopFeedSearchForm from '../WorkshopFeed/WorkshopFeedSearchForm'

import UserWorkshopAgenda from '../UserWorkshopsAgenda/UserWorkshopsAgenda'
import RecentlyPostedWorkshops from '../RecentlyPostedWorkshops/RecentlyPostedWorkshops'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        height: '100%',
    },
    gridItem: {
        margin: theme.spacing(0.5),
        width: '100%',
        justify: 'center'
    },
    paper: {
        width: '75%',
        padding: theme.spacing(1),
        backgroundColor: '#282828',
        color: 'white'
    }
}))


const CommunityDashboard = () => {

    const classes = useStyles()

    return (
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems="center">
            <Grid container item className={classes.container} direction="column" justify="start" alignItems="center" spacing={4} xs={7}>
                <Grid container item className={classes.gridItem} justify="center" >
                    <Paper className={classes.paper}>
                        <WorkshopFeedSearchForm />
                    </Paper>
                </Grid>
                <Grid container item className={classes.gridItem} justify="center" >
                    <Paper className={classes.paper}>
                        <WorkshopFeed />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container className={classes.container} item direction="column" justify="start" alignItems="center" spacing={4} xs={5}>
                <Grid container item className={classes.gridItem} justify="center" >
                    <Paper className={classes.paper}>
                        <UserWorkshopAgenda />
                    </Paper>
                </Grid>
                <Grid container item className={classes.gridItem} justify="center" >
                    <Paper className={classes.paper}>
                        <RecentlyPostedWorkshops />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CommunityDashboard;
