import React from 'react'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( (theme) => ({
    root: {
        backgroundColor: '#F5F5F5',
        color: 'white',
    }
}))

const Footer = () => {

    const classes = useStyles()

    return (
        <BottomNavigation className={classes.root}>
        
        
        </BottomNavigation>
    )
}

export default Footer;
