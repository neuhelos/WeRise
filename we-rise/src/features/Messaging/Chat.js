import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase, { firestore } from '../../Utilities/firebase'
import { v4 as uuidv4 } from 'uuid'

import ChatList from './ChatList'
import ChatView from './ChatView'
import NewChatForm from './NewChatForm'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChatInput from './ChatInput'

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
    
    const classes = useStyles()

    const currentUser = useSelector( state => state.currentUserSession )
    const chats = useSelector (state => state.chats)

    const [selectedChatId, setSelectedChatId] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)
    const [newChatFormVisible, setNewChatFormVisible] = useState(false)

    let selectedChatFind = chats.find(chat => chat.chatId === selectedChatId)

    const handleNewChat = () => {
        setNewChatFormVisible(true)
        setSelectedChatId(null)
        setSelectedChat(null)
    }

    const handleSelectedChat = (chat) => {
        setNewChatFormVisible(false)
        setSelectedChatId(chat.chatId)
        setSelectedChat(chat)
    }


    const clickedChatNotSender = (chat) => chat.messages[chat.messages.length-1].sender !== currentUser.uid
    
    const messageRead = () => {
        let chat = chats.find(chat => chat.chatId === selectedChatId)
        setSelectedChat(chat)
        if(clickedChatNotSender(chat)){
            firestore
            .collection('chats')
            .doc(chat.chatId)
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

    
    const submitMessage = (chatId, message) => {
        firestore
        .collection('chats')
        .doc(chatId) //Have to debug chats[selectedChat].chatId
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                firstName: currentUser.firstn,
                message: message,
                sender: currentUser.uid,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date())
            }),
            receiverHasRead: false
        });
    }
    
    const goToExistingChat = async (chatId, message) => {
        setNewChatFormVisible(false)
        setSelectedChatId(chatId)
        await submitMessage(chatId, message)
    }

    const newChatSubmit = async (chatData) => {
        let chatId = uuidv4()
        await firestore
            .collection('chats')
            .doc(chatId)
            .set({
                chatId: chatId,
                messages: [{
                    message: chatData.message,
                    sender: currentUser.uid,
                    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    firstName: currentUser.firstn
                }],
                receiverHasRead: false,
                users: [...chatData.userDetails, {email: currentUser.email, firstName: currentUser.firstn, lastName: currentUser.lastn, profileImage: currentUser.user_pic, userId: currentUser.uid}], 
                usersEmail: [...chatData.recipients, currentUser.email].sort()
            })
        setNewChatFormVisible(false)
        await setSelectedChatId(chatId)
    }


    return (
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems='center'>
            <Grid container item className={classes.container} md={5} direction="column" justify="flex-start" alignItems='center'>
                <ChatList history={props.history} handleSelectedChat={handleSelectedChat} newChat={handleNewChat} selectedChatId={selectedChatId}/> 
            </Grid>
            <Grid container item className={classes.container} md={7} direction="column" justify="flex-start" alignItems='center'>
                { newChatFormVisible ? null : <ChatView selectedChat={selectedChatFind} submitMessage={submitMessage} messageRead={messageRead}/> }
                { newChatFormVisible ? <NewChatForm newChatSubmit={newChatSubmit} goToExistingChat={goToExistingChat} /> : null }
            </Grid>
        </Grid>
    )
}

export default Chat;
