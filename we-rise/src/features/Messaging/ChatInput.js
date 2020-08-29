import React, { useState, useEffect } from 'react'

import { useInput } from '../../Utilities/CustomHookery'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Send from '@material-ui/icons/Send';

const useStyles = makeStyles( theme => ({ 

        sendBtn: {
            color: '#FF0F7B',
            cursor: 'pointer',
            '&:hover': {
                color: '#F89B29'
                }
            },
        newMessageContainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        newMessage: {
            color: '#000000',
            width: '90%',
            background: '#F5F5F5',
            fontSize: '2rem',
            border: '3px solid #F89B29',
            borderRadius: '10px',
            '&:hover': {
                border: '3px solid #36386D',
            },
            '&:focus': {
                border: '3px solid #36386D',
                outline: 'none'
            }
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
        <Container className={classes.newMessageContainer}>
            <TextField className={classes.newMessage} InputProps={{style: {fontSize: '1.5rem', lineHeight: '2.5rem', paddingLeft: '2px', paddingRight: '2px'}, disableUnderline: true}} placeholder="Enter New Message..." multiline rows={1} onKeyUp={handleMessageInput} onFocus={userClickedInput} />
            <Send className={classes.sendBtn} onClick={handleSubmit} style={{ fontSize: '4rem' }}/>
        </Container>
    )
}

export default ChatInput

