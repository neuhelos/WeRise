import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

import SearchBar from './WorkshopSearchBar'
import FilterBar from './WorkshopFilterBar'
import { useInput } from '../../Utilities/CustomHookery'

import fetchWorkshopSearch from './workshopFeedSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
    },
    button: {
        fontFamily: 'audiowide',
        height: '3rem',
        margin: theme.spacing(1)
    }
}))

const WorkshopFeedSearchForm = () => {
    
    const dispatch = useDispatch()
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
        console.log(item)
        setDateRange([item.selection])
    }
    
    const [selectCategories, setSelectCategories] = useState([]);
    const handleSelectChange = (event) => {
        setSelectCategories(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(fetchWorkshopSearch({
            search: searchQuery.value,
            categories: selectCategories,
            dateRange: dateRange
        }))
        handleSearchClear()
    }

    const handleSearchClear = () => {
        searchQuery.clearinput()
        setDateRange([{
            startDate: new Date(),
            endDate: null,
            key: 'selection'
            }]
        )
        setSelectCategories([])
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <SearchBar searchQuery={searchQuery} />
            <Grid container display="flex" direction="row" justify="center" alignItems="center" wrap='nowrap'>
                <FilterBar dateRange={dateRange} handleDateChange={handleDateChange} selectCategories={selectCategories} handleSelectChange={handleSelectChange}/>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleSearchClear}>RESET</Button>
                <Button className={classes.button} type="submit" variant="contained" color="primary">SUBMIT</Button>
            </Grid>
        </form>
    )
}

export default WorkshopFeedSearchForm;