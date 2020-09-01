import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles( (theme) => ({
    root: {
        width: '100%',
    },
    font: {
        fontFamily: 'audiowide',
        fontSize: '1rem',
        color: 'white'
    }
}))

const WorkshopSearchBar = ({searchQuery}) => {

    const classes = useStyles()

    return (
        <FormControl className={classes.root}>
            <InputLabel htmlFor="input-with-icon-adornment" className={classes.font}>Search Workshops</InputLabel>
            <Input
            className={classes.font}
            type="search"
            id="input-with-icon-adornment"
            variant = "filled"
            placeholder="Search By Title, Description or Skills"
            startAdornment={
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            }
            {...searchQuery}
            />
        </FormControl>
    )
}

export default WorkshopSearchBar;
