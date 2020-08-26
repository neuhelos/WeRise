import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase, { firestore } from '../../Utilities/firebase'

//import { fetchChats } from './ChatSlice'
import { chatsStore } from './ChatSlice'

import ChatList from './ChatList'
import ChatView from './ChatView'
import ChatInput from './ChatInput'
import NewChatForm from './NewChatForm'

import Grid from '@material-ui/core/Grid';

const Chat = (props) => {
    
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
        <>
            <ChatList history={props.history} selectedChat={handleSelectedChat} newChat={handleNewChat} selectedChatIndex={selectedChat}/>
            { newChatFormVisible ? null : <ChatView chat={chats[selectedChat]}/> }
            { selectedChat !== null && !newChatFormVisible ? <ChatInput submitMessage={submitMessage} messageRead={messageRead} /> : null }
            { newChatFormVisible ? <NewChatForm newChatSubmit={newChatSubmit} goToExistingChat={goToExistingChat} /> : null }
        </>
    )
}

export default Chat;
