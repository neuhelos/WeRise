import React from 'react'

import Chat from '../Messaging/Chat'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    paper: {
    }
}))

const MessagingPage = ( ) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Chat />
        </div>
    )
}

export default MessagingPage;
