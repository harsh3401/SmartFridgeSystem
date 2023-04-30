import React from "react";
import { useState } from "react";
import { View, Pressable } from "react-native";
import { Text, IconButton } from "@react-native-material/core";
import SignUpForm from "../../components/auth/SignUpForm.js";
import LoginForm from "../../components/auth/LoginForm.js";
import { Stack, HStack, VStack, Spacer } from "react-native-flex-layout";
import { Button } from "react-native-paper";
const Auth = (props) => {
  const [isUserRegistered, setIsUserRegistered] = useState(true);

  return (
    <>
      {isUserRegistered ? (
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: "20%" }}>
          <View>
            <Text variant="h4" style={{ marginTop: 16, marginHorizontal: 16 }}>
              Hi, Welcome Back!
            </Text>
            <Text
              variant=""
              style={{ marginHorizontal: 16, marginBottom: 30, color: "grey" }}
            >
              Hello again, you've been missed
            </Text>
          </View>
          <Spacer />
          <View style={{ height: 400 }}>
            <LoginForm {...props} />
          </View>
          <Spacer />
          <Spacer />
          <Spacer />
          <View style={styles.registerStatusChange}>
            <Text style={{ marginRight: 10 }}>Don't have an account?</Text>
            <Pressable onPress={() => setIsUserRegistered(!isUserRegistered)}>
              <Text style={{ color: "purple" }}>SignUp</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <View>
            <Text
              variant="h4"
              style={{ marginLeft: 20, marginRight: 20, marginTop: "20%" }}
            >
              Create an account
            </Text>
            {/* <Text style={{ margin: 16, color:'grey' }}>Connect with your friends today!</Text> */}
          </View>
          <Spacer />
          <View>
            <SignUpForm {...props} />
          </View>
          <Spacer />
          <View style={styles.registerStatusChange}>
            <Text style={{ marginRight: 5, color: "grey" }}>
              Already have an account ?
            </Text>
            <Button onPress={() => setIsUserRegistered(!isUserRegistered)}>
              <Text style={{ color: "purple" }}>Login</Text>
            </Button>
          </View>
        </View>
      )}
    </>
  );
};

styles = {
  registerStatusChange: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Auth;
