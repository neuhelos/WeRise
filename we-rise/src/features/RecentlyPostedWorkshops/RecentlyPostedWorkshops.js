import React, { useState, useEffect } from 'react'
import { apiURL } from '../../Utilities/apiURL'
import axios from 'axios'

const RecentlyPostedWorkshops = () => {
    const [recentPost, setrecentPost] = useState([]);

    const recentlyPosted = async() => {
        try{
            let res = await axios.get(`${apiURL()}/recentPosted/`)
            setrecentPost(res.data.payload)
            debugger
      } catch (err){
          console.log(err)
     }
    }

    useEffect(() => {

        recentlyPosted();
        
    }, []);

    return (
        <div>
            <ul>
            {recentPost.map(post => {
                  return <li id={post}>{post.title} {post.date} {post.starttime} - {post.endtime} </li>
               })}
            </ul>
        </div>
    )
}

export default RecentlyPostedWorkshops;
