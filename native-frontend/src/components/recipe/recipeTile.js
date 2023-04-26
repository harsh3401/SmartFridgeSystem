import React from "react";
import { View, Image } from "react-native";
// import { Button } from "react-native-paper";
import { ListItem, Avatar, Text } from "@react-native-material/core";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
const RecipeTile = ({
  imageSrc,
  recipeName,
  recipeIngredients,
  prepTime,
  id,
  recipe,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <ListItem
        leadingMode="avatar"
        leading={
          <Image style={{ height: 55, width: 55 }} source={{ uri: imageSrc }} />
        }
        title={recipeName.charAt(0).toUpperCase() + recipeName.slice(1)}
        secondaryText={recipeIngredients.map((element, index) => {
          if (index == recipeIngredients.length - 1) {
            return element.charAt(0).toUpperCase() + element.slice(1) + ".";
          } else {
            return element.charAt(0).toUpperCase() + element.slice(1) + " , ";
          }
        })}
        trailing={
          <View style={{ width: 40, height: 40 }}>
            <Text style={{ fontSize: 10 }}>{prepTime + "M"}</Text>
            <Button
              style={{ backgroundColor: "purple", width: 40, fontSize: 5 }}
              onPress={() => {
                console.log(recipe);
                navigation.navigate("RecipeDetail", recipe);
              }}
              title="->"
            />
          </View>
        }
      />
    </View>
  );
};

// styles = {
//     'tile':{

//     },
//     'imgView':{

//     },
//     'contentView':{

//     },
//     'timeView':{

//     },
//     'titleView':{

//     },
//     'ingView':{

//     }
// }

export default RecipeTile;
