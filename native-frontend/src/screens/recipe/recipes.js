import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Pressable, Image, StyleSheet } from "react-native";
// import { Pressable } from "@react-native-material/core";
import RecipeTile from "../../components/recipe/recipeTile.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { LogBox } from "react-native";
import { Button } from "react-native-paper";
import { Facebook } from "react-content-loader/native";

const Recipes = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) {
      axios
        .get("prev-recipes/")
        .then((response) => {
          console.log(response.data);
          setRecipeList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isFocused]);

  const getRecipeDetails = () => {
    console.log("here");
    // navigation.navigate("RecipeDetail", recipe);
  };
  const filterMenu = () => {};
  const sortMenu = () => {};
  const getNewRecipes = () => {
    setIsFetching(true);
    axios
      .get("get-recommendation/")
      .then((response) => {
        console.log(response.data.recommendations);
        setRecipeList(response.data.recommendations);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
    <View style={{ backgroundColor: "white", padding: 10, height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button onPress={getNewRecipes} icon={"refresh"}>
          Get new Recipes
        </Button>
        <Button onPress={filterMenu} icon={"filter"}>
          Filter
        </Button>
        <Button onPress={sortMenu} icon={"sort"}>
          Sort
        </Button>
      </View>

      {!isFetching ? (
        <FlatList
          style={styles.flatView}
          data={recipeList.map((object, index) => {
            return { ...object, id: index };
          })}
          renderItem={(recipe) => {
            return (
              <Pressable onPress={getRecipeDetails} style={styles.card}>
                <RecipeTile
                  recipe={recipe.item}
                  id={recipe.item.id}
                  imageSrc={recipe.item.recipe_image_url}
                  recipeName={recipe.item.recipe_name}
                  recipeIngredients={recipe.item.ingredients}
                  prepTime={recipe.item.time_to_make}
                />
              </Pressable>
            );
          }}
        />
      ) : (
        <View>
          <Facebook />
          <Facebook />
          <Facebook />
          <Facebook />
          <Facebook />
        </View>
      )}
    </View>
  ) : (
    <View>
      <Facebook />
      <Facebook />
      <Facebook />
      <Facebook />
      <Facebook />
    </View>
  );

  return <View>{renderVar}</View>;
};

const styles = StyleSheet.create({
  card: {
    zIndex: 1,
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
    position: "relative",

    zIndex: 1,
  },
  flatView: {
    horizontal: true,
  },
});

export default Recipes;
