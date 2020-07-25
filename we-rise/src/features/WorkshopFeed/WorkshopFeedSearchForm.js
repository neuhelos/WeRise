import React, {useState} from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

import SearchBar from './WorkshopSearchBar'
import FilterBar from './WorkshopFilterBar'
import { useInput } from '../../Utilities/CustomHookery'


const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
    },
    button: {
        fontFamily: 'audiowide',
        height: '3rem'
    }
}))

const WorkshopFeedSearchForm = () => {
    
    const classes = useStyles();

    const searchQuery = useInput("")
    
    const [dateRange, setDateRange] = useState([
        {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
        }
    ]);

    const handleDateChange = (item) => {
        setDateRange([item.selection])
    }
    

    
    const [selectCategories, setSelectCategories] = useState([]);
    const handleSelectChange = (event) => {
        setSelectCategories(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault()
        // searchQuery
        // dateRange
        // selectCategories
        
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <SearchBar searchQuery={searchQuery} />
            <Grid container display="flex" direction="row" justify="center" alignItems="center" wrap='nowrap'>
                <FilterBar dateRange={dateRange} handleDateChange={handleDateChange} selectCategories={selectCategories} handleSelectChange={handleSelectChange}/>
                <Button className={classes.button} type="submit" variant="contained" color="primary">SUBMIT</Button>
            </Grid>
        </form>
    )
}

export default WorkshopFeedSearchForm;