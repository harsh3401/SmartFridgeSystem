import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { Flex, Box, Spacer, Avatar } from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";
import RecipeTile from "../../components/recipe/recipeTile.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const Recipes = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) {
      axios
        .get("/get-recommendation/")
        .then((response) => {
          console.log(response.data.recommendations.length);
          setRecipeList(response.data.recommendations);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isFocused]);

  const getRecipeDetails = (recipe) => {
    navigation.navigate("RecipeDetail", recipe);
  };
  // recipeList = [
  //     {
  //         imgurl:"https://pipingpotcurry.com/wp-content/uploads/2020/12/Poha-Recipe-indori-Piping-Pot-Curry.jpg",
  //         name:"Poha",
  //         ingredients:"Poha, Potato, Onion, Peanuts, Lemon, .............",
  //         preptime:"10 min"
  //     },
  //     {
  //         imgurl:"https://vaya.in/recipes/wp-content/uploads/2018/06/Club-sandwich.jpg",
  //         name:"Sandwich",
  //         ingredients:"Bread,  Tomato, Potato,Butter, Chilli, Sauce, .........",
  //         preptime:"15 min"
  //     },
  //     {
  //         imgurl:"https://economictimes.indiatimes.com/blogs/wp-content/uploads/2015/06/Misal-pav_getty_640x480.jpg",
  //         name:"Misal Pav",
  //         ingredients:"Pav, Beans, Farsan, Lemon, Onion, Ginger, ......",
  //         preptime:"30 min"
  //     },
  //     {
  //         imgurl:"https://i.ndtvimg.com/i/2018-02/dahi-bhalla_650x400_61519796037.jpg",
  //         name:"Dahi Vada",
  //         ingredients:"Potato, Curd, Yoghurt, Tamarind, Ginger, ..........",
  //         preptime:"30 min"
  //     }
  // ]

  let renderVar;
  renderVar = !isLoading ? (
    <FlatList
      style={styles.flatView}
      data={recipeList}
      renderItem={(recipe) => {
        return (
          <Pressable
            style={styles.card}
            onPress={() => getRecipeDetails(recipe.item)}
          >
            <RecipeTile
              imageSrc={recipe.item.imgurl}
              recipeName={recipe.item.recipe_name}
              recipeIngredients={recipe.item.ingredients}
              prepTime={recipe.item.time_to_make}
            />
          </Pressable>
        );
      }}
    />
  ) : (
    <View></View>
  );

  return <View>{renderVar}</View>;
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    margin: "1%",
  },
});

export default Recipes;
