import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentUser } from './features/Authentication/AuthenticationSlice'
import { getFirebaseIdToken } from './Utilities/firebaseFunctions'
import firebase, { firestore } from './Utilities/firebase'
import { chatsStore } from './features/Messaging/ChatSlice'

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
        getFirebaseIdToken().then(token => {
            dispatch(setCurrentUser({email, uid, token}))
        })
        await fetchChats(uid)
    } else {
        dispatch(setCurrentUser(null))
    }
  };

  useEffect( () => {
      const authStateObserver = firebase.auth().onAuthStateChanged(userSession)
      return authStateObserver
  }, []);

  const fetchChats = async (currentUser) => {
    await firestore
    .collection('chats')
    .where('users', 'array-contains', currentUser)
    .onSnapshot( async (res) => {
        const chats = res.docs.map(doc => doc.data())
        await dispatch(chatsStore(chats))
    })
  }

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
          <ProtectedRoute path="/videoConference">
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
