import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import firebase from './Utilities/firebase'

import { setCurrentUser } from './features/Authentication/AuthenticationSlice'
import { getFirebaseIdToken } from './Utilities/firebaseFunctions'
import { finishLoading } from './features/BaseComponents/loadingSlice'

import AuthNavBar from './features/NavBar/AuthNavBar'
import LandingPage from './features/Pages/LandingPage'
import CommunityDashboardPage from './features/Pages/CommunityDashboard'
import VideoConference from './features/Pages/videoConference'
import UserProfilePage from './features/Pages/UserProfilePage'
import InstantMessagingPage from './features/Pages/MessagingPage'
import Footer from './features/BaseComponents/Footer'
import { PublicRoute, ProtectedRoute } from './features/Authentication/AuthRouting'
import LoadingComponent from './features/BaseComponents/loadingComponent'

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './styling/ThemeProvider'


const WeRiseApp = () => {

  const currentUser = useSelector( state => state.currentUserSession )

  const dispatch = useDispatch()

  const userSession = user => {
    if(user) {
        const {email, uid} = user
        getFirebaseIdToken().then(token => {
            dispatch(setCurrentUser({email, uid, token}))
            dispatch(finishLoading());
            
            
        })
    } else {
        dispatch(setCurrentUser(null));
        dispatch(finishLoading());
    }
  };

  useEffect( () => {
      const authStateObserver = firebase.auth().onAuthStateChanged(userSession)
      return authStateObserver
  }, []);


  return (

    <ThemeProvider theme={theme}>
      <LoadingComponent>
        <CssBaseline />
        { currentUser ? <AuthNavBar /> : null }
        <Switch>
          <PublicRoute exact path="/">
            <LandingPage />
          </PublicRoute>
          <ProtectedRoute path="/CommunityDashboard">
            <CommunityDashboardPage />
          </ProtectedRoute>
          <ProtectedRoute path="/videoConference/:workshopid">
            <VideoConference />
          </ProtectedRoute>
          <ProtectedRoute exact path="/Profile/:id">
            <UserProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/Messaging">
            <InstantMessagingPage />
          </ProtectedRoute>
        </Switch>
        <Footer />
      </LoadingComponent>
    </ThemeProvider>
  )
}

export default WeRiseApp;
