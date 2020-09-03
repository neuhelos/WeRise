import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import weRiseLoading from '../../styling/Assets/Media/Loading1.gif'
import weRiseLoading2 from '../../styling/Assets/Media/Loading2.gif'
import weRiseLoading3 from '../../styling/Assets/Media/Loading3.gif'
import weRiseLoading4 from '../../styling/Assets/Media/Loading4.gif'


const useStyles = makeStyles( (theme ) => ({
        image: {
            maxWidth: '100%',
            maxHeight: '100%',
        }
    })
)

const Loading = () => {

    const classes = useStyles()

    const weRiseLoadingPage = [weRiseLoading, weRiseLoading2,weRiseLoading3,weRiseLoading4 ];
    let random = Math.floor(Math.random()* 4);
    
    return (
        <>
            <img className={classes.image} src={weRiseLoadingPage[random]} alt='LOADING' />
        </>
    )
}

    export default Loading

