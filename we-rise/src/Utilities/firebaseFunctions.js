import firebase from '../firebase'

export const logout = () => {
    firebase.auth().signOut()
    localStorage.removeItem("currentUserID");
    localStorage.removeItem("pageId");
};

export const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email,password)

export const signup = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

export const getfirebaseIdToken = () => firebase.auth().currentUser.getIdToken(false);