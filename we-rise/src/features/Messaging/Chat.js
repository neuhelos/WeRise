import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase, { firestore } from '../../Utilities/firebase'

import Grid from '@material-ui/core/Grid';


import ChatList from './ChatList'
import ChatView from './ChatView'
import ChatInput from './ChatInput'

const Chat = (props) => {
    
    const currentUser = useSelector( state => state.currentUserSession.uid )
    
    const [selectedChat, setSelectedChat] = useState(null)
    const [newChatFormVisible, setNewChatFormVisible] = useState(false)
    const [chats, setChats] = useState([])


    const handleNewChat = () => {
        setNewChatFormVisible(true)
        setSelectedChat(null)
    }

    
    const handleSelectedChat = (chatIndex) => {
        setNewChatFormVisible(false)
        setSelectedChat(chatIndex);
    }

    
    const fetchChats = async () => {
        await firestore
        .collection('chats')
        .where('users', 'array-contains', currentUser)
        .onSnapshot( async (res) => {
            const chats = res.docs.map(doc => doc.data())
            await setChats(chats)
        })
    }
    
    useEffect ( () => {
        fetchChats()
    }, [])

    let unreadCount = chats.filter(chat => !chat.receiverHasRead).length

    
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


    return (
        <>
            <ChatList history={props.history} selectedChat={handleSelectedChat} newChat={handleNewChat} chats={chats} selectedChatIndex={selectedChat}/>
            { newChatFormVisible ? null : <ChatView chat={chats[selectedChat]}/> }
            { selectedChat !== null && !newChatFormVisible ? <ChatInput submitMessage={submitMessage} messageRead={messageRead} /> : null }
        </>
    )
}

export default Chat;
