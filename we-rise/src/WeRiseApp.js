import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import firebase from './Utilities/firebase'
import { setCurrentUser } from './features/Authentication/authenticationSlice'
import { getFirebaseIdToken } from './Utilities/firebaseFunctions'

import NavBar from './features/BaseComponents/NavBar'
import { PublicRoute, ProtectedRoute } from './features/Authentication/AuthRouting'

import { ThemeProvider } from '@material-ui/core/styles';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { theme } from './styling/ThemeProvider'


const WeRiseApp = () => {

  const currentUser = useSelector( state => state.currentUserSession )

  const dispatch = useDispatch()

  const userSession = user => {
    if(user) {
        const {email, uid} = user
        getFirebaseIdToken().then(token => {
            dispatch(setCurrentUser({email, uid, token}))
        })
    } else {
        dispatch(setCurrentUser(null))
    }
  };

  useEffect( () => {
      const authStateObserver = firebase.auth().onAuthStateChanged(userSession)
      return authStateObserver
  }, []);

  return (

    <ThemeProvider theme={theme}>
        <CSSBaseline />
        { currentUser ? <NavBar /> : null }
        <Switch>
          <PublicRoute exact path="/">
          </PublicRoute>
          <ProtectedRoute path="/CommunityDashboard">
          </ProtectedRoute>
          <ProtectedRoute path="/Profile">
          </ProtectedRoute>
          <ProtectedRoute path="/Messaging">
          </ProtectedRoute>
        </Switch>
    </ThemeProvider>
  )
}

export default WeRiseApp;
