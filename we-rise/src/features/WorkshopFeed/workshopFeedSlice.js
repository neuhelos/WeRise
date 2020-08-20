import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiURL } from '../../Utilities/apiURL'
import { deleteRegistration } from '../UserWorkshopsAgenda/RegisterWorkshopSlice'
import { addRegistration } from '../UserWorkshopsAgenda/RegisterWorkshopSlice'

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
        [deleteRegistration.fulfilled] : (state, action) => {state.unshift(action.payload);},
        [addRegistration.fulfilled]: (state, action) => {
            let workshopIndex = state.findIndex((workshop)=> {
                return Number(workshop.workshop_id) === Number(action.payload.workshop_id)
           })
           if(workshopIndex > -1){
               state.splice(workshopIndex,1);
           }
        }
    }
})

export const selectWorkshopFeed = state => state.workshopFeed
export default workshopFeedSlice.reducer 