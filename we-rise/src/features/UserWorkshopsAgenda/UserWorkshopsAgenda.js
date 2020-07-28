import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { apiURL } from '../../Utilities/apiURL'

import RegWorkCard from './regWorkCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
        width: '100%'
    },
}))


const UserWorkshopsAgenda = () => {
    const [workshops, setWorkshops] = useState([]);
    const currentUser = useSelector( state => state.currentUserSession.uid );
    const classes = useStyles();


    const myworkshops = async() => {
        try{

            let res = await axios.get(`${apiURL()}/registered/${currentUser}`)

            setWorkshops(res.data.payload)
            debugger
      } catch (err){
          console.log(err)
     }
    }

    useEffect(() => {

        myworkshops();
        
    }, []);

    let workshopsReq = workshops.map(workshop => {
        return <RegWorkCard key={workshop.id} id={workshop.id} workshop={workshop}/>
    })
    

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
            {workshopsReq}
        </Grid>
        // <div>
        //         {workshops.map(workshop => {
        //             return <li id={workshop}>{workshop.title} {workshop.date} {workshop.starttime} - {workshop.endtime} </li>
        //         })}
          
        // </div>
    )
}

export default UserWorkshopsAgenda;
