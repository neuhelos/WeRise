import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";



const FacilitatorWorkshops = (user_id) => {
    const currentUser = useSelector( state => state.currentUserSession.uid );
    if(!user_id){
        user_id = currentUser
    }
    const UserCreatedWorkshops = useSelector( state => state.workshopFeed);

   
    return(
        <h1>Hey Now</h1>
    )

}

export default FacilitatorWorkshops;
