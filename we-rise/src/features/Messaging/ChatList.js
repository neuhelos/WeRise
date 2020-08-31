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
            backgroundColor: '#666666',
            overflow: 'auto',
            position: 'absolute',
        },
        listItem: {
            backgroundColor: '#F5F5F5',
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
            color: '#FF0F7B',
            '&:hover': {
                color: '#36386D'
            }
        }
    })
)

const ChatList = ( props ) => {
    
    const currentUser = useSelector( state => state.currentUserSession )
    const chats = useSelector (state => state.chats)
    const classes = useStyles()
    
    useEffect ( () => {
    }, [chats])


    const currentUserIsLatestSender = (chat) => chat.messages[chat.messages.length-1].sender === currentUser.uid
    

    let multipleChatPeersAvatar = "https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FRainbowSmileyDefaultAvatar.png?alt=media&token=379959f1-6d89-43a4-bf01-92a68841c643"
    
    let chatList = chats.map( (chat, index) => {
        
        let currentUserChatPeers = chat.users.filter(user => user.userId !== currentUser.uid)

        return (
            <div key={index} id={index}>
                <ListItem selected={props.selectedChatIndex === index} classes={{ root: classes.listItem, selected: classes.selected }}
                    onClick={() => {props.selectedChat(index)}}
                    alignItems='flex-start'
                    >
                    <ListItemAvatar>
                        <Avatar src={ chat.usersEmail.length <= 2 ? currentUserChatPeers[0].profileImage : multipleChatPeersAvatar} alt='userAvatar' />
                    </ListItemAvatar>
                    <ListItemText
                        primary={ chat.usersEmail.length <= 2 ? currentUserChatPeers[0].firstName : currentUserChatPeers.map(user => user.firstName).join(" & ").substring(0,50)}
                        secondary={
                                <Typography component='span'>
                                    {chat.messages[chat.messages.length-1].message.substring(0,30)}
                                </Typography>
                        }
                    >
                    </ListItemText>
                    { 
                        chat.receiverHasRead === false && !currentUserIsLatestSender(chat) ? 
                        <ListItemIcon edge='end'>
                            <NotificationsTwoToneIcon className={classes.unreadMessage} fontSize='large'/>
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
            <Box component='div' className={classes.listContainer} p={0}>
                <List className={classes.list}>
                    { !chatList.length ? null : chatList }
                </List>
            </Box>
        </Grid>
    )
}

export default ChatList;
