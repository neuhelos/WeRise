import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../../Utilities/apiURL';
import FacilitatorWorkshopCard from './FacilitatorWorkshopCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
        root: {
            fontFamily: 'audiowide',
            width: '100%'
        },
}))


const FacilitatorWorkshops =  () => {
    
    const classes = useStyles();
    
    const [UserPastCreatedWorkshops, setUPCWorkshops] = useState([]); 
    const params = useParams();
    let user_id = params.id;
    

    const getCurrentUserPastWorkshops = async() => {
        try{
            let pastWorkshopsRes = await axios.get(`${apiURL()}/workshops/pastworkshops/${user_id}`)
            setUPCWorkshops(pastWorkshopsRes.data.payload); 
        }
        catch(err){
            console.log(err)
            throw Error(err)
        }
    }
    useEffect(() => {
        getCurrentUserPastWorkshops();
    },[user_id])
    

    let pastWorkshops = UserPastCreatedWorkshops.map(workshop => {
        return <FacilitatorWorkshopCard key={workshop.workshop_id} id={workshop.workshop_id} workshop={workshop}/>
    })
    
    return (

        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
            {pastWorkshops}
        </Grid> 
    )
    

}

export default FacilitatorWorkshops;