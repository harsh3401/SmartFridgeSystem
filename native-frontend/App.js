import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import  Auth from './src/screens/auth/auth.js'
export default function App() {
   
  return (
    <View>
<Auth/>
    </View>
  )
};
