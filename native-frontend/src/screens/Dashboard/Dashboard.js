import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { modify } from "../../slice/listSlice";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { LoadingView } from "../../components/imageloader/LoadingView";
const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [grocerydata, setGroceryData] = useState([]);
  const [staleItems, setStaleItems] = useState(1);
  const [imageUrl, setImageUrl] = useState();
  const [recipeImageUrl, setRecipeImageUrl] = useState();
  useEffect(() => {
    if (isFocused) {
      axios
        .get("stale-food")
        .then((response) => {
          setStaleItems(Number(response.data.length));
        })
        .catch((error) => {
          console.log("Unable to fetch stale items");
          console.log(error.response);
        });
      axios
        .get("user-food-items/")
        .then((response) => {
          dispatch(modify({ listdata: response.data.food_items }));
        })
        .catch((error) => {
          console.log("Unable to fetch recipes");
          console.log(error.response);
        });
      axios
        .get("image")
        .then((response) => {
          setImageUrl({ uri: response.data[response.data.length - 1].image });
        })
        .catch((error) => {
          console.log("Unable to fetch image");
        });
      axios
        .get("prev-recipes/")
        .then((response) => {
          console.log(response.data);
          setRecipeImageUrl(response.data[0].recipe_image_url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth, isFocused]);

  return (
    <View style={styles.dashContainer}>
      {/* <Text style={styles.titleText}>Dashboard</Text> */}
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={() => {
          navigation.navigate("Fridge Preview");
        }}
      >
        {imageUrl ? (
          <Image source={imageUrl} style={styles.cameraFeed} />
        ) : (
          <LoadingView />
        )}
      </TouchableOpacity>
      <View style={styles.graphContainer}>
        <Card
          data={{
            graphData: [
              { quarter: 1, earnings: 20 },
              { quarter: 2, earnings: 28 },
              { quarter: 3, earnings: 45 },
              { quarter: 4, earnings: 40 },
              { quarter: 5, earnings: 30 },
            ],
            graphOrientation: "horizontal",
          }}
          titleText={"Nutritional Details of recipes"}
        ></Card>
        <Card
          data={{
            graphData: [
              { quarter: 1, earnings: 20 },
              { quarter: 2, earnings: 28 },
              { quarter: 3, earnings: 45 },
              { quarter: 4, earnings: 40 },
              { quarter: 5, earnings: 30 },
            ],
            graphOrientation: "vertical",
          }}
          titleText={"Temperature"}
        ></Card>
      </View>
      <View style={styles.graphContainer}>
        <View style={styles.smallContainer}>
          {/* TODO : API Integration for value */}
          <Card height={"50%"} titleText={"No of times Opened"} indicator={5} />
          <Card
            height={"50%"}
            indicator={staleItems}
            titleText={"Stale Items Found"}
          />
        </View>
        <Card list titleText={"Grocery List"} />
      </View>

      {/* <Card  height={'50%'} titleText={"Recipes Ready to Prepare"} indicator={11} image={true}/> */}
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={() => {
          navigation.navigate("Recipes");
        }}
      >
        {/* <Image
        
          source={require("../../../assets/Dashboard/Pasta.png")}
          
        /> */}
        <Image
          style={styles.cameraFeedBottom}
          source={{ uri: recipeImageUrl }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dashContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
    height: "95%",
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  touchableArea: {
    height: "20%",
    marginTop: 10,
  },
  cameraFeed: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  cameraFeedBottom: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  graphContainer: {
    flexDirection: "row",
    paddingTop: "1%",
    height: "30%",
  },
  smallContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
export default Dashboard;
