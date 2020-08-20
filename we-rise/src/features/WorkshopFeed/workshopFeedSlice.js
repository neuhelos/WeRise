import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { binarySearchInsert } from '../../Utilities/binarySearchInsertion'
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
            
            return state.filter(workshop => workshop.workshop_id !== action.payload.workshop_id)
        }, 
        [deleteRegistration.fulfilled] : (state, action) => {
            
            let insertIndex = binarySearchInsert(state, new Date(action.payload.start_time))
            state.splice(insertIndex, 0, action.payload)
        }
    }
})

export const selectWorkshopFeed = state => state.workshopFeed
export default workshopFeedSlice.reducer 