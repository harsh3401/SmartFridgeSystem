
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {useSelector} from "react-redux"
import { useEffect } from 'react';

import Dashboard from './src/screens/Dashboard/Dashboard.js';
import Auth from './src/screens/auth/auth.js';
import GroceryList from './src/screens/GroceryList/GroceryList.js';
import EditGroceryList from './src/screens/GroceryList/EditGroceryItem.js';
import Settings from './src/screens/Settings/Settings.js';
import Recipes from './src/screens/recipe/recipes.js';
import RecipeDetail from './src/screens/recipe/recipe-detail.js';
import Notifications from './src/screens/notification/notifications.js';

const Drawer=createDrawerNavigator()


export default function Main() {
    const authState=useSelector((state)=>state.auth)
    console.log(authState)

  return (

    <NavigationContainer>
      <Drawer.Navigator >

        {authState.token ==null?       
        <>
            
        <Drawer.Screen name="Auth" component={Auth}        
         options={{
          title: 'Auth',
          headerShown:false,
         animationTypeForReplace: !authState.isLoggedIn ? 'pop' : 'push',
        }}/>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen   
        name="EGList" component={GroceryList} />
        <Drawer.Screen name="EditGList"component={EditGroceryList} />
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