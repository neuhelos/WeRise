import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { binarySearchInsert } from '../../Utilities/binarySearchInsertion'

import { apiURL } from '../../Utilities/apiURL'


export const deleteRegistration = createAsyncThunk(
    'delete/deleteRegistration',
    async(workshop_id) => {
        try{
            let res = await axios.delete(`${apiURL()}/registered/${workshop_id}`);
            res.data.payload.registeredId = workshop_id;
            return res.data.payload;
        } catch (error) {
            throw Error(error)
        }
    }
)

export const addRegistration = createAsyncThunk(
    'post/addRegistration',
    async( workshopId , { getState }) => {
        try{
            const { uid } = getState().currentUserSession
            const registration = await axios.post(`${apiURL()}/registered`, {
                user_id: uid,
                workshop_id: workshopId,
                workshop_id_user_id: `${workshopId}${uid}`
            })

            // const workshops = getState().workshopFeed;
            // let num = workshopId
            // let workshopinfo = workshops.findIndex((workshop)=> {
            //     return workshop.workshop_id === num
            // })
            // debugger  
            // workshopinfo.id = registration.data.payload
            
        return registration.data.payload

        } catch (error) {
            throw Error(error)
        }
    }
)


export const fetchMyWorkshops = createAsyncThunk(
    // const currentUser = useSelector( state => state.currentUserSession.uid )
    'get/fetchMyWorkshops',
    async ( payload , { getState }) => {
        try {
            const { uid } = getState().currentUserSession
            const res = await axios.get(`${apiURL()}/registered/${uid}`)
            return res.data.payload
        } catch (error) {
            throw Error(error)
        }
    }
)


export const RegisteredWorkshopSlice = createSlice( {
    name: "registeredWorkshops",
    initialState: { feed: [], loading: true },
    reducers: {
    },
    extraReducers: {
        [fetchMyWorkshops.pending]: (state, action) => {
            return {feed: [], loading: true}
        },
        [fetchMyWorkshops.fulfilled]: (state, action) => {
            return {feed: action.payload, loading: false}
        },
        [fetchMyWorkshops.rejected]: (state, action) => {
            return {feed: [], loading: false}
        },
        [addRegistration.fulfilled]: (state, action) =>  {
            let insertIndex = binarySearchInsert(state.feed, action.payload.start_time)
            state.feed.splice(insertIndex, 0, action.payload)
        },
        [deleteRegistration.fulfilled]: (state, action) => {
            let workshopIndex = state.feed.findIndex((workshop)=> {
                return Number(workshop.id) === Number(action.payload.registeredId)
            })
            if(workshopIndex > -1){
                state.feed.splice(workshopIndex,1);
            }
        },
    }
})

export const selectRegisteredWorkshopFeed = state => state.workshopFeed
export default RegisteredWorkshopSlice.reducer 