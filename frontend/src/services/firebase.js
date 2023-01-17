import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: refactor this using env
const firebaseConfig = {

  apiKey: "AIzaSyChgCJ81UXsk83oUqDaphOmT70Iug47gEQ",

  authDomain: "smartfridgesystem.firebaseapp.com",

  projectId: "smartfridgesystem",

  storageBucket: "smartfridgesystem.appspot.com",

  messagingSenderId: "1025891063959",

  appId: "1:1025891063959:web:8b7cfa2c51cfdacac031d2",

  measurementId: "G-F4QZ8M7DDG"

};


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BL75n0vjK0mNLw4XsOWGlZRXTIVS-J3PM5cnLqGsh3AcECsn91rC58crV-KqrAJddDVxIJ3kNtYrQaFAhHEwzvU'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});