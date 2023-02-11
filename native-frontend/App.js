import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import LoginForm from './src/components/auth/LoginForm.js'
import SignUpForm from './src/components/auth/SignUpForm.js';
import Dashboard from './src/screens/Dashboard/Dashboard.js';
import GroceryList from './src/screens/GroceryList/GroceryList.js';
import EditItem from './src/screens/GroceryList/EditGroceryItem.js';
import Recipes from './src/screens/recipe/recipes.js';
import Settings from './src/screens/Settings/Settings.js';
import Auth from './src/screens/auth/auth.js';
export default function App() {
   
  return (
    <NavigationContainer>
   <Auth></Auth>
    </NavigationContainer>
  )
};