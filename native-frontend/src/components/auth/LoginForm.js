import { useState, useEffect } from "react";
import { View, Pressable, Touchable, StyleSheet, Modal } from "react-native";
import { TextInput, Text } from "@react-native-material/core";
import { Stack, Spacer } from "react-native-flex-layout";
import { IconButton, Colors } from "react-native-paper";
import { signInWithGoogle } from "../../services/firebase/google/google-signin.js";
import {
  signInWithEmailAccount,
  sendPasswordChange,
} from "../../services/firebase/email/email-password-auth.js";

import { Button } from "react-native-paper";
import { login, updateToken } from "../../slice/authSlice.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const LoginForm = (props) => {
  console.log("Here");
  console.log(styles.modal);
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [recoveryemail, setRecoveryEmail] = useState("");
  const [recoveryemailBorder, setRecoveryEmailBorder] = useState(false);
  const [emailBorder, setEmailBorder] = useState(false);
  const [passwordBorder, setPasswordBorder] = useState(false);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [recoveryemailHelper, setRecoveryEmailHelper] = useState("");
  const [modalVis, setModal] = useState(false);

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const validateCreds = () => {
    if (email.trim() != "" && password.trim() != "") {
      handleLogin();
    } else {
      if (email.trim() == "") {
        setEmailHelper("Please enter an email");
        setEmailBorder(true);
      }
      if (password.trim() == "") {
        setPasswordHelper("Please enter a password");
        setPasswordBorder(true);
      }
    }
  };
  const handleLogin = async () => {
    signInWithEmailAccount(email, password)
      .then((user) => {
        user.user.getIdToken().then((token) => {
          dispatch(
            login({ uid: user.user.uid, email: user.user.email, token: token })
          );
          axios.defaults.headers.common["Authorization"] = token;
          axios
            .post("fcm_token/", { fcm_token: auth.fcmtoken })
            .then(() => {
              console.log("Posted FCM token");
            })
            .catch((error) => {
              console.log("Could not post fcm token");
            });
        });
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/too-many-requests") {
          console.log("Here");
          props.setSnackData("Too many requests");
          props.setSnackVis(true);
        }
        if (error.code === "auth/invalid-email") {
          props.setSnackData("That email address is invalid!");
          props.setSnackVis(true);
        }
        if (error.code === "auth/user-not-found") {
          props.setSnackData("That user does not exist in our records");
          props.setSnackVis(true);
        }
        if (error.code === "auth/wrong-password") {
          props.setSnackData("Please enter the correct password");
          props.setSnackVis(true);
        }
      });
  };
  const handleGoogleLogin = async () => {
    signInWithGoogle()
      .then((user) => {})
      .catch((error) => {
        console.log(error.code);
        console.log(error);
      });
    // console.log("User", user);
    // console.log("Eamil", user.email);

    // let token = await user.user.getIdToken();
    // console.log(token);
    // dispatch(
    //   login({ uid: user.user.uid, email: user.user.email, token: token })
    // );
    // axios
    //   .post("fcm_token/", { fcm_token: auth.fcmtoken })
    //   .then(() => {
    //     console.log("Posted FCM token");
    //   })
    //   .catch((err) => {
    //     console.log("Could not post fcm token");
    //   });
    // axios.defaults.headers.common["Authorization"] = token;
    // //  let token=await user.getIdToken();
    // //  dispatch(login({uid:user.uid,email:user.email,token:token}))
  };
  const sendRecoveryemail = () => {
    if (recoveryemail.trim() == "") {
      setRecoveryEmailBorder(true);
      props.setSnackData("Please enter an email address");
      props.setSnackVis(true);
    } else {
      sendPasswordChange(recoveryemail)
        .then(() => {
          props.setSnackData("Recovery email sent");
          setRecoveryEmailHelper("");
          setRecoveryEmail("");
          setRecoveryEmailBorder(false);
          props.setSnackVis(true);
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            props.setSnackData("No user with this email exists in our records");
            props.setSnackVis(true);
          }
          if (error.code === "auth/invalid-email") {
            props.setSnackData("That email address is invalid!");
            props.setSnackVis(true);
          }
        });
    }
  };
  // const handleFacebookLogin = async ()=>{
  //   const user= await signInWithFacebook();
  //   // let token=await user.getIdToken();
  //   // dispatch(login({uid:user.uid,email:user.email,token:token}))
  // }
  return (
    <View>
      <View>
        <View style={{ alignContent: "center" }}>
          <Modal visible={modalVis} transparent={true} animationType="fade">
            <View style={styles.modal}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <IconButton
                  icon="close"
                  size={20}
                  onPress={() => {
                    setRecoveryEmailHelper("");
                    setRecoveryEmail("");
                    setRecoveryEmailBorder(false);
                    setModal(false);
                  }}
                />
              </View>

              <View style={styles.inputdiv}>
                <Text style={styles.inputHelperStyle}>Email</Text>
                <TextInput
                  autoCapitalize="none"
                  inputContainerStyle={
                    recoveryemailBorder && {
                      borderWidth: 2,
                      borderColor: "red",
                    }
                  }
                  onChangeText={(data) => {
                    setRecoveryEmailHelper("");
                    setRecoveryEmail(data);
                    setRecoveryEmailBorder(false);
                  }}
                  variant="outlined"
                  placeholder="Enter recovery email"
                  // helperText={recoveryemailHelper}
                  style={styles.textInputStyleModal}
                />
                <Text style={{ marginTop: 35, fontSize: 10 }}>
                  We'll send a recovery link to your email
                </Text>
              </View>
              <Button
                style={{ backgroundColor: "purple", marginTop: 20 }}
                onPress={() => {
                  sendRecoveryemail();
                }}
                mode="contained"
                icon="refresh"
              >
                Send Reset Email
              </Button>
            </View>
          </Modal>
        </View>
        <Text style={styles.inputHelperStyle}>Email</Text>
        <TextInput
          autoCapitalize="none"
          onChangeText={(data) => {
            setEmailHelper("");
            setEmail(data);
            setEmailBorder(false);
          }}
          inputContainerStyle={
            emailBorder && { borderWidth: 2, borderColor: "red" }
          }
          variant="outlined"
          placeholder="Enter your email"
          helperText={emailHelper}
          style={styles.textInputStyle}
        />
      </View>

      <View style={styles.inputdiv}>
        <Text style={styles.inputHelperStyle}>Password</Text>
        <TextInput
          autoCapitalize="none"
          onChangeText={(data) => {
            setPasswordHelper("");
            setPassword(data);
            setPasswordBorder(false);
          }}
          inputContainerStyle={
            passwordBorder && { borderWidth: 2, borderColor: "red" }
          }
          secureTextEntry={true}
          variant="outlined"
          placeholder="Enter password"
          helperText={passwordHelper}
          style={styles.textInputStyle}
        />
      </View>

      <View style={styles.horizontalcontainer1}>
        {/* <View style={styles.checkboxcontainer}>
              <CheckBox
                  disabled={false}
                  value={remember}
                  onValueChange={(remember)=>setRemember(!remember)}
              />
                  <Text style={{margin:2}}>Remember me</Text>
            </View> */}
        <View>
          <Pressable
            onPress={() => {
              setModal(true);
            }}
          >
            <Text style={{ color: "purple" }}>Forgot password ?</Text>
          </Pressable>
        </View>
      </View>

      <View>
        <Button
          style={{ backgroundColor: "purple", marginTop: 20 }}
          onPress={() => {
            validateCreds();
          }}
          mode="contained"
          icon="mail"
        >
          Login
        </Button>
        <Button
          style={{ backgroundColor: "purple", marginTop: 20 }}
          onPress={() => handleGoogleLogin()}
          mode="contained"
          icon="google"
        >
          Login with Google
        </Button>
        {/* <Button 
 style={{ backgroundColor: 'purple', marginTop: 20 }}
 onPress={() => handleFacebookLogin().then(() => console.log('Signed in with Facebook!'))}
 mode="contained"
 icon="facebook"
>
Login with Facebook
</Button> */}
      </View>

      {/* <View>
            <TextDivider text="Or With"/>
          </View>

          <Spacer />

          <View style={styles.horizontalcontainer2}>
            
              <Button
                onPress = {handleFacebookLogin}
                variant="outlined"
                title="facebook"
                leading={props => <FontAwesome5 name="facebook" size={24} color="black" {...props}/>}
              />
            
           
              <Button
                onPress = {handleGoogleLogin}
                variant="outlined"
                title="google"
                leading={props => <FontAwesome5 name="google" size={24} color="" {...props}/>}
              />
            
          </View>
 */}
    </View>
  );
};

export default LoginForm;

var styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    margin: "10%",
    padding: "5%",
    marginTop: "80%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1,
  },
  horizontalcontainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxcontainer: {
    flexDirection: "row",
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  inputHelperStyle: {
    color: "purple",
    marginBottom: 5,
  },
  textInputStyleModal: {
    height: 20,
    marginBottom: 10,
  },
  textInputStyle: {
    height: 20,
    marginBottom: 60,
  },
  horizontalcontainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputdiv: {
    height: 100,
    marginVertical: 5,
  },

  centerContainer: {},
});
