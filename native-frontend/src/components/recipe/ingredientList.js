import React from "react";
import { View, FlatList, Text, Pressable, Image } from "react-native";
import { ListItem, Avatar, Flex } from "@react-native-material/core";
// import { Entypo, Octicons } from "@expo/vector-icons";
const IngredientList = ({ ingredients }) => {
  //ingredients = ['asldjflj','sjaslfjsljfsl','slfjsdlj','sjfsjflsjflsj']
  return (
    <View>
      {/* <View style={{marginTop:30, marginBottom:10}}>
        <Flex inline style={{minHeight:40}}>
            <Entypo style={{textShadowRadius:10, color:'#2F3337'}} name="arrow-long-right" size={30} color="black" />
            <Text style={{fontSize:25,textDecorationLine: 'underline', marginLeft:12,textShadowRadius: 5,textShadowColor: 'rgba(0, 0, 0, 0.75)',}}>Ingredients</Text>
        </Flex>
      </View> */}
      <FlatList
        data={ingredients}
        renderItem={(ingredient) => {
          return (
            <Flex inline style={{ height: 40, marginLeft: 20, elevation: 4 }}>
              {/* <Octicons name="dot-fill" size={24} color="black" /> */}
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontStyle: "italic",
                  marginLeft: 20,
                  textShadowRadius: 10,
                }}
              >
                {ingredient.item}
              </Text>
            </Flex>
          );
        }}
      />
    </View>
  );
};

export default IngredientList;
