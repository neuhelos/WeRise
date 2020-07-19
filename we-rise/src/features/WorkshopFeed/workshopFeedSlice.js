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


export const workshopFeedSlice = createSlice( {
    name: "workshopFeed",
    initialState: [],
    reducers: {
        categoryFilter: (state, action) => {
            return state.filter( workshop => workshop.category === action.payload)
        },
        dateFilter: (state, action) => {
            return state.filter( workshop => workshop.date >= action.payload.startDate && workshop.date <= action.payload.endDate )
        }
    },
    extraReducers: {
        [fetchUpcomingWorkshops.fulfilled]: (state, action) => action.payload,
        [fetchWorkshopSearch.fulfilled] : (state, action) => action.payload,
    }
})

export const selectWorkshopFeed = state => state.workshopFeed
export default workshopFeedSlice.reducer 