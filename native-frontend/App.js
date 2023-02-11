import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import store from './src/store/store.js';
import { Provider } from "react-redux";

import LoginForm from './src/components/auth/LoginForm.js'
import SignUpForm from './src/components/auth/SignUpForm.js';
import Dashboard from './src/screens/Dashboard/Dashboard.js';
import GroceryList from './src/screens/GroceryList/GroceryList.js';
import EditItem from './src/screens/GroceryList/EditGroceryItem.js';
import Recipes from './src/screens/recipe/recipes.js';
import Settings from './src/screens/Settings/Settings.js';
import Auth from './src/screens/auth/auth.js';
import RecipeDetail from './src/screens/recipe/recipe-detail.js';
import Notifications from './src/screens/notification/notifications.js';


const Drawer=createDrawerNavigator()

export default function App() {
   
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Group>
        <Drawer.Screen name="Auth" component={Auth} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        </Drawer.Group>
      
      </Drawer.Navigator>

    </NavigationContainer>
    </Provider>
  )
};