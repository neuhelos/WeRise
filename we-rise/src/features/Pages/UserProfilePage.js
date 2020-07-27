// import React from "react";
// import {apiURL} from '../../Utilities/apiURL';
// import {getFirebaseIdToken} from '../../Utilities/firebaseFunctions';
// import {AuthSlice} from '../Authentication/AuthenticationSlice';
// import UserWorkshopAgenda from '../UserWorkshopsAgenda/UserWorkshopsAgenda'
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

// const API = apiURL()
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {},
// }));


// const UserProfilePage = (user) => async(dispatch)=>{
// try{
//   if(user){
//     const {email, uuid}=user;
//     dispatch(receiveUser({email, id: uuid}));
//     const token = await getFirebaseIdToken()
//     dispatch(AuthSlice(token))
//   }else{
//     dispatch(receiveUser(null))
//   }
  
// }catch(error){
//  console.log(error);
 
// }
  

//   return (
//     <Grid container className={classes.root}>
//       User Profile
      
//       {displayCurrUser}
//       <UserWorkshopAgenda/>
//     </Grid>
//   );
// };

// export default UserProfilePage;
