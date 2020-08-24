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
            position: 'absolute',
            bottom: '15px',
            left: '315px',
            boxSizing: 'border-box',
            overflow: 'auto',
            width: 'calc(100% - 300px - 50px)'
        },
        chatTextBox: {
            width: 'calc(100% - 25px)'
        }
    })
)

const ChatInput = ( props ) => {
    
    const classes = useStyles()

    const input = useInput("")
    
    const handleMessageInput = (event) => {
        return event.keyCode === 13 ? handleSubmit() : input.onChange(event)
    }

    const userClickedInput = () => {
        console.log('Clicked Input')
    }

    const messageValidation  = (message) => {
        return message && message.replace(/\s/g, "").length
    }

    const handleSubmit = (event) => {
        if(messageValidation(input.value)){
            props.submitMessage(input.value)
            input.clearinput()
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

