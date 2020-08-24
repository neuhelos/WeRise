import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
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
        left: '0',
        width: '30%',
        boxShadow: '0px 0px 2px black',
    },
    list: {
        width: '100%'
    },
    listItem: {
        cursor: 'pointer',
        color: 'black'
    },
    button: {
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

const ChatList = ( props ) => {
    
    const classes = useStyles()
    
    const newChat = () => {
        console.log('New Chat')
    }

    const selectChat = (index) => {
        console.log('select chat', index)
    }

    let chats = props.chats.map( (chat, index) => {
        return (
            <>
                <ListItem className={classes.listItem} key={index} selected={props.selectedChatIndex === index} 
                    onClick={()=> selectChat(index)}
                    alignItems='flex-start'
                    >
                    <ListItemAvatar>
                        <Avatar alt=''>USER</Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.listItem} primary='username'
                        secondary={
                                <Typography component='span'>
                                    {chat.messages[chat.messages.length-1].message.substring(0,30)}
                                </Typography>
                        }
                    >
                    </ListItemText>
                </ListItem>
                <Divider></Divider>
            </>
        )
    })

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="flex-start" alignItems="flex-start">
            <Button className={classes.button} variant='contained' fullWidth onClick={props.newChat}>NEW CHAT</Button>
            <List className={classes.list}>
                { props.chats.length ? chats : null}
            </List>
        </Grid>
    )
}

export default ChatList;
