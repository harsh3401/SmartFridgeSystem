import React from "react";
import { View, Image } from "react-native";
import { Button } from "react-native-paper";
import { ListItem, Avatar, Text } from "@react-native-material/core";
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
        title={recipeName}
        secondaryText={recipeIngredients}
        trailing={
          <View>
            <Text style={{ fontSize: 10 }}>{prepTime}</Text>
            <Button
              style={{ backgroundColor: "purple" }}
              onPress={() => {
                console.log(recipe);
                navigation.navigate("RecipeDetail", recipe);
              }}
            >
              G
            </Button>
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
