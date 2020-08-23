import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: 'calc(100% - 35px)',
        position: 'absolute',
        left: '0',
        width: '300px',
        boxShadow: '0px 0px 2px black'
    },
    listItem: {
        cursor: 'pointer'
    },
    newChatBtn: {
        borderRadius: '0px'
    },
    unreadMessage: {
        color: 'red',
        position: 'absolute',
        top: '0',
        right: '5px'
    }
    })
)

const ChatList = () => {
    
    const classes = useStyles()
    
    


    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            
        </Grid>
    )
}

export default ChatList;
