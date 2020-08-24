import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { firestore } from '../../Utilities/firebase'

import Grid from '@material-ui/core/Grid';


import ChatList from './ChatList'
import ChatView from './ChatView'

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
        setSelectedChat(chatIndex)
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

    return (
        <>
            <ChatList history={props.history} selectedChat={handleSelectedChat} newChat={handleNewChat} chats={chats} selectedChatIndex={selectedChat}/>
            { newChatFormVisible ? null : <ChatView chat={chats[selectedChat]}/>}
        </>

    )
}

export default Chat;
