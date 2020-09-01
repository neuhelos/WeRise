import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import MobileCommunityDashboard from './MobileCommunityDashboard'

import WorkshopFeed from '../WorkshopFeed/WorkshopFeed'
import WorkshopFeedSearchForm from '../WorkshopFeed/WorkshopFeedSearchForm'

import RegisteredWorkshops from '../RegisteredWorkshops/RegisteredWorkshops'
import RecentlyPostedWorkshops from '../RecentlyPostedWorkshops/RecentlyPostedWorkshops'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

    const theme = useTheme();
    const mobileMediaQuery = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles()

    return (
        !mobileMediaQuery ?
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
                        <RegisteredWorkshops />
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
            : <MobileCommunityDashboard />
    )
}

export default CommunityDashboard;
