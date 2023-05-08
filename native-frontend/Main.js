import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";

import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Dashboard from "./src/screens/Dashboard/Dashboard.js";
import Auth from "./src/screens/auth/auth.js";
import GroceryList from "./src/screens/GroceryList/GroceryList.js";
import EditGroceryList from "./src/screens/GroceryList/EditGroceryItem.js";
import Settings from "./src/screens/Settings/Settings.js";
import Recipes from "./src/screens/recipe/recipes.js";
import RecipeDetail from "./src/screens/recipe/recipe-detail.js";
import Notifications from "./src/screens/notification/notifications.js";
import Filters from "./src/screens/Filter/filters.js";
import auth from "@react-native-firebase/auth";
import React from "react";
import FridgeDetail from "./src/screens/FridgeDetail/FridgeDetail.js";
import { updateFCMToken } from "./src/slice/authSlice.js";
import { useDispatch } from "react-redux";
import { login } from "./src/slice/authSlice.js";
import FilterOptions from "./src/components/filter/filterOptions.js";

const Drawer = createDrawerNavigator();

export default function Main(props) {
  console.log(props);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const onAuthStateChanged = async (userreceived) => {
    setUser(userreceived);
    if (initializing) setInitializing(false);

    if (userreceived && props.fcm) {
      let token = await userreceived.getIdToken();
      dispatch(
        login({
          uid: userreceived.uid,
          email: userreceived.email,
          token: token,
        })
      );
      axios.defaults.headers.common["Authorization"] = token;
      console.log("axios token", token);
      if (userreceived) {
        let response = axios
          .post("fcm_token/", { fcm_token: props.fcm })
          .then(() => {
            console.log("Posted FCM token");
            return true;
          })
          .catch((err) => {
            console.log("Could not post fcm token");
            return false;
          });
      }

      if (initializing) setInitializing(false);
    }
  };
  // useEffect(()=>{
  //   dispatch(updateFCMToken(props.fcm))
  //   user&&   axios.post("fcm_token/",{fcm_token:props.fcm}).then(()=>{
  //     console.log("Posted FCM token")
  //   }).catch((err) => {console.log("Could not post fcm token")})
  // },[user,props.fcm])
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [props.fcm]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {!user ? (
          <>
            <Drawer.Screen
              name="Auth"
              component={Auth}
              options={{
                title: "Auth",
                headerShown: false,
                animationTypeForReplace: !authState.isLoggedIn ? "pop" : "push",
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Grocery List" component={GroceryList} />
            <Drawer.Screen
              name="EditGList"
              options={{
                drawerItemStyle: { height: 0 },
                headerShown: false,
              }}
              component={EditGroceryList}
            />
            <Drawer.Screen name="Recipes" component={Recipes} />
            <Drawer.Screen
              name="RecipeDetail"
              component={RecipeDetail}
              options={{
                drawerItemStyle: { height: 0 },
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="FilterPage"
              component={Filters}
              options={{
                drawerItemStyle: { height: 0 },
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="Fridge Preview"
              component={FridgeDetail}
              options={{
                drawerItemStyle: { height: 0 },
              }}
            />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="Settings" component={Settings} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
