import React from 'react'
import useEffect from '../../hooks/useFetch.js'
import {View, FlatList, Text, Pressable, Image} from 'react-native'
import { Flex, Box, Spacer, Avatar } from "@react-native-material/core";
import { Ionicons } from '@expo/vector-icons'; 
import RecipeTile from '../../components/recipe/recipeTile.js'
const Recipes = () => {

//   const [error, recipeList] = useFetch('', [])
recipeList = [
    {
        imgurl:"https://pipingpotcurry.com/wp-content/uploads/2020/12/Poha-Recipe-indori-Piping-Pot-Curry.jpg",
        name:"Poha",
        ingredients:"Poha, Potato, Onion, Peanuts, Lemon, .............",
        preptime:"10 min"
    },
    {
        imgurl:"https://vaya.in/recipes/wp-content/uploads/2018/06/Club-sandwich.jpg",
        name:"Sandwich",
        ingredients:"Bread,  Tomato, Potato,Butter, Chilli, Sauce, .........",
        preptime:"15 min"
    },
    {
        imgurl:"https://economictimes.indiatimes.com/blogs/wp-content/uploads/2015/06/Misal-pav_getty_640x480.jpg",
        name:"Misal Pav",
        ingredients:"Pav, Beans, Farsan, Lemon, Onion, Ginger, ......",
        preptime:"30 min"
    },
    {
        imgurl:"https://i.ndtvimg.com/i/2018-02/dahi-bhalla_650x400_61519796037.jpg",
        name:"Dahi Vada",
        ingredients:"Potato, Curd, Yoghurt, Tamarind, Ginger, ..........",
        preptime:"30 min"
    }
]
  return (
    <View style={{marginTop:50}}>
        <Pressable>
            <Flex inline style={{height:40}}>
                <Ionicons style={{fontSize:25,color:'blue'}} name="chevron-back" /> 
                <Text style={{fontSize:20,color:'blue'}}>Back</Text>
            </Flex>
        </Pressable>
        <Flex inline style={{height:40, marginVertical: 10, marginHorizontal:15}}>
                <Text style={{fontSize:30, marginRight:20}}>Recipes</Text>
                <Image style={{height:50, width:50}} source={{ uri: "https://icons.iconarchive.com/icons/lemon-liu/recipes/512/recipe-soup-icon.png" }} />
        </Flex>
        <FlatList 
            style = {styles.flatView}
            data = {recipeList}
            renderItem = {recipe=>{
                return (
                    <RecipeTile 
                        imageSrc={recipe.item.imgurl} 
                        recipeName={recipe.item.name} 
                        recipeIngredients={recipe.item.ingredients} 
                        prepTime={recipe.item.preptime} 
                    />
                )
            }}
        />
    </View>
  )
}

styles = {
    'flatView':{
        
    }
}

export default Recipes