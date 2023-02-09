import React from 'react'
import {View, FlatList, Text, Pressable, Image} from 'react-native'
import { ListItem, Avatar, Flex, Spacer} from "@react-native-material/core";
import { Entypo, Octicons } from '@expo/vector-icons';
const NutritionMetric = () => {
  return (
    <View>
        <View style={{marginTop:30, marginBottom:10}}>
        <Flex inline style={{height:40}}>
            <Entypo style={{textShadowRadius:10, color:'#2F3337'}} name="arrow-long-right" size={30} color="black" />
            <Text style={{fontSize:25,fontFamily:'sans-serif',textDecorationLine: 'underline', marginLeft:12,textShadowRadius: 5,textShadowColor: 'rgba(0, 0, 0, 0.75)',}}>Nutritional Details</Text>
            </Flex>
        </View>
        <FlatList 
            data = {nutritiondetails}
            renderItem = {data=>{
                return (
                    <Flex inline style={{minHeight:40, width:320, marginLeft:15, elevation:4}}>
                      <Text style={{fontSize:20,color:'black', fontStyle:'italic', marginLeft:20,textShadowRadius: 10}}>{data.item.key}</Text>
                      <Spacer />
                      <Text style={{fontSize:20,color:'black', fontStyle:'italic', marginLeft:20,textShadowRadius: 10}}>{data.item.value}</Text>
                    </Flex>
                )
            }}
        />
    </View>
  )
}

nutritiondetails = [
    {
        'key':'Sugar',
        'value':'22 g'
    },
    {
        'key':'Calories',
        'value':'220 kcal'
    },
    {
        'key':'Protein',
        'value':'18 g'
    }
]

export default NutritionMetric