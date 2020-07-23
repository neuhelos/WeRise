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
            <FilterBar dateRange={dateRange} handleDateChange={handleDateChange} selectCategories={selectCategories} handleSelectChange={handleSelectChange}/>
        </form>
    )
}

export default WorkshopFeedSearchForm;