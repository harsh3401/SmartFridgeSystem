import auth from '@react-native-firebase/auth';

export const signOut=()=>{
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}
