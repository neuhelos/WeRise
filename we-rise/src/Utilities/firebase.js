import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const {
    REACT_APP_APIKEY,
    REACT_APP_AUTHDOMAIN,
    REACT_APP_DATABASEURL,
    REACT_APP_PROJECTID,
    REACT_APP_STORAGEBUCKET,
    REACT_APP_MESSAGINGSENDERID,
    REACT_APP_APPID,
    REACT_APP_MEASUREMENTID,
} = process.env;


const config = { 
    apiKey: REACT_APP_APIKEY,
    authDomain: REACT_APP_AUTHDOMAIN,
    databaseURL: REACT_APP_DATABASEURL,
    projectId: REACT_APP_PROJECTID,
    storageBucket: REACT_APP_STORAGEBUCKET,
    messagingSenderId: REACT_APP_MESSAGINGSENDERID,
    appId: REACT_APP_APPID,
    measurementId: REACT_APP_MEASUREMENTID 
}

firebase.initializeApp(config);

const storage = firebase.storage();
const firestore = firebase.firestore()

export { firestore, storage, firebase as default}
