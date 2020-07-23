import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useSelect } from '../../Utilities/CustomHookery'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const categories = [
  {name: "", value: ""}
]

const CategoryDropdown = ({category}) => {
    
    const classes = useStyles();

    const categoriesList = categories.map( category => {
      return <MenuItem value={category.value}>{category.name}</MenuItem>
    })


    return (

        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="select-filled-label">Workshop Category</InputLabel>
        <Select labelId="select-filled-label" id="select-filled" {...category} >
            <MenuItem value=""><em>Select a Category</em></MenuItem>
            <MenuItem value={"Cooking&Baking"}>Cooking & Baking</MenuItem>
            <MenuItem value={"Coding&Programming"}>Coding & Programming</MenuItem>
            <MenuItem value={"Home Improvement"}>Home Improvement</MenuItem>
            {categoriesList}
        </Select>
        </FormControl>
    )
}

export default CategoryDropdown