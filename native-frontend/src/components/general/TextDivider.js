import React from 'react'
import {View, Text} from 'react-native'
const TextDivider = ({text}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View>
        <Text style={{width: 50, textAlign: 'center', marginHorizontal:7}}>{text}</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
  )
}

export default TextDivider