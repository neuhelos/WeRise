import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

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
import NotificationsTwoToneIcon from '@material-ui/icons/NotificationsTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        '& *': {
            fontFamily: 'audiowide'
        }
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
    
    const currentUser = useSelector( state => state.currentUserSession.uid )
    const chats = useSelector (state => state.chats)

    const classes = useStyles()
    

    useEffect ( () => {
    }, [chats])

    const currentUserIsLatestSender = (chat) => chat.messages[chat.messages.length-1].sender === currentUser


    let chatList = chats.map( (chat, index) => {
        return (
            <div key={index} id={index}>
                <ListItem className={classes.listItem} selected={props.selectedChatIndex === index} 
                    onClick={() => {props.selectedChat(index)}}
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
                    { 
                        chat.receiverHasRead === false && !currentUserIsLatestSender(chat) ? 
                        <ListItemIcon>
                            <NotificationsTwoToneIcon className={classes.unreadMessage}/>
                        </ListItemIcon>
                        : null
                    }
                </ListItem>
                <Divider></Divider>
            </div>
        )
    })


    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="flex-start" alignItems="flex-start">
            <Button className={classes.button} variant='contained' fullWidth onClick={props.newChat}>NEW CHAT</Button>
            <List className={classes.list}>
                { !chatList.length ? null : chatList }
            </List>
        </Grid>
    )
}

export default ChatList;
