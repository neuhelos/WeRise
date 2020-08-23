import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from '../../Utilities/apiURL';
import FacilitatorWorkshopCard from './FacilitatorWorkshopCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import '../../styling/facilitatorCss.css'


const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
        width: '100%'
    },
}))

 

const FacilitatorWorkshops = () => {
    const classes = useStyles();
    const currentUser = useSelector( state => state.currentUserSession.uid );
    let user_id = currentUser;
    const [UserCreatedWorkshops, setUCWorkshops] = useState([]);

    const getWorkshops = async() => {
        try{
           let res = await axios.get(`${apiURL()}/workshops/${user_id}`)
            setUCWorkshops(res.data.payload); 
        }
        catch(err){
            console.log(err)
            throw Error(err)
        }
    }
    useEffect(() => {
        getWorkshops();
    },[])
    
// debugger 
    let workshops = UserCreatedWorkshops.map(workshop => {
        return <FacilitatorWorkshopCard key={workshop.workshop_id} id={workshop.workshop_id} workshop={workshop}/>
    })
    
    return (
        <div className ='FacilitatorWorkshops'>
        <h1>Workshops I'm Facilitating</h1>
            <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
                {workshops}
            </Grid> 
        </div>
    )
    

}

export default FacilitatorWorkshops;
