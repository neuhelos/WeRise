import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//import firebase from './Utilities/firebase'
import { setCurrentUser } from './features/Authentication/AuthenticationSlice'
//import { getFirebaseIdToken } from './Utilities/firebaseFunctions'

import AuthNavBar from './features/BaseComponents/AuthNavBar'
import LandingPage from './features/Pages/LandingPage'
import CommunityDashboardPage from './features/Pages/CommunityDashboard'
import UserProfilePage from './features/Pages/UserProfilePage'
import InstantMessagingPage from './features/Pages/MessagingPage'
import { PublicRoute, ProtectedRoute } from './features/Authentication/AuthRouting'

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './styling/ThemeProvider'


const WeRiseApp = () => {

  const currentUser = useSelector( state => state.currentUserSession )

  const dispatch = useDispatch()

  // const userSession = user => {
  //   if(user) {
  //       const {email, uid} = user
  //       getFirebaseIdToken().then(token => {
  //           dispatch(setCurrentUser({email, uid, token}))
  //       })
  //   } else {
  //       dispatch(setCurrentUser(null))
  //   }
  // };

  // useEffect( () => {
  //     const authStateObserver = firebase.auth().onAuthStateChanged(userSession)
  //     return authStateObserver
  // }, []);

  return (

    <ThemeProvider theme={theme}>
        <CssBaseline />
        { currentUser ? <AuthNavBar /> : null }
        <Switch>
          <PublicRoute exact path="/">
            <LandingPage />
          </PublicRoute>
          <ProtectedRoute path="/CommunityDashboard">
            <CommunityDashboardPage />
          </ProtectedRoute>
          <ProtectedRoute path="/Profile">
            <UserProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/Messaging">
            <InstantMessagingPage />
          </ProtectedRoute>
        </Switch>
    </ThemeProvider>
  )
}

export default WeRiseApp;
