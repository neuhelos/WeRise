import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import { userExistsCheck, fetchUserData } from '../../Utilities/firestoreUserBase'
import { chatExistsCheck } from '../../Utilities/firestoreChatBase'

import { makeStyles } from '@material-ui/core/styles';
import { useInput } from '../../Utilities/CustomHookery'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FaceIcon from '@material-ui/icons/Face'
import { Button, Paper, Typography } from '@material-ui/core';



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
        },
        input: {
            marginBottom: theme.spacing(1)
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
            color: '#FFFFFF',
            '&:hover': {
                background: 'linear-gradient(270deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',

            }
        },
        errorText: {
            color: 'red',
            textAlign: 'center'
        }
    })
)

const NewChatForm = ( props ) => {
    
    const classes = useStyles()
    const currentUser = useSelector( state => state.currentUserSession )


    let newChatMessage = useInput("")
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")
    
    const handleChatUsers = (event, values) => {
        setUsers(values)
    }


    const createChat = async () => {
        let usersData = await Promise.all(users.map( user => fetchUserData(user)))        
        await props.newChatFormSubmit({
            userDetails: usersData,
            recipients: users,
            message: newChatMessage.value
        })
    }

    const displayExistingChat = (existingChatId) => {
        props.goToExistingChat(existingChatId, newChatMessage.value)
    }

    const handleSubmitNewChat = async ( event ) => {
        event.preventDefault()
        let usersEmail = [...users, currentUser.email].sort()
        if(users.length >= 1 && users.length <= 8){
                let existingUsers = await users.every(userExistsCheck)
                if(existingUsers){
                    let existingChat = await chatExistsCheck(usersEmail)
                    existingChat ? displayExistingChat(existingChat) : createChat()
                } else {
                    setError('A User Does Not Exist')
                }
        } else {
            setError('Max Users Exceeded')
        }
    }

    return (
        <Grid container className={classes.root} display="flex" direction="row" justify="center" alignItems="center">
            <Paper className={classes.paperContainer}>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>Send a Message</Typography>
                    <form className={classes.form} onSubmit={handleSubmitNewChat}>
                        <Autocomplete className={classes.input} multiple options={[]} defaultValue={""} freeSolo limitTags={2} autoSelect
                            style={{marginTop: '0.5rem'}}
                            onChange={handleChatUsers}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip icon={<FaceIcon />} color='secondary' label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} variant="filled" label="Enter User(s)" autoFocus placeholder="Enter Up to Eight Users and Press Enter"/>
                            )}
                        />
                        <TextField className={classes.input} fullWidth inputProps={{style: {textAlign: 'left'}}} id="newChatMessage" label="Message" placeholder="Enter Your Message" variant="filled" multiline rows={2} {...newChatMessage}/>

                        <Button fullWidth className={classes.submit} variant='contained' type='submit'>SUBMIT</Button>
                    </form>
                
                
                </Paper>

            </Paper>
        </Grid>
    )
}

export default NewChatForm
