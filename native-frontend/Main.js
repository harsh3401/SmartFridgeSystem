
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {useSelector} from "react-redux"
import { useEffect } from 'react';

import Dashboard from './src/screens/Dashboard/Dashboard.js';
import Auth from './src/screens/auth/auth.js';
import GroceryList from './src/screens/GroceryList/GroceryList.js';
import EditGroceryList from './src/screens/GroceryList/EditGroceryItem.js';


const Stack=createStackNavigator()


export default function Main() {
    const authState=useSelector((state)=>state.auth)
    console.log(authState)

  return (

    <NavigationContainer>
      <Stack.Navigator >

        {authState.token ==null?       
        <>
        <Stack.Screen name="Auth" component={Auth}        
         options={{
          title: 'Auth',
          headerShown:false,
         animationTypeForReplace: !authState.isLoggedIn ? 'pop' : 'push',
        }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen   options={{
          
          headerShown:false,
       
        }}
        name="GList" component={GroceryList} />
        <Stack.Screen name="EditGList"  options={{
       
          headerShown:false,
      
        }}component={EditGroceryList} />
        </>:  <>
        <Stack.Screen name="GList" component={GroceryList} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="EditGList" options={{
       
       headerShown:false,
   
     }} component={EditGroceryList} /></>
        }
       

      
      </Stack.Navigator>

    </NavigationContainer>

  )
};