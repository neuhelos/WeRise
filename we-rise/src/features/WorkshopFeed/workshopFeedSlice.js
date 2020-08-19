import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiURL } from '../../Utilities/apiURL'
import { addRegistration, deleteRegistration } from '../UserWorkshopsAgenda/RegisterWorkshopSlice'

export const fetchUpcomingWorkshops = createAsyncThunk(
    'get/fetchUpcomingWorkshops',
    async ( payload , { getState }) => {
        try {
            const { uid } = getState().currentUserSession
            const res = await axios.get(`${apiURL()}/workshops?id=${uid}`)
            return res.data.payload
        } catch (error) {
            throw Error(error)
        }
    }
)

export const fetchWorkshopSearch = createAsyncThunk(
    'post/fetchWorkshopSearch',
    async (search, {getState}) => {
        try {
            const { uid } = getState().currentUserSession
            search['id'] = uid
            const res = await axios.post(`${apiURL()}/workshops/search`,
                search
            )
            console.log(search)
            return res.data.payload
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
        [addRegistration.fulfilled] : (state, action) => {
            state.filter(workshop => workshop.workshop_id !== action.payload.data.workshop_id)
            debugger
        }, 
        [deleteRegistration.fulfilled] : (state, action) => {
            state.unshift(action.payload);
        }
    }
})

export const selectWorkshopFeed = state => state.workshopFeed
export default workshopFeedSlice.reducer 