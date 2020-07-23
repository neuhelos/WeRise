import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useSelect } from '../../Utilities/CustomHookery'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CategoryDropdown = ({category}) => {
    
    const classes = useStyles();

    return (

        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="select-filled-label">Category</InputLabel>
        <Select
            labelId="select-filled-label"
            id="select-filled"
            {...category}
        >
            <MenuItem value="">
            <em>Select Category</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
    )
}

export default CategoryDropdown