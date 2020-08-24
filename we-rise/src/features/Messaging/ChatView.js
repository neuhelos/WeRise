import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({

    content: {
        height: 'calc(100vh - 100px)',
        overflow: 'auto',
        padding: '25px',
        marginLeft: '300px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: '50px',
        width: '70%',
        position: 'absolute'
    },

    userSent: {
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

    friendSent: {
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
        width: 'calc(100% - 301px)',
        height: '50px',
        backgroundColor: '#344195',
        position: 'fixed',
        marginLeft: '301px',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '10px',
        boxSizing: 'border-box'
    }

    })
);

const ChatView = ( props ) => {
    
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
    }, [props.chat])


    const EmptyChatView = () => {
        return (
            <div>
                Select or Start a Chat
            </div>
        )
    }

    const ChatMessages = () => {

        return props.chat.messages.map( (message, index) => {
            return (
                <div key={index} className={message.sender === currentUser ? classes.userSent : classes.friendSent}>
                    {message.message}
                </div>
            )
        })
    }


    return (
        <div>
            <div className={classes.chatHeader}>
                Your Conversation with User
            </div>
            <div className={classes.content} id='chatview-container' >
                {props.chat === undefined ? <EmptyChatView /> : <ChatMessages /> }
            </div>
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
