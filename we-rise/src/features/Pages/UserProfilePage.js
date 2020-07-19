import React from 'react'

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

const UserProfilePage = () => {

    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
            User Profile
        </Grid>
    )
}

export default UserProfilePage;
