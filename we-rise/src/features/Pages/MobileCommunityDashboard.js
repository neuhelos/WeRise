import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid'
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
        flex: 1
    },
    tabBar: {
        backgroundColor: '#F5F5F5'
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
            <Box p={3}>
            <Typography>{children}</Typography>
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
            <AppBar position="static" color="default">
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
                    <WorkshopFeedSearchForm />
                    <WorkshopFeed />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <UserWorkshopAgenda />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <RecentlyPostedWorkshops />
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}

export default MobileCommunityDashboard;
