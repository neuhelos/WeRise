import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase, { firestore } from '../../Utilities/firebase'

onst fetchChats = async () => {
    await firestore
    .collection('chats')
    .where('users', 'array-contains', currentUser)
    .onSnapshot( async (res) => {
        const chats = res.docs.map(doc => doc.data())
        await setChats(chats)
    })
}


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

export const ChatsSlice = createSlice( {
    name: "chats",
    initialState: [],
    reducers: {
    },
    extraReducers: {
        
    }
})

export const selectUserChats = state => state.chats
export default ChatsSlice.reducer 