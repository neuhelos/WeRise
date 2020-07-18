import firebase from '../firebase'

export const signOut = () =>  firebase.auth().signOut()

export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email,password)

export const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

export const getfirebaseIdToken = () => firebase.auth().currentUser.getIdToken(false);