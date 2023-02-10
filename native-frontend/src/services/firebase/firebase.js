
import * as firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyB0h5RJQVePsgs6cThaGbC0dbH-Mcwk4WQ",

  authDomain: "smartfridgefyp.firebaseapp.com",

  projectId: "smartfridgefyp",

  storageBucket: "smartfridgefyp.appspot.com",

  messagingSenderId: "536407293740",

  appId: "1:536407293740:web:fc82258c514809ec0c3689",

  measurementId: "G-7T98E494B5"

};


// Initialize Firebase
let app;
if(firebase.getApps().length > 0){
    app = firebase.app()
}else{
    app = firebase.initializeApp(firebaseConfig)
}

const auth = getAuth()

export {auth};
