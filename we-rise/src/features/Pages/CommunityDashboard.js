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
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'nowrap'
        }
    },
    container: {
        flexGrow: 1,
    },
    gridItem: {
        margin: theme.spacing(0.5),
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
        alignContent: 'center'
    }
}))


const CommunityDashboard = () => {

    const classes = useStyles()

    return (
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems="center">
            <Grid container item direction="column" justify="start" alignItems="center" sm={12} md={7}>
                {/* <Grid container item className={classes.gridItem} justify="center" alignItems="center" > */}
                    <Paper className={classes.paper}>
                        <WorkshopFeedSearchForm />
                    </Paper>
                {/* </Grid> */}
                {/* <Grid container item  className={classes.gridItem} direction="column" justify="center" alignItems="center"  > */}
                    <Paper className={classes.paper}>
                        <WorkshopFeed />
                    </Paper>
                {/* </Grid> */}
            </Grid>
            <Grid container item direction="column" justify="start" alignItems="center" sm={12} md={5}>
                    <Paper className={classes.paper}>
                        <UserWorkshopAgenda />
                    </Paper>
                    <Paper className={classes.paper}>
                        <RecentlyPostedWorkshops />
                    </Paper>
            </Grid>
        </Grid>
    )
}

export default CommunityDashboard;
