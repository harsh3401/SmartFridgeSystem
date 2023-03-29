import React from 'react'
import {View, Image} from 'react-native'
import { ListItem, Avatar, Text } from "@react-native-material/core";
const RecipeTile = ({imageSrc, recipeName, recipeIngredients, prepTime}) => {

  return (
    <View >
        <ListItem
            leadingMode="avatar"
            leading={
                <Image style={{height:55, width:55}} source={{ uri: imageSrc }} />
            }
            title={recipeName}
            secondaryText={recipeIngredients}
            trailing={
                <Text style={{fontSize:10}}>{prepTime}</Text>
            }
        />
    </View>
  )
}

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

export default RecipeTile