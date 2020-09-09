import React from 'react'
import weRiseLoading from './loadingGif'
import { useSelector } from 'react-redux'
import  '../../styling/loading.css'


const LoadingComponents = ({children}) => {

    const loading = useSelector( state => state.loading );
    let random = Math.floor(Math.random()*13);


    return(
        loading ?
        <div className = 'loading'>
            <img src ={weRiseLoading[random]} alt="Loading"/>
        </div>
        :
        children
    )

}

export default LoadingComponents;