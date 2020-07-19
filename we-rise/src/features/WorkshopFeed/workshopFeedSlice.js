import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//import { APIURL } from '../../utilitron/APIURL'

const apiURL = APIURL()

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
                search: search
            })
            return res.payload
        } catch (error) {
            throw Error(error)
        }
    }
)

export const fetchWorkshopByCategory = createAsyncThunk(
    'post/fetchWorkshopByCategory',
    async (category) => {
        try {
            const res = await axios.get(`${apiURL}/workshops/category`, {
                category: category
            })
            return res.payload
        } catch (error) {
            throw Error(error)
        }
    }
)

export const fetchWorkshopByDate = createAsyncThunk(
    'post/fetchWorkshopByDate',
    async (date) => {
        try {
            const res = await axios.get(`${apiURL}/workshops/date`, {
                startDate: date.start,
                endDate: date.end
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
        [fetchWorkshopByCategory.fulfilled] : (state, action) => action.payload,
        [fetchWorkshopByDate.fulfilled] : (state, action) => action.payload
    }
})

export const selectWorkshopFeed = state => state.workshopFeed
export default workshopFeedSlice.reducer 