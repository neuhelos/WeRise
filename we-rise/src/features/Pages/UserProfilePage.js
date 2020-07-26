import React from "react";
import {createSlice} from '@reduxjs/toolkit';
import {apiURL} from '../../Utilities/apiURL';
import {getFirebaseIdToken} from '../../Utilities/firebaseFunctions';
import {AuthSlice} from '../Authentication/AuthenticationSlice';
import UserWorkshopAgenda from '../UserWorkshopsAgenda/UserWorkshopsAgenda'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const API = apiURL()
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
}));

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    receiveUser: {
      reducer: (state, action)=> action.payload
    }, 
    logout: {
      reducer: (state) =>null
    }
  }
})
const UserProfilePage = (user) => async(dispatch)=>{
try{
  if(user){
    const {email, uuid}=user;
    dispatch(receiveUser({email, id: uuid}));
    const token = await getFirebaseIdToken()
    dispatch(AuthSlice(token))
  }else{
    dispatch(receiveUser(null))
  }
  
}catch(error){
 console.log(error);
 
}
  

  return (
    <Grid container className={classes.root}>
      User Profile
      
      {displayCurrUser}
      <UserWorkshopAgenda/>
    </Grid>
  );
};
export const {receiveUser} =userSlice.actions
export default UserProfilePage.reducer;
