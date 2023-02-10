// // import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// import {auth} from '../firebase';
// // import {provider} from './facebook-provider'
// import * as Facebook from 'expo-facebook';
// import {LoginManager, AccessToken, SignInWithCredential} from 'react-native-fbsdk-next'
// import { FacebookAuthProvider } from 'firebase/auth';
// export const signInWithFacebook = async () => {

//     const result = await LoginManager.logInWithPermissions(['public_profile','email']);
//     if(result.isCancelled){
//         throw new Error('User cancelled login')
//     }
//     const data = await AccessToken.getCurrentAccessToken();
//     if(!data){
//         throw new Error('Something went wrong obtaining access token')
//     }
//     const credential = FacebookAuthProvider.credential(data.accessToken)
//     const user = await SignInWithCredential(auth, credential);
//     console.log(user);

// }
