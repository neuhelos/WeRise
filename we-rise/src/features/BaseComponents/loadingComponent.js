import React from 'react'
import weRiseLoading from '../../styling/Assets/Media/LoadingW.gif'
import weRiseLoading2 from '../../styling/Assets/Media/LoadingE.gif'
import weRiseLoading3 from '../../styling/Assets/Media/LoadingR.gif'
import weRiseLoading4 from '../../styling/Assets/Media/LoadingIse.gif'
import weRiseLoading5 from '../../styling/Assets/Media/Progressloading.gif'
import { useSelector } from 'react-redux'
import  '../../styling/loading.css'


const LoadingComponents = ({children}) => {

    const loading = useSelector( state => state.loading );
    const weRiseLoadingPage = [weRiseLoading, weRiseLoading2,weRiseLoading3,weRiseLoading4, weRiseLoading5 ];
    let random = Math.floor(Math.random()*4);


    return(
        loading ?
        <div className = 'loading'>
            <img src ={weRiseLoadingPage[random]} alt="Loading"/>
        </div>
        :
        children
    )

}

export default LoadingComponents;