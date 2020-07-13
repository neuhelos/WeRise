import { createSlice } from '@reduxjs/toolkit'

export const authenticationSlice = createSlice({
    name: "currentUserSession",
    initialState: null,
    reducers: {
        setCurrentUser: (state, action) => {
            return action.payload
        }
    },
})

export const selectCurrentUserId = state => state.currentUserSession.uid
export const { setCurrentUser } = authenticationSlice.actions
export default authenticationSlice.reducer