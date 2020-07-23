import React from 'react'

import SearchBar from './WorkshopSearchBar'
import FilterBar from './WorkshopFilterBar'
import { useInput } from '../../Utilities/CustomHookery'

const WorkshopFeedSearchForm = () => {
    
    const searchQuery = useInput("")
    
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    
    return (
        <form onSubmit="handleSubmit">

            <SearchBar searchQuery={searchQuery} />
            <Filter Bar />
        </form>
    )
}

export default WorkshopFeedSearchForm;
