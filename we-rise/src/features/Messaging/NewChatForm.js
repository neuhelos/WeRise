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
            margin: 'auto',
            "& *": {
			fontFamily: "audiowide",
		},
        },
        paperContainer: {
            padding: theme.spacing(1),
            width: '100%',
            backgroundColor: '#A3A3A3'
        },
        paper: {
            padding: theme.spacing(2),
            width: '100%',
            backgroundColor: '#F5F5F5',
            '& * + *': {
                marginBottom: theme.spacing(1)
            },
        },
        input: {
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
            '& * + *': {
                marginBottom: theme.spacing(1)
            }
        },
        submit: {
            background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
            color: '#FFFFFF',
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
        if(users.length <=8) setUsers(values)
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
        return chat.exists
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
            <Paper className={classes.paperContainer}>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>Send a Message</Typography>
                    <form className={classes.form} onSubmit={handleSubmitNewChat}>
                        <Autocomplete className={classes.input} multiple options={[]} defaultValue={""} autoFocus freeSolo size="small"
                            style={{marginTop: '0.5rem'}}
                            onChange={handleChatUsers}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} variant="filled" label="Enter User(s)" placeholder="Enter One or Up to Eight Users" />
                            )}
                        />
                        <TextField fullWidth inputProps={{style: {textAlign: 'left'}}} id="newChatMessage" label="Message" placeholder="Enter Your Message" variant="filled" multiline rows={2} {...newChatMessage} required/>

                        <Button fullWidth className={classes.submit} variant='contained' type='submit'>SUBMIT</Button>
                    </form>
                
                
                </Paper>

            </Paper>
        </Grid>
    )
}

export default NewChatForm
