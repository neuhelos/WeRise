import axios from 'axios'
import {apiURL} from './apiURL'

export const fetchUserById = async(id) => {
    const API = apiURL()
    try {
      let res = await axios.get(API + `/users/${id}`);
      // debugger
      console.log(res.data.payload);
      return res.data.payload
    } catch (error) {
      console.log(error)
    }
  }

//   export const updateUser = async ( userId, data ) => {
//     const API = apiURL()
//     try {
//         let res = await axios.patch(API + `/users/${id}` + data);
//         return res.data.user;
//     } catch (error) {
//         console.log(error);
//     }
// }