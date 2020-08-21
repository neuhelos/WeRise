import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';

import WorkshopFeed from '../WorkshopFeed/WorkshopFeed'
import WorkshopFeedSearchForm from '../WorkshopFeed/WorkshopFeedSearchForm'

import UserWorkshopAgenda from '../UserWorkshopsAgenda/UserWorkshopsAgenda'
import RecentlyPostedWorkshops from '../RecentlyPostedWorkshops/RecentlyPostedWorkshops'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide'
        },
        flex: 1,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    tabBar: {
        backgroundColor: '#F5F5F5',
        top: '6rem'
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
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    const classes = useStyles()

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3} className={classes.container}>
            <Typography className={classes.container}>{children}</Typography>
            </Box>
        )}
        </div>
    );
    }

const a11yProps = (index) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}


const MobileCommunityDashboard = () => {

    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="sticky" color="default" className={classes.tabBar}>
                <Tabs
                    className={classes.tabBar}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant='fullWidth'
                    aria-label="mobiledashboard-tab-bar"
                >
                    <Tab label="Workshop Search" {...a11yProps(0)} />
                    <Tab label="Workshops I'm Attending" {...a11yProps(1)} />
                    <Tab label="Recently Posted Workshops" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Paper className={classes.paper}>
                        <WorkshopFeedSearchForm />
                    </Paper>
                    <Paper className={classes.paper}>
                        <WorkshopFeed />
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Paper className={classes.paper}>
                        <UserWorkshopAgenda />
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Paper className={classes.paper}>
                        <RecentlyPostedWorkshops />
                    </Paper>
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}

export default MobileCommunityDashboard;
