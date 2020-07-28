import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { apiURL } from '../../Utilities/apiURL'


export const RegisteredWorkshop = createAsyncThunk(
    // const currentUser = useSelector( state => state.currentUserSession.uid )
    'post/fetchMyWorkshops',
    async () => {
        try {
            console.log(`${apiURL()}/workshops`)
            const res = await axios.get(`${apiURL()}/registered/${currentUser}`)
            return res.payload
        } catch (error) {
            throw Error(error)
        }
    }
)


export const RegisteredWorkshopSlice = createSlice( {
    name: "RegisteredWorkshop",
    initialState: [],
    reducers: {
    },
    extraReducers: {
        [RegisteredWorkshop.fulfilled]: (state, action) => action.payload
    }
})

export const selectRegisteredWorkshopFeed = state => state.workshopFeed
export default RegisteredWorkshop.reducer 