import React from 'react'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( (theme) => ({
    root: {
        backgroundColor: '#F5F5F5',
        //background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
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
