import firebase from './firebase'
import { firestore } from './firebase'

export const signOut = () =>  firebase.auth().signOut()

export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email,password)

export const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

export const getFirebaseIdToken = () => firebase.auth().currentUser.getIdToken(false);

export const fetchFirebaseUser = async (userId) => {
    let user = await firestore
    .collection('users')
    .doc(userId)
    .get()
    .then( querySnapshot => {
        return querySnapshot.data()
    })
    return user
}