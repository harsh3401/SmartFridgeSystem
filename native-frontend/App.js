import { Provider } from "react-redux";
import Main from "./Main";
import store from "./src/store/store";
import axios from "axios";
import messaging from "@react-native-firebase/messaging";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { useDispatch } from "react-redux";
// import {BACKEND_URL} from 'react-native-dotenv';
axios.defaults.baseURL = "http://167.71.224.8/api/backend/";

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp
  // async (error) => {
  //   if (error.response.status === 401 && !refresh) {
  //     refresh = true;

  //     // const token = getAccessToken();
  //     // const response = await axios.post("api/refresh-token/", {
  //     //   username: "pdf",
  //     //   token: token,r
  //     // });

  //     // // if (response.status === 200) {
  //     // //   axios.defaults.headers.common[
  //     // //     "Authorization"
  //     // //   ] = `Token ${response.data["token"]}`;
  //     // //   setAccessToken(response.data["token"]);
  //     // //   return axios(error.config);
  //     // // }
  //     // // console.log(response);
  //   }
  //   console.log(error);
  //   refresh = false;
  //   return Promise.reject(error.response);
  // }
);

export default function App() {
  const [fcm, setFCM] = useState();
  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    console.log("Authorization status(authStatus):", authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };
  useEffect(() => {
    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then((fcmToken) => {
          console.log("setting fcm token as ", fcmToken);
          setFCM(fcmToken);
          // console.log('FCM Token -> ', fcmToken);

          // axios.post("fcm_token/",{fcm_token:fcmToken}).then(()=>{
          //   console.log("Posted FCM token")
          // }).catch((err) => {console.log("Could not post fcm token")})
        });
    } else console.log("Not Authorization status:", authStatus);

    /**
     * When a notification from FCM has triggered the application
     * to open from a quit state, this method will return a
     * `RemoteMessage` containing the notification data, or
     * `null` if the app was opened via another method.
     */
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "getInitialNotification:" +
              "Notification caused app to open from quit state"
          );
          console.log(remoteMessage);
          // alert(
          //   "getInitialNotification: Notification caused app to" +
          //     " open from quit state"
          // );
        }
      });

    /**
     * When the user presses a notification displayed via FCM,
     * this listener will be called if the app has opened from
     * a background state. See `getInitialNotification` to see
     * how to watch for when a notification opens the app from
     * a quit state.
     */
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "onNotificationOpenedApp: " +
            "Notification caused app to open from background state"
        );
        console.log(remoteMessage);
        // alert(
        //   "onNotificationOpenedApp: Notification caused app to" +
        //     " open from background state"
        // );
      }
    });

    /**
     * Set a message handler function which is called when
     * the app is in the background or terminated. In Android,
     * a headless task is created, allowing you to access the
     * React Native environment to perform tasks such as updating
     * local storage, or sending a network request.
     */
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    /**
     * When any FCM payload is received, the listener callback
     * is called with a `RemoteMessage`. Returns an unsubscribe
     * function to stop listening for new messages.
     */
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    });

    /**
     * Apps can subscribe to a topic, which allows the FCM
     * server to send targeted messages to only those devices
     * subscribed to that topic.
     */
    // messaging()
    //   .subscribeToTopic(TOPIC)
    //   .then(() => {
    //     console.log(`Topic: ${TOPIC} Suscribed`);
    //   });

    return () => {
      unsubscribe;
      /**
       * Unsubscribe the device from a topic.
       */
      // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  return (
    <Provider store={store}>
      <Main fcm={fcm} />
    </Provider>
  );
}
