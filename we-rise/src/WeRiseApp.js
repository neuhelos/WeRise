import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import firebase from './Utilities/firebase'
import { apiURL } from './Utilities/apiURL'

import { setCurrentUser } from './features/Authentication/AuthenticationSlice'
import { getFirebaseIdToken } from './Utilities/firebaseFunctions'

import AuthNavBar from './features/NavBar/AuthNavBar'
import LandingPage from './features/Pages/LandingPage'
import CommunityDashboardPage from './features/Pages/CommunityDashboard'
import VideoConference from './features/Pages/videoConference'
import UserProfilePage from './features/Pages/UserProfilePage'
import InstantMessagingPage from './features/Pages/MessagingPage'
import Footer from './features/BaseComponents/Footer'
import { PublicRoute, ProtectedRoute } from './features/Authentication/AuthRouting'

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './styling/ThemeProvider'


const WeRiseApp = () => {

  const currentUser = useSelector( state => state.currentUserSession )

  const dispatch = useDispatch()

  const userSession = async user => {
    if(user) {
        const {email, uid} = user
        let res = await axios.get(`${apiURL()}/users/${uid}`)
        const {bio, firstn, lastn, facebook, instagram, twitter, linkedin, user_pic} = res.data.payload[0]
        debugger
        getFirebaseIdToken().then(token => {
            dispatch(setCurrentUser({email, uid, token, bio, firstn, lastn, facebook, instagram, twitter, linkedin, user_pic}))
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
    </ThemeProvider>
  )
}

export default WeRiseApp;
