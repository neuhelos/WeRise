import axios from 'axios'
import {apiURL} from './apiURL'

export const fetchUserById = async(id) => {
    const API = apiURL()
    try {
      let res = await axios.get(API + `/users/${id}`);
      console.log(res.data.payload);
      return res.data.payload
    } catch (error) {
      console.log(error)
    }
  }

  