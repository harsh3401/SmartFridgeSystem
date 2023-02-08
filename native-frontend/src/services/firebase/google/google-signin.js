// import {auth} from '../firebase';
// import {provider} from './google-provider'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth()
export const signInWithGoogle = () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(`Signed in as ${user}`)
    }).catch((error) => {
    
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

    });
}