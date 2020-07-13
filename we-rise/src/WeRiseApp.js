import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import firebase from './Utilities/firebase'
import { setCurrentUser } from './features/Authentication/authenticationSlice'
import { getFirebaseIdToken } from './utilitron/firebaseFunctions'

import NavBar from './features/BaseComponents/NavBar'
import { PublicRoute, ProtectedRoute } from './features/Authentication/AuthRouting'


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

    <>

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
    </>
  )
}

export default WeRiseApp;
