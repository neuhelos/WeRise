import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

import SearchBar from './WorkshopSearchBar'
import FilterBar from './WorkshopFilterBar'
import { useInput } from '../../Utilities/CustomHookery'

import { fetchWorkshopSearch, fetchUpcomingWorkshops } from './WorkshopFeedSlice'
import { categories } from '../BaseComponents/WorkshopCategories'

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
        width: '100%'
    },
    buttonReset: {
        fontFamily: 'audiowide',
        height: '3rem',
        margin: theme.spacing(1),
        backgroundColor: '#FF0F7B'
    },
    buttonSubmit: {
        fontFamily: 'audiowide',
        height: '3rem',
        margin: theme.spacing(1),
        backgroundColor: '#F89B29',
        color: '#FFFFFF'
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

    const [buttonLabelChange, setButtonLabelChange] = useState(false)
    const handleDateChange = (item) => {
        setDateRange([item.selection])
        setButtonLabelChange(true)
        console.log(dateRange)
    }
    
    const [selectCategories, setSelectCategories] = useState([]);
    const handleSelectChange = (event) => {
        setSelectCategories(event.target.value);
    };

    const pad = (value) => value.toString().length === 1 ? `0${value}` : value
    const startDateFormatter = (selectDate) => {
        
        let currentTime = new Date()
        
        let year = selectDate.getFullYear()
        let month = selectDate.getMonth() + 1
        month = pad(month)
        let date = selectDate.getDate()
        date = pad(date)
        let hours = currentTime.getHours()
        hours = pad(hours)
        let minutes = currentTime.getMinutes()
        minutes = pad(minutes)
        let timezone = (currentTime.getTimezoneOffset())/60
        timezone = pad(timezone)
        return `${year}-${month}-${date} ${hours}:${minutes}-${timezone}`;
    }

    const endDateFormatter = (selectDate) => {
        if(selectDate){
            let currentTime = new Date()
            let year = selectDate.getFullYear()
            let month = selectDate.getMonth() + 1
            month = pad(month)
            let date = selectDate.getDate()
            date = pad(date)
            let timezone = (currentTime.getTimezoneOffset())/60
            timezone = pad(timezone)
            return `${year}-${month}-${date} 23:59-${timezone}`
        } else {
            return null
        }
    }
    
    const selectAllCategories = () => {
        setSelectCategories([...categories])
    }

    const clearSelectCategories = () => {
        setSelectCategories([])
    }
    
    const handleSearchReset = () => {
        searchQuery.clearinput()
        setDateRange([{
            startDate: new Date(),
            endDate: null,
            key: 'selection'
            }]
        )
        clearSelectCategories()
        setButtonLabelChange(false)
        dispatch(fetchUpcomingWorkshops())
    }

    let categories = selectCategories.length ? selectCategories.join(' OR ') : ""
    
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(fetchWorkshopSearch({
            search: searchQuery.value,
            categories: categories, 
            startDate: startDateFormatter(dateRange[0].startDate),
            endDate: endDateFormatter(dateRange[0].endDate)
        }))
    }
    

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <SearchBar searchQuery={searchQuery} />
            <Grid container display="flex" direction="row" justify="center" alignItems="center" wrap='nowrap'>
                <FilterBar dateRange={dateRange} handleDateChange={handleDateChange} selectCategories={selectCategories} handleSelectChange={handleSelectChange} buttonLabelChange={buttonLabelChange} selectAllCategories={selectAllCategories} clearSelectCategories={clearSelectCategories}/>
                <Button className={classes.buttonReset} variant="contained" color="primary" size='small' onClick={handleSearchReset}>RESET</Button>
                <Button className={classes.buttonSubmit} type="submit" variant="contained" color="primary" size='small'>SUBMIT</Button>
            </Grid>
        </form>
    )
}

export default WorkshopFeedSearchForm;