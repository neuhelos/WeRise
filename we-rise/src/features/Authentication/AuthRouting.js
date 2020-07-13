import React from 'react'
import { useSelector } from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

export const PublicRoute = ({children, ...rest}) => { 
    const currentUser = useSelector( state => state.currentUserSession )

    return (
        <Route {...rest} render={ () => !currentUser ? children : <Redirect to="/"/>} />
    )
}

export const ProtectedRoute = ({children, ...rest}) => { 
    const currentUser = useSelector( state => state.currentUserSession )

    return (
        <Route {...rest} render={ () => currentUser ? children : <Redirect to="/"/>} />
    )
}