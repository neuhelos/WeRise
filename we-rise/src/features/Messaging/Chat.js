import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase, { firestore } from '../../Utilities/firebase'


import ChatList from './ChatList'
import ChatView from './ChatView'
import NewChatForm from './NewChatForm'

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
    
    const classes = useStyles()

    const currentUser = useSelector( state => state.currentUserSession.uid )
    const chats = useSelector (state => state.chats)

    const [selectedChat, setSelectedChat] = useState(null)
    const [newChatFormVisible, setNewChatFormVisible] = useState(false)


    const handleNewChat = () => {
        setNewChatFormVisible(true)
        setSelectedChat(null)
    }

    
    const handleSelectedChat = (chatIndex) => {
        setNewChatFormVisible(false)
        setSelectedChat(chatIndex);
    }


    const clickedChatNotSender = (chatIndex) => chats[chatIndex].messages[chats[chatIndex].messages.length-1].sender !== currentUser
    
    const messageRead = () => {
        const docKey = buildDocKey(chats[selectedChat].users.filter(user => user !== currentUser)[0])
        if(clickedChatNotSender(selectedChat)){
            firestore
            .collection('chats')
            .doc(docKey)
            .update({
                receiverHasRead: true
            })
        }
    }
    
    useEffect( () => {
        if(selectedChat) messageRead()
    }, [selectedChat])

    const buildDocKey = (peer) => {
        return [currentUser, peer].sort().join(":")
    }
    

    
    const submitMessage = (message) => {
        const docKey = buildDocKey(chats[selectedChat].users.filter(user => user !== currentUser)[0]);
        firestore
        .collection('chats')
        .doc(docKey)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                message: message,
                sender: currentUser,
                timestamp: Date.now()
            }),
            receiverHasRead: false
        });
        
    }
    
    const goToExistingChat = async (docKey, message) => {
        const usersInChat = docKey.split(':')
        const chat = chats.find( chat => usersInChat.every( user => chat.users.includes(user)))
        setNewChatFormVisible(false)
        await setSelectedChat(chats.indexOf(chat))
        submitMessage(message)
    }

    const newChatSubmit = async (chatObject) => {
        const docKey = buildDocKey(chatObject.sendTo)
        await firestore
            .collection('chats')
            .doc(docKey)
            .set({
                messages: [{
                    message: chatObject.message,
                    sender: currentUser
                }],
                receiverHasRead: false,
                users: [currentUser, chatObject.sendTo]
            })
        setNewChatFormVisible(false)
        setSelectedChat(chats.length-1)
    }


    return (
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems='center'>
            <Grid container item className={classes.container} md={5} direction="column" justify="flex-start" alignItems='center'>
                <ChatList history={props.history} selectedChat={handleSelectedChat} newChat={handleNewChat} selectedChatIndex={selectedChat}/> 
            </Grid>
            <Grid container item className={classes.container} md={7} direction="column" justify="flex-start" alignItems='center'>
                { newChatFormVisible || selectedChat === null ? null : <ChatView selectedChat={chats[selectedChat]} submitMessage={submitMessage} messageRead={messageRead}/> }
                { newChatFormVisible ? <NewChatForm newChatSubmit={newChatSubmit} goToExistingChat={goToExistingChat} /> : null }
            </Grid>
        </Grid>
    )
}

export default Chat;
