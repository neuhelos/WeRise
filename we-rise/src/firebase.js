import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyARiJtWLiAbrxpzoR0R0aS6Rbbgezrd23c",
    authDomain: "werise-c999a.firebaseapp.com",
    databaseURL: "https://werise-c999a.firebaseio.com",
    projectId: "werise-c999a",
    storageBucket: "werise-c999a.appspot.com",
    messagingSenderId: "380465617476",
    appId: "1:380465617476:web:f4c400d82859af6531fa11",
    measurementId: "G-XB82BWRN86"
}
console.log(app)

app.initializeApp(config);

const storage = app.storage();

export {
    storage, app as default
}
