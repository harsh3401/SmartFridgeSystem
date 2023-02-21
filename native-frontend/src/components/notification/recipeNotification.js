import React from 'react'
import {View, Image} from 'react-native'
import { ListItem, Avatar, Text } from "@react-native-material/core";

const RecipeNotification = ({imageSrc, titleText, subText, created_at }) => {
  return (
    <View >
        <ListItem
            leadingMode="avatar"
            leading={
                <Image style={{height:55, width:55}} source={{ uri: imageSrc }} />
            }
            title={titleText}
            secondaryText={subText}
            trailing={
              <Text style={{fontSize:10}}>{created_at}</Text>
            }
        />
    </View>
  )
}

export default RecipeNotification