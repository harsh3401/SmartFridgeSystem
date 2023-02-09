import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Auth from './src/screens/auth/auth.js'
import LoginForm from './src/components/auth/LoginForm.js'
import SignUpForm from './src/components/auth/SignUpForm.js';
import Recipes from './src/screens/recipe/recipes.js';
import IngredientList from './src/components/recipe/ingredientList.js';
import NutritionMetric from './src/components/recipe/nutritionMetric.js';
import StepsToPrepare from './src/components/recipe/stepsToPrepare.js';

export default function App() {
   
  return (
    <View>
      <StepsToPrepare />
    </View>
  )
};
