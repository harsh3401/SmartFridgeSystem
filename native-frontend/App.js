import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Auth from './src/screens/auth/auth.js'
import LoginForm from './src/components/auth/LoginForm.js';
import SignUpForm from './src/components/auth/SignUpForm.js';
export default function App() {
   
  return (
    <Auth />
  )
};
