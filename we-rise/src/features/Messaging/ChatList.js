import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchFirebaseUser } from '../../Utilities/firebaseFunctions'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
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
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        '& *': {
            fontFamily: 'audiowide'
        },
    },
    listContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#282828',
        position: 'relative',
        height: '95%',
    },
    list: {
        width: '100%',
        backgroundColor: '#F5F5F5',
        overflow: 'auto',
        position: 'absolute',
    },
    listItem: {
        cursor: 'pointer',
        color: '#000000',
        '&:hover': {
            background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
            color: '#FFFFFF'
        },
    },
    selected: {
        '&$selected':{
            background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
            color: '#FFFFFF',
            '&:hover':{
                background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
                color: '#FFFFFF',
            }
        }
    },
    button: {
        height: '5%',
        backgroundColor: '#36386D',
        borderRadius: '0px',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#F89B29'
        }
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


    let chatList = chats.map( async (chat, index) => {

        let userData
        if(chat.users.length <= 2){
            let currentUserPeer = chat.users.filter(user => user !== currentUser)
            let firebaseData = fetchFirebaseUser(currentUserPeer[0])
            // await userData === firebaseData
            debugger
        }


        return (
            <div key={index} id={index}>
                <ListItem selected={props.selectedChatIndex === index} classes={{ root: classes.listItem, selected: classes.selected }}
                    onClick={() => {props.selectedChat(index)}}
                    alignItems='flex-start'
                    >
                    <ListItemAvatar>
                        <Avatar src='' alt='username' />
                    </ListItemAvatar>
                    <ListItemText
                        primary={userData.firstName}
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
        <Grid container className={classes.root} display="flex" direction="column" justify="flex-start" alignItems="center">
            <Button className={classes.button} variant='contained' fullWidth onClick={props.newChat}>NEW CHAT</Button>
            <Box component='div' className={classes.listContainer}>
                <List className={classes.list}>
                    { !chatList.length ? null : chatList }
                </List>
            </Box>
        </Grid>
    )
}

export default ChatList;
