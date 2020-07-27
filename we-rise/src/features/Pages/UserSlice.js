import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {getFireBaseIdToken} from '../../Utilities/firebase';
import {setCurrentUser} from '../Authentication/AuthenticationSlice'
import { apiURL } from '../../Utilities/apiURL';

const API = apiURL()


// export const userSlice = createSlice({
//         name: "user",
//         initialState: null,
//         reducers: {
//             receivedUser: {
//                 reducer: (state, action) => action.payload
//             },
//             logout: {
//                 reducer: (state) => null
//             }
//         }
//     })
    
export const searchUsers = createAsyncThunk(
    'post/searchUsers',
    async(search) =>{
        try{
            const response = await axios.get(`${API}/users/search`,{
                search
            })
            return response.payload
        }catch(error){
            throw Error(error)
        }
    }
)
export const userWorkshops = createSlice({
    name: 'userWorkshops',
    initialState: [],
    reducers: {}
})
export const editUser = (user) => async(dispatch)=>{
    try {
        if(user){
            const {email, uid} =user;
            const token = await getFireBaseIdToken()
            dispatch(setCurrentUser({token}))
           
        }
    } catch (error) {
        console.log(error)
    }
}
export const logout = ()=>(dispatch)=>{
    dispatch(logout())
}
export const {
    // receivedUser,
    logout} = userSlice.actions;
export default userSlice.reducer;