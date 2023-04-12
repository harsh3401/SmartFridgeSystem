import React from "react";
import { View, FlatList, Text, Pressable, Image } from "react-native";
import { ListItem, Avatar, Flex, Spacer } from "@react-native-material/core";
// import { Entypo, Octicons } from '@expo/vector-icons';
const StepsToPrepare = ({ stepstocook }) => {
  stepstocook = [
    "sjflsjflsj asfjl asldfjf qheo",
    "adoof asodufofen dshasohf oho8u",
    "flajf dsljfosfu hasoho fpea;jfohj ",
    "sjfsjflsjflsj fjspajdf johfoawo dlvosjfefu",
  ];
  return (
    <View>
      <View style={{ marginTop: 30, marginBottom: 10 }}>
        <Flex inline style={{ height: 40 }}>
          {/* <Entypo style={{textShadowRadius:10, color:'#2F3337'}} name="arrow-long-right" size={30} color="black" /> */}
          <Text
            style={{
              fontSize: 25,
              textDecorationLine: "underline",
              marginLeft: 12,
              textShadowRadius: 5,
              textShadowColor: "rgba(0, 0, 0, 0.75)",
            }}
          >
            Steps to prepare
          </Text>
        </Flex>
      </View>
      <FlatList
        data={stepstocook}
        renderItem={(step) => {
          return (
            <Flex
              inline
              style={{ minHeight: 40, marginLeft: 20, elevation: 4 }}
            >
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
                {step.item}
              </Text>
            </Flex>
          );
        }}
      />
    </View>
  );
};

export default StepsToPrepare;
