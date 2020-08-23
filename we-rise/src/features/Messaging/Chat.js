import React, {useState} from 'react'

import ChatList from './ChatList' 

const Chat = (props) => {
    
    
    const [selectedChat, setSelectedChat] = useState(null)
    const [newChatFormVisible, setNewChatFormVisible] = useState(false)
    const [chats, setChats] = useState([])


    const handleNewChat = () => {
        console.log("New Chat Button Clicked")
        setNewChatFormVisible(true)
    }

    const selectChat = () => {
        console.log('Select Chat')
    }
    
    
    
    return (
        <>
            <ChatList history={props.history} selectedChatIndex={setSelectedChat} chats={setChats} newChat={handleNewChat}/>
        </>

    )
}

export default Chat;
