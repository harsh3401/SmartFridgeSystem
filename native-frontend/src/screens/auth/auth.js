import React from "react";
import { useState } from "react";
import { Text, View, StatusBar } from "react-native";
import { IconButton } from "@react-native-material/core";
import SignUpForm from "../../components/auth/SignUpForm.js";
import LoginForm from "../../components/auth/LoginForm.js";
import { Stack, HStack, VStack, Spacer } from "react-native-flex-layout";
import { Button, Snackbar } from "react-native-paper";
const Auth = (props) => {
  const [isUserRegistered, setIsUserRegistered] = useState(true);
  const [snackData, setSnackData] = useState();
  const [snackVis, setSnackVis] = useState(false);

  return (
    <>
      {isUserRegistered ? (
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: "20%",
            height: "90%",
          }}
        >
          <StatusBar animated={true} backgroundColor="#5856d6" />

          <View>
            <Text style={{ fontSize: 30, marginTop: 16, marginHorizontal: 16 }}>
              Hi, Welcome Back!
            </Text>
            <Text
              variant=""
              style={{ marginHorizontal: 16, marginBottom: 30, color: "grey" }}
            >
              Hello again, you've been missed
            </Text>
          </View>

          <View style={{ height: 400 }}>
            <LoginForm
              {...props}
              setSnackData={setSnackData}
              setSnackVis={setSnackVis}
              snackVis={snackVis}
              snackData={snackData}
            />
          </View>

          <View style={styles.registerStatusChange}>
            <Text style={{ marginRight: 10 }}>Don't have an account?</Text>

            <Button onPress={() => setIsUserRegistered(!isUserRegistered)}>
              <Text style={{ color: "purple" }}>SignUp</Text>
            </Button>
          </View>
          <Snackbar
            visible={snackVis}
            onDismiss={() => {
              setSnackVis(false);
            }}
            action={{
              label: "Close",
              onPress: () => {
                // dispatch(modify({ listdata: lastData }));
                setSnackVis(false);
              },
            }}
          >
            {snackData}
          </Snackbar>
        </View>
      ) : (
        <View>
          <View>
            <Text
              variant="h4"
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: "20%",
                fontSize: 30,
              }}
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
