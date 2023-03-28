
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import axios from 'axios';
import {useSelector} from "react-redux"
import { useEffect } from 'react';
import {useState} from 'react';
import Dashboard from './src/screens/Dashboard/Dashboard.js';
import Auth from './src/screens/auth/auth.js';
import GroceryList from './src/screens/GroceryList/GroceryList.js';
import EditGroceryList from './src/screens/GroceryList/EditGroceryItem.js';
import Settings from './src/screens/Settings/Settings.js';
import Recipes from './src/screens/recipe/recipes.js';
import RecipeDetail from './src/screens/recipe/recipe-detail.js';
import Notifications from './src/screens/notification/notifications.js';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { updateFCMToken } from './src/slice/authSlice.js';
import { useDispatch } from 'react-redux';
import { login } from './src/slice/authSlice.js';

const Drawer=createDrawerNavigator()


export default function Main(props) {
  const dispatch=useDispatch();
    const authState=useSelector((state)=>state.auth)
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    console.log(authState)
    const onAuthStateChanged=async (userreceived) =>{
      setUser(userreceived);
      if(userreceived)
      {  
      let token=await userreceived.getIdToken();
      dispatch(login({uid:userreceived.uid,email:userreceived.email,token:token}))
   axios.defaults.headers.common[
     "Authorization"
   ] = token;}
 
      if (initializing) setInitializing(false);
    }
    useEffect(()=>{
      dispatch(updateFCMToken(props.fcm))
      user&&   axios.post("fcm_token/",{fcm_token:props.fcm}).then(()=>{
        console.log("Posted FCM token")
      }).catch((err) => {console.log("Could not post fcm token")})
    },[user,props.fcm])
    useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;


  return (

    <NavigationContainer>
      <Drawer.Navigator >

        {!user?       
        <>
            
        <Drawer.Screen name="Auth" component={Auth}        
         options={{
          title: 'Auth',
          headerShown:false,
         animationTypeForReplace: !authState.isLoggedIn ? 'pop' : 'push',
        }}/>
  
        </>:  <>
        

        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Grocery List" component={GroceryList} />
        <Drawer.Screen name="EditGList" options={{
       
          headerShown:false,
      
        }} component={EditGroceryList} />
        <Drawer.Screen name="Recipes" component={Recipes} />
        <Drawer.Screen name="RecipeDetail" component={RecipeDetail} />
        <Drawer.Screen name="Notifications" component={Notifications} />
     <Drawer.Screen name="Settings" component={Settings} /></>
        }
       

      
      </Drawer.Navigator>

    </NavigationContainer>

  )
};