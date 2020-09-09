import React from 'react'
import {Link} from 'react-router-dom'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography'
import GitHubIcon from '@material-ui/icons/GitHub'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( (theme) => ({
    root: {
        backgroundColor: '#F5F5F5',
        color: '#FF0F7B',
        minHeight: '5rem',
        display: 'flex',
        alignItems: 'center',
        '& *': {
            fontFamily: 'audiowide'
        }
    },
    content: {
        margin: theme.spacing(1)
    }
}))

const Footer = () => {

    const classes = useStyles()

    return (
        <BottomNavigation className={classes.root}>
            <a href={`https://github.com/neuhelos/WeRise`} className={classes.content} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
			</a>
            <Typography className={classes.content} align='center'>© 2020 WeRise</Typography>
        </BottomNavigation>
    )
}

export default Footer;
