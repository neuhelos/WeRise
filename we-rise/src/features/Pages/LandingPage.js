import React from 'react'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import PublicNavBar from '../BaseComponents/PublicNavBar'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }

}))

const LandingPage = () => {
    
    const classes = useStyles()
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <PublicNavBar />
            </Grid>
        </Grid>
    )
}

export default LandingPage;
