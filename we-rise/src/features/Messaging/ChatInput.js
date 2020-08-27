import React, { useState, useEffect } from 'react'

import { useInput } from '../../Utilities/CustomHookery'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';

const useStyles = makeStyles( theme => ({ 

        sendBtn: {
            color: 'blue',
                cursor: 'pointer',
                '&:hover': {
                    color: 'gray'
                }
            },
        chatTextBoxContainer: {
            overflow: 'auto',
            width: '100%'
        },
        chatTextBox: {
            width: '100%'
        }
    })
)

const ChatInput = ( props ) => {
    
    const classes = useStyles()

    const input = useInput("")
    
    const handleMessageInput = (event) => {
        return event.keyCode === 13 ? handleSubmit(event) : input.onChange(event)
    }

    const userClickedInput = () => {
        props.messageRead()
    }

    const messageValidation  = (message) => {
        return message && message.replace(/\s/g, "").length
    }

    const handleSubmit = (event) => {
        if(messageValidation(input.value)){
            props.submitMessage(input.value)
            event.target.value = ""
        }
    }
    
    return (
        <div className={classes.chatTextBoxContainer}>
            <TextField placeholder="Enter New Message..." onKeyUp={handleMessageInput} onFocus={userClickedInput} />
            <Send className={classes.sendBtn} onClick={handleSubmit} />
        </div>
    )
}

export default ChatInput

