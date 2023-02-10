import React,{useState, useEffect} from 'react'
import {ScrollView,View, Image,Text, ImageBackground, Pressable} from 'react-native'
import { ListItem, Avatar,Flex } from "@react-native-material/core";
import IngredientList from '../../components/recipe/ingredientList.js';
import NutritionMetric from '../../components/recipe/nutritionMetric.js';
import StepsToPrepare from '../../components/recipe/stepsToPrepare.js';
import { Entypo, Octicons, Ionicons } from '@expo/vector-icons';
let recipeName = 'Sandwich'
let imageSrc = 'https://vaya.in/recipes/wp-content/uploads/2018/06/Club-sandwich.jpg'
let prepTime = '15 min'
const recipeDetail = (/*{imageSrc, recipeName, nutritiondetails,recipeIngredients, prepTime, preparationSteps}*/) => {
  return (
    <ScrollView style={{margin:15,marginTop:40}}>
      <Pressable>
            <Flex inline style={{height:40, width:50}}>
                <Ionicons style={{fontSize:25,color:'blue'}} name="chevron-back" /> 
                <Text style={{fontSize:20,color:'blue'}}>Back</Text>
            </Flex>
      </Pressable>
      <View>
      <Text style={{fontSize:30, marginRight:20}}>{recipeName}</Text>
      </View>
      <View style={{marginTop:20}}>
          <Image style={{height:200, width:'auto'}} source={{ uri: imageSrc }} />
      </View>
      <View style={{marginTop:20}}>
        <IngredientList />
      </View>
      <View style={{marginTop:20}}>
        <View style={{marginTop:30, marginBottom:10}}>
          <Flex inline style={{minHeight:40}}>
              <Entypo style={{textShadowRadius:10, color:'#2F3337'}} name="arrow-long-right" size={30} color="black" />
              <Text style={{fontSize:25,textDecorationLine: 'underline', marginLeft:12,textShadowRadius: 5,textShadowColor: 'rgba(0, 0, 0, 0.75)',}}>Time to prepare</Text>
          </Flex>
        </View>
        <View style={{width:200,height:75}}>
          <ImageBackground style={{height:85}} source={{uri : "https://en.xn--icne-wqa.com/images/icones/7/1/oval-blue.png"}}>
              <Text style={{textAlign:'center', color:'white',fontSize:25,marginTop:20}}>{prepTime}</Text>
          </ImageBackground>
        </View>
      </View>
      <View style={{marginTop:20}}>
        <NutritionMetric />
      </View>
      <View style={{marginTop:20}}>
        <StepsToPrepare />
      </View>
    </ScrollView>
  )
}

export default recipeDetail