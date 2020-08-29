import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { firestore } from '../../Utilities/firebase'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';

import ChatInput from './ChatInput'

const useStyles = makeStyles( theme => ({

    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        '& *': {
            fontFamily: 'audiowide'
        }
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
        padding: theme.spacing(2),
        wordWrap: 'break-word',
        margin: theme.spacing(1),
        backgroundColor: '#FF0F7B',
        color: 'white',
        width: '45%',
        border: '2px solid #F5F5F5',
        borderRadius: '10px'
    },

    peerSent: {
        float: 'right',
        clear: 'both',
        padding: theme.spacing(2),
        wordWrap: 'break-word',
        margin: theme.spacing(1),
        backgroundColor: '#F89B29',
        color: 'white',
        width: '45%',
        border: '2px solid #F5F5F5',
        borderRadius: '10px'
    },

    chatHeader: {
        backgroundColor: '#36386D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: 'white',
        width: '100%',
        height: '5%',

    },
    chatInput: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    } 
    })
);

const ChatView = ( { selectedChat, submitMessage, messageRead } ) => {
    
    const currentUser = useSelector( state => state.currentUserSession.uid )

    const classes = useStyles()


    const [chatPeers, setChatPeers] = useState("")

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
                <Container className={classes.chatHeader}>
                    <Typography>
                        { `Your Conversation with ${chatPeers.firstName}`}
                    </Typography>
                </Container>
                <div className={classes.chatViewContainer}>
                    <div className={classes.chatView} id='chatview-container' >
                        <ChatMessages />
                    </div>
                </div>
                <Container className={classes.chatInput}>
                    <ChatInput submitMessage={submitMessage} messageRead={messageRead} />
                </Container>
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
