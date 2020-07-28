import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APIURL } from '../../Utilities/apiURL'

const UserWorkshopsAgenda = () => {
    const [workshops, setWorkshops] = useState([]);
    const currentUser = useSelector( state => state.currentUserSession.uid )
    const myworkshops = async() => {
        try{
            let res = await axios.get(`${APIURL}/registered/${2}`)
            setWorkshops(res.data.payload)
            debugger
      } catch (err){
          console.log(err)
     }
    }

    useEffect(() => {

        myworkshops();
        
    }, []);
    

    return (
        <div>
            <h3>User Workshop Agenda</h3>

                {workshops.map(workshop => {
                    return <li>{workshop.title} {workshop.date} {workshop.starttime} - {workshop.endtime} </li>
                })}
            {/* <ul>
                <li>Math Work Shop</li>
                <li>StemLab Work Shop</li>
                <li>Photoshop Work Shop</li>
                <li>How to make veggie Pizza Work Shop</li>
            </ul> */}
        </div>
    )
}

export default UserWorkshopsAgenda;
