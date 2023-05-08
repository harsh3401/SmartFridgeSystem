import auth from "@react-native-firebase/auth";

export const createEmailAccount = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log("User account created & signed in!");
      return data;
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
    });
};

export const signInWithEmailAccount = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const sendPasswordChange = (email) => {
  return auth().sendPasswordResetEmail(email);
};
