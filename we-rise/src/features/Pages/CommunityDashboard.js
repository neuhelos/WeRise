import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import WorkshopFeed from '../WorkshopFeed/WorkshopFeed'
import WorkshopSearchBar from '../WorkshopFeed/WorkshopSearchBar'
import WorkshopFilterBar from '../WorkshopFeed/WorkshopFilterBar'

import UserWorkshopAgenda from '../UserWorkshopsAgenda/UserWorkshopsAgenda'
import RecentlyPostedWorkshops from '../RecentlyPostedWorkshops/RecentlyPostedWorkshops'

const CommunityDashboard = () => {

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid container item direction="column" justify="center" alignItems="center" xs={6}>
                <Grid item>
                    <Paper>
                        <WorkshopSearchBar />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <WorkshopFilterBar />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <WorkshopFeed />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container item direction="column" justify="center" alignItems="center" xs={6}>
                <Grid item>
                    <Paper>
                        <UserWorkshopAgenda />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <RecentlyPostedWorkshops />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CommunityDashboard;
