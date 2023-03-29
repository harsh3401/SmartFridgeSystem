// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOOfjR_lIBNVFeBexv0Ro1QHPa-NvGILQ",
  authDomain: "socialauth-fc814.firebaseapp.com",
  projectId: "socialauth-fc814",
  storageBucket: "socialauth-fc814.appspot.com",
  messagingSenderId: "1036148748900",
  appId: "1:1036148748900:web:32f5f71a27107f54f4e571",
  measurementId: "G-GRQJ4E8KEJ"
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
export default Firebase