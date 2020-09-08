import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from '../../Utilities/apiURL';
import FacilitatorWorkshopCard from './FacilitatorWorkshopCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import '../../styling/facilitatorCss.css'


const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
        width: '100%'
    },
    paper: {
        width: '90%',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        backgroundColor: '#282828',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        
    },
    paperWrapper: {
        width: '90%',
        padding: theme.spacing(1),
        margin: theme.spacing(5),
        backgroundColor: '#282828',
        justifyContent: 'center',
        alignContent: 'center',
    },
    paperTitle: {
        width: '100%',
        backgroundColor: '#666666',
        color: '#FFFFFF',
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        fontSize:'40px',
    },
    text:{
        justifyContent: 'center',
        alignContent: 'center',
    }
}))

 

const FacilitatorWorkshops = () => {
    const classes = useStyles();
    const currentUser = useSelector( state => state.currentUserSession.uid );
    const [UserCreatedWorkshops, setUCWorkshops] = useState([]);
    const [UserPastCreatedWorkshops, setUPCWorkshops] = useState([]); 
    const params = useParams();
    let user_id = params.id;


    const getWorkshops = async() => {
        try{
           let currentWorkshopsRes = await axios.get(`${apiURL()}/workshops/${user_id}`)
           let pastWorkshopsRes = await axios.get(`${apiURL()}/workshops/pastworkshops/${user_id}`)
            setUCWorkshops(currentWorkshopsRes.data.payload); 
            setUPCWorkshops(pastWorkshopsRes.data.payload); 
        }
        catch(err){
            console.log(err)
            throw Error(err)
        }
    }
    useEffect(() => {
        getWorkshops();
    },[])
    
    let currentWorkshops = UserCreatedWorkshops.map(workshop => {
        // debugger
        return <FacilitatorWorkshopCard key={workshop.workshop_id} id={workshop.workshop_id} workshop={workshop}/>
    })

    let pastWorkshops = UserPastCreatedWorkshops.map(workshop => {
        // debugger
        return <FacilitatorWorkshopCard key={workshop.workshop_id} id={workshop.workshop_id} workshop={workshop}/>
    })
    
    return (
        <>
        <div className ='FacilitatorWorkshops'>
            <Paper className={classes.paperWrapper}>
                <Paper className={classes.paperTitle}>
                    <Typography className={classes.text} variant='subtitle1'>Workshops I'm Facilitating</Typography>
                </Paper>
            </Paper>
            <div className ='workshops'>
                <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
                    {currentWorkshops}
                </Grid> 
            </div>
        </div>


        <div className ='FacilitatorWorkshops'>
            <Paper className={classes.paperWrapper}>
                <Paper className={classes.paperTitle}>
                    <Typography className={classes.text} variant='subtitle1'>Past Workshop I Facilitated</Typography>
                </Paper>
            </Paper>
            {/* <h1>Past Workshop I Facilitated</h1> */}
            <div className ='workshops'>
                <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
                    {pastWorkshops}
                </Grid> 
            </div>
        </div>
        </>
    )
    

}

export default FacilitatorWorkshops;
