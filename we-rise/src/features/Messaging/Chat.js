import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase, { firestore } from '../../Utilities/firebase'
import { v4 as uuidv4 } from 'uuid'

import ChatList from './ChatList'
import ChatView from './ChatView'
import NewChatForm from './NewChatForm'
import MobileChat from './MobileChat'

import { submitMessageExistingChat, newChatSubmit } from '../../Utilities/chatBase'

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            height: '100%',
            //flex: 1,
        },
        container: {
            width: '100%',
            height: '100%',
        }
    })
)

const Chat = (props) => {
    
    const theme = useTheme();
    const mobileMediaQuery = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles()

    const currentUser = useSelector( state => state.currentUserSession )
    const chats = useSelector (state => state.chats)

    const [selectedChatId, setSelectedChatId] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)
    const [newChatFormVisible, setNewChatFormVisible] = useState(false)

    //let selectedChatFind = chats.find(chat => chat.chatId === selectedChatId)

    const handleNewChat = () => {
        setNewChatFormVisible(true)
        setSelectedChatId(null)
        setSelectedChat(null)
    }

    const handleSelectedChat = (chatId) => {
        setNewChatFormVisible(false)
        setSelectedChatId(chatId)
        console.log(selectedChatId)
        debugger
    }

    const messageRead = () => {
        const clickedChatNotSender = (chat) => chat.messages[chat.messages.length-1].sender !== currentUser.uid
        // let chat = chats.find(chat => chat.chatId === selectedChatId)
        // setSelectedChat(chat)
        if(clickedChatNotSender(selectedChat)){
            firestore
            .collection('chats')
            .doc(selectedChat.chatId)
            .update({
                receiverHasRead: true
            })
        }
    }
    
    useEffect( () => {
        let isMounted = true
        if(isMounted){
            if(selectedChat) messageRead()
        }
        return () => isMounted = false
    }, [selectedChat])

    useEffect(() => {
		setSelectedChat(chats.find(chat => chat.chatId === selectedChatId))
	}, [chats, selectedChatId]);

    const goToExistingChat = async (chatId, message) => {
        setNewChatFormVisible(false)
        setSelectedChatId(chatId)
        await submitMessageExistingChat(chatId, currentUser.firstn, currentUser.uid, message)
    }

    const newChatFormSubmit = async (chatData) => {
        let usersEmail = [...chatData.recipients, currentUser.email].sort()
        let currentUserDetails = {email: currentUser.email, firstName: currentUser.firstn, lastName: currentUser.lastn, profileImage: currentUser.user_pic, userId: currentUser.uid}
        let chatUserDetails = [...chatData.userDetails, currentUserDetails]
        let chatId = await newChatSubmit(currentUser.uid, currentUser.firstn, chatUserDetails, usersEmail, chatData.message)
        
        setNewChatFormVisible(false)
        await setSelectedChatId(chatId)
    }


    return (
        mobileMediaQuery ? 
        <div className={classes.root}>
            <MobileChat />
        </div>
        :
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems='center'>
            <Grid container item className={classes.container} md={5} direction="column" justify="flex-start" alignItems='center'>
                <ChatList history={props.history} handleSelectedChat={handleSelectedChat} newChat={handleNewChat} selectedChatId={selectedChatId}/> 
            </Grid>
            <Grid container item className={classes.container} md={7} direction="column" justify="flex-start" alignItems='center'>
                { newChatFormVisible ? null : <ChatView selectedChatId={selectedChatId} selectedChat={selectedChat} messageRead={messageRead}/> }
                { newChatFormVisible ? <NewChatForm newChatFormSubmit={newChatFormSubmit} goToExistingChat={goToExistingChat} /> : null }
            </Grid>
        </Grid>
    )
}

export default Chat;
