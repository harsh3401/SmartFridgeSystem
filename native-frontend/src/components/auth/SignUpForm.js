import { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { Button, Snackbar } from "react-native-paper";

import { Stack, HStack, VStack, Spacer } from "react-native-flex-layout";
import { TextInput, Text } from "@react-native-material/core";
import TextDivider from "../general/TextDivider.js";

import useFetch from "../../hooks/useFetch.js";
import { useDispatch } from "react-redux";
import { createEmailAccount } from "../../services/firebase/email/email-password-auth.js";
import axios from "axios";
import { login } from "../../slice/authSlice.js";
const SignUpForm = (props) => {
  const [email, setEmail] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [snackData, setSnackData] = useState("");
  const [snackVis, setSnackVis] = useState(false);
  const dispatch = useDispatch();
  const validateData = (data) => {
    //validation logic
    if (data.password1 === data.password2) {
      return true;
    } else {
      return false;
    }
  };
  const handleSignUp = () => {
    const requestData = {
      email: email,
      password1: password,
      password2: passwordC,
    };

    //     axios.post('signup/',

    //   requestData

    // ).then((response) =>{
    //   console.log('User created', {email:requestData.email,password:requestData.password2})

    // setSnackData('Account Created Successfully')
    // setSnackVis(true)
    //   axios.post('signin/',
    //   {email:requestData.email,password:requestData.password2}

    // ).then((response) =>{

    //   dispatch(login({loggedIn:true,expires:response.data.expires_in,name:response.data.user,privilege:response.data.is_superuser?0:1,token:response.data.token}))
    //   navigation.navigate("Dashboard")

    // setSnackData('Welcome')
    //  setSnackVis(true)
    // }).catch((error)=>{
    //   console.log(error)
    // })
    // }).catch((error)=>{
    //   console.log(error)
    // })
    console.log(email, password);
    createEmailAccount(email, password);
    //Email Redux storage
    //Firebase authentication
  };
  // const handleGoogleSignUp = async () =>{
  //   //call appropriate method from services
  // }
  // const handleFacebookSignUp = async ()=>{
  //   //call appropriate method from services
  // }
  return (
    <View style={{ padding: 20 }}>
      <Stack>
        <View style={styles.inputdiv}>
          <Text style={styles.inputHelperStyle}>Email Address</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={(data) => setEmail(data)}
            variant="outlined"
            placeholder="Enter your email"
            style={styles.textInputStyle}
          />
        </View>

        <Spacer />

        <View style={styles.inputdiv}>
          <Text style={styles.inputHelperStyle}>Password</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={(data) => setPassword(data)}
            variant="outlined"
            secureTextEntry={true}
            placeholder="Enter your password"
            style={styles.textInputStyle}
          />
        </View>

        <Spacer />

        <View style={styles.inputdiv}>
          <Text style={styles.inputHelperStyle}>Password Confirmation</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={(data) => setPasswordC(data)}
            secureTextEntry={true}
            variant="outlined"
            placeholder="Enter your password again"
            style={styles.textInputStyle}
          />
        </View>

        <Spacer />

        <View style={styles.horizontalcontainer1}>
          <View style={styles.checkboxcontainer}>
            <Text style={{ marginLeft: 5 }}>Remember me</Text>
          </View>
          <View>
            <Pressable>
              <Text style={{ color: "red" }}>forgot password</Text>
            </Pressable>
          </View>
        </View>

        <Spacer />

        <View>
          <Button
            onPress={handleSignUp}
            style={styles.buttonStyle}
            title="Sign Up"
          >
            Sign Up{" "}
          </Button>
        </View>

        {/* <Spacer />
          
          <View>
            <TextDivider text="Or With"/>
          </View>

          <Spacer />

          <View style={styles.horizontalcontainer2}>
            <View style={styles.buttoncontainer}>
              <Button
                onPress = {handleFacebookSignUp}
                variant="outlined"
                title="facebook"
                leading={props => <FontAwesome5 name="facebook" size={24} color="black" {...props}/>}
              />
            </View>
            <View style={styles.buttoncontainer}>
              <Button
                onPress = {handleGoogleSignUp}
                variant="outlined"
                title="google"
                leading={props => <FontAwesome5 name="google" size={24} color="" {...props}/>}
              />
            </View>
          </View> */}
      </Stack>
      <Snackbar
        visible={snackVis}
        onDismiss={() => {
          setSnackVis(false);
        }}
        action={{
          label: "Undo",
          onPress: () => {
            dispatch(modify({ listdata: lastData }));
            setSnackVis(false);
          },
        }}
      >
        {snackData}
      </Snackbar>
    </View>
  );
};

styles = {
  horizontalcontainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
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
  textInputStyle: {
    height: 20,
    borderRadius: 20,
  },
  horizontalcontainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputdiv: {
    height: 100,
    marginVertical: 5,
  },
};
export default SignUpForm;
