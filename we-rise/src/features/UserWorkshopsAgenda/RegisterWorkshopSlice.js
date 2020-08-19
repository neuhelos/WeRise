import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { apiURL } from '../../Utilities/apiURL'


export const deleteRegistration = createAsyncThunk(
    'delete/deleteRegistration',
    async(workshopId) => {
        try{
           let res = await axios.delete(`${apiURL()}/registered/${workshopId}`);
           res.data.payload.registeredId = workshopId;
            return res.data.payload;
        } catch (error) {
            throw Error(error)
        }
    }
)

export const addRegistration = createAsyncThunk(
    'post/addRegistration',// In registration, it should dispatch this action to add workshop
    async( workshop_id , { getState }) => {
        try{
            const { uid } = getState().currentUserSession
            let registration = axios.post(`${apiURL()}/registered`, {
                user_id: uid,
                workshop_id: workshop_id
            })
        return registration.data.payload;
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
    name: "registeredWorkshop",
    initialState: [],
    reducers: {
    },
    extraReducers: {
        [fetchMyWorkshops.fulfilled]: (state, action) => action.payload,
        [deleteRegistration.fulfilled]: (state, action) => {
           let workshopIndex = state.findIndex((workshop)=> {
                return Number(workshop.id) === Number(action.payload.registeredId)
           })
           debugger
           if(workshopIndex > -1){
               state.splice(workshopIndex,1);
           }
        }
    }
})

export const selectRegisteredWorkshopFeed = state => state.workshopFeed
export default RegisteredWorkshopSlice.reducer 