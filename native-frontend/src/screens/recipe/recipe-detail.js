import React, { useState, useEffect } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  ScrollView,
  View,
  Image,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { ListItem, Avatar, Flex } from "@react-native-material/core";
import IngredientList from "../../components/recipe/ingredientList.js";
import { useNavigation } from "@react-navigation/native";
import NutritionMetric from "../../components/recipe/nutritionMetric.js";
import StepsToPrepare from "../../components/recipe/stepsToPrepare.js";
// import { Entypo, Ionicons } from "@expo/vector-icons";

let recipeName = "Sandwich";
let imageSrc =
  "https://vaya.in/recipes/wp-content/uploads/2018/06/Club-sandwich.jpg";
let prepTime = "15 min";
const RecipeDetail = ({ route }) => {
  const navigation = useNavigation();
  const arr = route.params.recipe_name.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const Heading = arr.join(" ");
  return (
    <ScrollView style={{ margin: 15 }}>
      <View>
        <Text
          style={{
            fontSize: 30,
            marginRight: 20,
            marginLeft: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {Heading}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Image
          style={{ height: 200, width: "auto" }}
          source={{
            uri: route.params.recipe_image_url
              ? route.params.recipe_image_url
              : "https://en.xn--icne-wqa.com/images/icones/7/1/oval-blue.png",
          }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <YoutubePlayer height={200} play={true} videoId={"84WIaK3bl_s"} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: 25,
            marginBottom: 10,
            textDecorationLine: "underline",
            marginLeft: 12,
            textShadowRadius: 5,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
          }}
        >
          Ingredients
        </Text>
        <IngredientList ingredients={route.params.ingredients} />
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={{ marginTop: 30, marginBottom: 10 }}>
          <Flex inline style={{ minHeight: 40 }}>
            {/* <Entypo
              style={{ textShadowRadius: 10, color: "#2F3337" }}
              name="arrow-long-right"
              size={30}
              color="black"
            /> */}
            <Text
              style={{
                fontSize: 25,
                textDecorationLine: "underline",
                marginLeft: 12,
                textShadowRadius: 5,
                textShadowColor: "rgba(0, 0, 0, 0.75)",
              }}
            >
              Time to prepare
            </Text>
          </Flex>
        </View>
        <View style={{ width: 200, height: 75 }}>
          <ImageBackground
            style={{ height: 85 }}
            source={{
              uri: "https://en.xn--icne-wqa.com/images/icones/7/1/oval-blue.png",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 25,
                marginTop: 20,
              }}
            >
              {route.params.time_to_make}
            </Text>
          </ImageBackground>
        </View>
      </View>
      {/* <View style={{ marginTop: 20 }}>
        <NutritionMetric nutritiondetails={route.params.nutrition_data} />
      </View> */}
      <View style={{ marginTop: 20 }}>
        <StepsToPrepare stepstocook={route.params.steps} />
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
