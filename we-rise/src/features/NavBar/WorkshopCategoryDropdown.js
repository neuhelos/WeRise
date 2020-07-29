import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { categories } from '../BaseComponents/WorkshopCategories'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(1)
  }
}));


const CategoryDropdown = ({category}) => {
    
    const classes = useStyles();

    const categoriesList = categories.map( category => {
      return <MenuItem key={category} value={category}>{category}</MenuItem>
    })

    return (

        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="select-filled-label">Workshop Category</InputLabel>
        <Select labelId="select-filled-label" id="select-filled" {...category} >
            <MenuItem value=""><em>Select a Category</em></MenuItem>
            {categoriesList}
        </Select>
        </FormControl>
    )
}

export default CategoryDropdown