import { createSlice } from '@reduxjs/toolkit';


export const loadingSlice = createSlice({
    name: "loading",
    initialState: true, 
    reducers: {
        toggleLoading: (state) => !state,
        finishLoading: (state) => false
    },
    extraReducers: {
    }
})


export const selectLoading = state => state.loading; 

export const { toggleLoading, finishLoading } = loadingSlice.actions; 
export default loadingSlice.reducer;