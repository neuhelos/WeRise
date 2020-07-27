import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiURL } from '../../Utilities/apiURL'


export const fetchUpcomingWorkshops = createAsyncThunk(
    'post/fetchUpcomingWorkshops',
    async () => {
        try {
            const res = await axios.get(`${apiURL}/workshops`)
            return res.payload
        } catch (error) {
            throw Error(error)
        }
    }
)

export const fetchWorkshopSearch = createAsyncThunk(
    'post/fetchWorkshopSearch',
    async (search) => {
        try {
            const res = await axios.get(`${apiURL}/workshops/search`, {
                search
            })
            return res.payload
        } catch (error) {
            throw Error(error)
        }
    }
)


export const workshopFeedSlice = createSlice( {
    name: "workshopFeed",
    initialState: [],
    reducers: {
    },
    extraReducers: {
        [fetchUpcomingWorkshops.fulfilled]: (state, action) => action.payload,
        [fetchWorkshopSearch.fulfilled] : (state, action) => action.payload,
    }
})

export const selectWorkshopFeed = state => state.workshopFeed
export default workshopFeedSlice.reducer 