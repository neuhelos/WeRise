import React, { useState } from 'react'
import { useHistory} from 'react-router-dom'
import { signIn } from '../../Utilities/firebaseFunctions'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import WeRiseLogo from '../../styling/Assets/Media/WeRise_Logo.png'

import { useInput } from '../../Utilities/CustomHookery'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            textAlign: 'center',
            outlineColor: '#36386D',
            border: 'none',
        },
    },
    input: {
        width: '100%',
        fontFamily: 'audiowide',
        marginBottom: theme.spacing(1)
    },
  }));

const SignInModal = () => {
    
    const classes = useStyles()

    const email = useInput("")
    const password = useInput("")
    
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signIn(email.value, password.value)
            history.push("/CommunityDashboard")

        }
        catch (err){
            console.log(err)
            alert(err.message)
        }
    }


    return (
        <form className={classes.root} onSubmit = {handleSubmit}>
            <Grid container display="flex" direction="column" justify="center" alignItems="center" maxWidth="sm">
                <img src={WeRiseLogo}></img>
                <TextField className={classes.input} id="email" label="Email" placeholder="Enter Your Email" variant="filled" {...email}/>
                <TextField className={classes.input} id="password" type="password" label="Password" placeholder="Enter Your Password" variant="filled" {...password}/>
                <Button variant="contained" color="primary" type="submit"> SIGN IN </Button>
            </Grid>
        </form>
    )
}

export default SignInModal;
