import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import WorkshopFeed from '../WorkshopFeed/WorkshopFeed'
import WorkshopSearchBar from '../WorkshopFeed/WorkshopSearchBar'
import WorkshopFilterBar from '../WorkshopFeed/WorkshopFilterBar'

import UserWorkshopAgenda from '../UserWorkshopsAgenda/UserWorkshopsAgenda'
import RecentlyPostedWorkshops from '../RecentlyPostedWorkshops/RecentlyPostedWorkshops'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
    }
}))


const CommunityDashboard = () => {

    const classes = useStyles()

    return (
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems="center">
            <Grid container item direction="column" justify="center" alignItems="center" xs={8}>
                <Grid>
                    <Paper className={classes.paper}>
                        <WorkshopSearchBar />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <WorkshopFilterBar />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <WorkshopFeed />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container item direction="column" justify="center" alignItems="center" xs={4}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <UserWorkshopAgenda />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <RecentlyPostedWorkshops />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CommunityDashboard;
