import React, {useState} from 'react'
import { firestore } from '../../Utilities/firebase'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import { useInput } from '../../Utilities/CustomHookery'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, InputLabel, Input, Button, Paper, Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({

        root: {
            width: '80%',
            margin: 'auto'
        },
        paper: {
            padding: theme.spacing(2),
            width: '100%'
        },
        input: {
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            marginTop: theme.spacing(1)
        },
        errorText: {
            color: 'red',
            textAlign: 'center'
        }
    })
)

const NewChatForm = ( props ) => {
    
    const classes = useStyles()

    const currentUser = useSelector( state => state.currentUserSession.uid )

    let userSearch = useInput("")
    let newChatMessage = useInput("")
    const [users, setUsers] = useState([])
    const [userServerError, setUserServerError] = useState("")
    
    const handleChatUsers = (event, values) => {
        setUsers(values)
    }

    const usersExist = async () => {
        const usersSnapshot = await firestore
            .collection('users')
            .get()
        const allUsersExist = usersSnapshot.docs.map( doc => doc.data().email).includes(users.forEach( user => user));
        if(!allUsersExist) setUserServerError('A User Does Not Exist')
        return allUsersExist
    }

    const buildDocKey = () => {
        return [currentUser, "userSearch uid"].sort().join(":")
    }

    const chatExists = async () => {
        const docKey = buildDocKey()
        const chat = await firestore
            .collection('chats')
            .doc(docKey)
            .get()
        return chat
    }

    const createChat = () => {
        props.newChatSubmit({
            sendTo: userSearch.value,
            message: newChatMessage.value
        })
    }

    const displayExistingChat = () => {
        props.goToExistingChat(buildDocKey(), newChatMessage.value)
    }

    const handleSubmitNewChat = async ( event ) => {
        event.preventDefault()
        let existingUsers = await usersExist()
        if(existingUsers){
            let existingChat = await chatExists()
            existingChat ? displayExistingChat() : createChat()
        }
    }

    return (
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems="center">
            <Paper className={classes.paper}>
                <Typography component='h1' variant='h5'>Send a Message</Typography>
                <form className={classes.form} onSubmit={handleSubmitNewChat}>
                    <Autocomplete className={classes.input} multiple options={[]} defaultValue={""} autoFocus freeSolo
                        style={{marginTop: '0.5rem'}}
                        onChange={handleChatUsers}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="filled" label="Enter User(s)" placeholder="Enter One or More Users" />
                        )}
                    />
                    <FormControl fullWidth>
                    <InputLabel htmlFor='new-chat-message'>
                            Enter Your Message
                        </InputLabel>
                        <Input id='new-chat-message' required className={classes.input} {...newChatMessage} />
                    </FormControl>
                    <Button fullWidth className={classes.submit} variant='contained' type='submit'>SUBMIT</Button>
                </form>

            </Paper>
        </Grid>
    )
}

export default NewChatForm
