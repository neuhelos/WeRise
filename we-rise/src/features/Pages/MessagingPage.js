import React from 'react'

import Chat from '../Messaging/Chat'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
    }
}))

const MessagingPage = ( ) => {

    const classes = useStyles()

    return (
        <Grid className={classes.root} container display="flex" direction="row">
            <Chat />
        </Grid>
    )
}

export default MessagingPage;
