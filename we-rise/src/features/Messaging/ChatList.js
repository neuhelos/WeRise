import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { firestore } from '../../Utilities/firebase'


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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';

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
            overflow: "auto",
        },
        list: {
            width: '100%',
            backgroundColor: '#666666',
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
        avatar: {
            '&:hover': {
                border: '3px solid #F89B29'
            }
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
            },
            fontSize: '1rem'
        },
        unreadMessage: {
            color: '#FF0F7B',
            '&:hover': {
                color: '#36386D'
            },
            margin: 'auto',
            justifyContent: 'flex-end'
        },
        divider: {
            backgroundColor: '#A3A3A3'
        },
        text: {
            width: '20rem',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
    })
)

const ChatList = ( props ) => {
    
    const currentUser = useSelector( state => state.currentUserSession )
    const chats = useSelector (state => state.chats)
    const classes = useStyles()
    
    useEffect ( () => {
    }, [chats])


    const handleDeleteChat = (event, chatId) => {
        try {
            firestore
            .collection("chats")
            .doc(chatId)
            .delete()
            .then(res => {
                console.log("Document successfully deleted!", res);
            })
        } catch (error) {
            console.error("Error removing document: ", error);
        };
        event.stopPropagation()
        props.handleSelectedChat(null)
    }

    const currentUserIsLatestSender = (chat) => chat.messages[chat.messages.length-1].sender === currentUser.uid


    let multipleChatPeersAvatar = "https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FRainbowSmileyDefaultAvatar.png?alt=media&token=379959f1-6d89-43a4-bf01-92a68841c643"
    
    let chatList = chats.map( (chat) => {
        
        let currentUserChatPeers = chat.users.filter(user => user.userId !== currentUser.uid)

        return (
            <div key={chat.chatId} id={chat.chatId}>
                <ListItem selected={props.selectedChatId === chat.chatId} classes={{ root: classes.listItem, selected: classes.selected }}
                    onClick={() => {props.handleSelectedChat(chat.chatId)}}
                    alignItems='flex-start'
                    >
                    <ListItemAvatar>
                        <Avatar className={classes.avatar} src={ chat.usersEmail.length <= 2 ? currentUserChatPeers[0].profileImage : multipleChatPeersAvatar} alt='userAvatar' />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography className={classes.text}>
                                {chat.usersEmail.length <= 2 ? currentUserChatPeers[0].firstName : currentUserChatPeers.map(user => user.firstName).join(" & ")}
                            </Typography>
                        }
                        secondary={
                                <Typography className={classes.text}>
                                    {chat.messages[chat.messages.length-1].message}
                                </Typography>
                        }
                    >
                    </ListItemText>
                    { 
                        chat.receiverHasRead === false && !currentUserIsLatestSender(chat) ? 
                        <ListItemIcon edge='end' className={classes.unreadMessage}>
                            <NotificationsTwoToneIcon fontSize='large'/>
                        </ListItemIcon>
                        : null
                    }
                    <IconButton className={classes.deleteChat} edge="end" color="inherit" onClick={(event) => handleDeleteChat(event, chat.chatId)}>
                        <DeleteIcon fontSize='large' />
                    </IconButton>
                </ListItem>
                <Divider className={classes.divider}></Divider>
            </div>
        )
    })
    

    return (
        <Grid container className={classes.root} display="flex" direction="column" justify="flex-start" alignItems="center">
            <Button className={classes.button} variant='contained' fullWidth onClick={props.newChat}>START A CHAT</Button>
            <Box component='div' className={classes.listContainer} p={0}>
                <List className={classes.list}>
                    { !chatList.length ? null : chatList }
                </List>
            </Box>
        </Grid>
    )
}

export default ChatList;
