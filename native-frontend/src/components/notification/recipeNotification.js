import React from 'react'
import {View, Image} from 'react-native'
import { ListItem, Avatar, Text } from "@react-native-material/core";

const RecipeNotification = ({imageSrc, titleText, subText }) => {
  return (
    <View >
        <ListItem
            leadingMode="avatar"
            leading={
                <Image style={{height:55, width:55}} source={{ uri: imageSrc }} />
            }
            title={titleText}
            secondaryText={subText}
        />
    </View>
  )
}

export default RecipeNotification