import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Auth from './src/screens/auth/auth.js'
import LoginForm from './src/components/auth/LoginForm.js'
import SignUpForm from './src/components/auth/SignUpForm.js';
import Dashboard from './src/screens/Dashboard/Dashboard.js';
export default function App() {
   
  return (
    <View>
      <Dashboard />
    </View>
  )
};