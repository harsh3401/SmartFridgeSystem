import {auth} from './firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

class EmailRegistration{

    static handleSignUp = (email, password) =>{
        createUserWithEmailAndPassword(auth, email,password)
        .then(userCredentials=>console.log(userCredentials.user.email))
        .catch(error=>console.error("Couldn't register new user."))
    }

    static handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials=>console.log(userCredentials.user))
        .catch(error=> console.log(error.message))
    }

    static handleLogOut = () => {
        signOut(auth)
        .then(()=>console.log('Successfully logged out'))
        .catch(error => console.log(error.message));
    }
}
