import React from 'react'
import { firestore } from '../../Utilities/firebase'

import { makeStyles } from '@material-ui/core/styles';
import { useInput } from '../../Utilities/CustomHookery'

import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({

        main: {
            width: 'auto',
            display: 'block', // Fix IE 11 issue.
            marginLeft: theme.spacing() * 3,
            marginRight: theme.spacing() * 3,
            [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
        },
        },
        paper: {
            padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
            position: 'absolute',
            width: '350px',
            top: '50px',
            left: 'calc(50% + 150px - 175px)'
        },
        input: {
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(),
        },
        submit: {
            marginTop: theme.spacing() * 3
        },
        errorText: {
            color: 'red',
            textAlign: 'center'
        }
    })
)

const NewChatForm = () => {
    
    const classes = useStyles()

    let userSearch = useInput("")
    let newChatMessage = useInput("")
    
    const handleSubmitNewChat = ( event ) => {
        event.preventDefault()
        
    }

    return (
        <div className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.paper}>
                <Typography component='h1' variant='h5'>Send a Message</Typography>
                <form className={classes.form} onSubmit={handleSubmitNewChat}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor='new-chat-username'>
                            Enter A User
                        </InputLabel>
                        <Input id='new-chat-username' required className={classes.input} autofocus {...userSearch} />
                    </FormControl> 
                    <FormControl fullWidth>
                    <InputLabel htmlFor='new-chat-message'>
                            Enter Your Message
                        </InputLabel>
                        <Input id='new-chat-message' required className={classes.input} {...newChatMessage} />
                    </FormControl>
                </form>

            </Paper>
        </div>
    )
}

export default NewChatForm
