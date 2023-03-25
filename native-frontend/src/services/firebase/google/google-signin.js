// import Constants from 'expo-constants'; 
// import * as Google from 'expo-google-app-auth'; //google auth libraries
// import * as firebase from "firebase/app";
// import Firebase from '../firebaseConfig'; 

// export const  signInWithGoogle= async () => {
//     try {
//         console.log(Constants.manifest.extra.IOS_KEY,Constants.manifest.extra.ANDROID_KEY);
//       //await GoogleSignIn.askForPlayServicesAsync();
//       const result = await Google.logInAsync({ //return an object with result token and user
//         iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
//         androidClientId: Constants.manifest.extra.ANDROID_KEY, //From app.json
        
//       });
//       if (result.type === 'success') {
//         console.log(result);
//         setIsLoading(true);
//         const credential = firebase.auth.GoogleAuthProvider.credential( //Set the tokens to Firebase
//           result.idToken,
//           result.accessToken
//         );
//         Firebase.auth()
//           .signInWithCredential(credential) //Login to Firebase
//           .catch((error) => {
//             console.log(error);
//           });
//       } else {
//         //CANCEL
//       }
//     } catch ({ message }) {
//       alert('Error:' + message);
//     }
//     // try {
//     //     const result = await Google.logInAsync({
//     //       androidClientId: Constants.manifest.extra.ANDROID_KEY,
//     //     //   iosClientId: IOSClientId,
//     //       behavior: 'web',
//     //       iosClientId: '', //enter ios client id
//     //       scopes: ['profile', 'email']
//     //     });
        
//     //     if (result.type  === 'success') {
//     //       await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//     //       const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
//     //       const googleProfileData = await firebase.auth().signInWithCredential(credential);
//     //       this.onLoginSuccess.bind(this);
//     //     }
//     //   } catch ({ message }) {
//     //     alert('login: Error:' + message);
//     //   }
//   };