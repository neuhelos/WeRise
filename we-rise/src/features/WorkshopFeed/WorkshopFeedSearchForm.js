import React, {useState} from 'react'

import SearchBar from './WorkshopSearchBar'
import FilterBar from './WorkshopFilterBar'
import { useInput } from '../../Utilities/CustomHookery'


const WorkshopFeedSearchForm = () => {
    
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

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <SearchBar searchQuery={searchQuery} />
            <FilterBar dateRange={dateRange} handleDateChange={handleDateChange}/>
        </form>
    )
}

export default WorkshopFeedSearchForm;
