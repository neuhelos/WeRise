import React from 'react'
import weRiseLoading from '../../styling/Assets/Media/Loading1.gif'
import weRiseLoading2 from '../../styling/Assets/Media/Loading2.gif'
import weRiseLoading3 from '../../styling/Assets/Media/Loading3.gif'
import weRiseLoading4 from '../../styling/Assets/Media/Loading4.gif'
import weRiseLoading5 from '../../styling/Assets/Media/Progressloading.gif'
import { useSelector } from 'react-redux'
import  '../../styling/loading.css'


const LoadingComponents = ({children}) => {

    const loading = useSelector( state => state.loading );
    const weRiseLoadingPage = [weRiseLoading, weRiseLoading2,weRiseLoading3,weRiseLoading4, weRiseLoading5 ];
    let random = Math.floor(Math.random()*4);
    if(loading){
    return(
        <div className = 'loading'>
            <img src = {weRiseLoadingPage[random]}/>
            {/* <h1>loading... {random}</h1> */}
        </div>
    )
    }
    return (
        <>
            {children}
        </>
    )
}

export default LoadingComponents;