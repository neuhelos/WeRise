import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ChatInput from './ChatInput'

const useStyles = makeStyles( theme => ({

    root: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    chatViewContainer: {
        width: '100%',
        height: '80%',
        position: 'relative'
    },
    chatView: {
        padding: theme.spacing(1),
        width: '100%',
        height: '100%',
        overflow: 'auto',
        position: 'absolute'
    },
    currentUserSent: {
        float: 'left',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
    },

    peerSent: {
        float: 'right',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
    },

    chatHeader: {
        backgroundColor: '#344195',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        width: '100%',
        height: '10%',
    },
    chatInput: {
        width: '100%',
        height: '10%',
    } 
    })
);

const ChatView = ( { selectedChat, submitMessage, messageRead } ) => {
    
    const currentUser = useSelector( state => state.currentUserSession.uid )

    const classes = useStyles()

    const chatScrollDown = () => {
        const container = document.getElementById('chatview-container')
        if(container){
            container.scrollTo(0, container.scrollHeight)
        }
    }

    useEffect ( () => {
        chatScrollDown()
    }, [selectedChat])


    const EmptyChatView = () => {
        return (
            <div>
                Select or Start a Chat
            </div>
        )
    }

    const ChatMessages = () => {

        return selectedChat.messages.map( (message, index) => {
            return (
                <div key={index} className={message.sender === currentUser ? classes.currentUserSent : classes.peerSent}>
                    {message.message}
                </div>
            )
        })
    }


    return (
        <div className={classes.root}>
            { selectedChat === undefined ? 
                <EmptyChatView />
            :
            <>
                <div className={classes.chatHeader}>
                    Your Conversation with User
                </div>
                <div className={classes.chatViewContainer}>
                    <div className={classes.chatView} id='chatview-container' >
                        <ChatMessages />
                    </div>
                </div>
                <div className={classes.chatInput}>
                    <ChatInput submitMessage={submitMessage} messageRead={messageRead} />
                </div>
            </>
            }
        </div>
    )

    // if(props.chat === undefined){
    //     return (
    //         <div>
    //             Select a Chat
    //         </div>
    //     )
    // } else {
    //     return(
    //             <div className={classes.content}>
    //                 {props.chat.messages.map( (message, index) => {
    //                 return (
    //                         <div key={index} className={message.sender === currentUser ? classes.userSent : classes.friendSent}>
    //                             {message.message}
    //                         </div>
    //                     )
    //                 })}
    //         </div>
    //     ) 
    // }


}

export default ChatView;
