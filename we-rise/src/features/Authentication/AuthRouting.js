import React from 'react'
import { useSelector } from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

export const PublicRoute = ({children, ...rest}) => { 
    //const currentUser = useSelector( state => state.currentUserSession )
    const currentUser = 0

    return (
        <Route {...rest} render={ () => !currentUser ? children : <Redirect to="/CommunityDashboard"/>} />
    )
}

export const ProtectedRoute = ({children, ...rest}) => { 
    //const currentUser = useSelector( state => state.currentUserSession )
    const currentUser = 0

    return (
        <Route {...rest} render={ () => currentUser ? children : <Redirect to="/"/>} />
    )
}