import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//import { firestore } from '../../Utilities/firebase'

// export const fetchChats = createAsyncThunk(
//     'get/fetchChats',
//     async ( payload , { getState }) => {
//         try {
//             const { uid } = getState().currentUserSession
//             let chats
//             await firestore
//                 .collection('chats')
//                 .where('users', 'array-contains', uid)
//                 .onSnapshot( (res) => {
//                     chats = return res.docs.map(doc => {doc.data()})
//                 })
//             debugger
//             return chats
//         } catch (error) {
//             throw Error(error)
//         }
//     }
// )

export const chatsSlice = createSlice( {
    name: "chats",
    initialState: [],
    reducers: {
        chatsStore: (state, action ) => action.payload
    },
    extraReducers: {
        //[fetchChats.fulfilled]: (state, action) => action.payload
    }
})

export const selectUserChats = state => state.chats
export const { chatsStore } = chatsSlice.actions
export default chatsSlice.reducer 