import React from 'react'
import {View} from 'react-native'
import { List } from 'react-native-paper';
const WarningNotification = ({warningTitle, warningDesc}) => {
  return (
    <View>
        <List.Item
        title={warningTitle}
        titleStyle={{color:'red'}}
        description={warningDesc}
        descriptionStyle={{color:'grey'}}
        />
    </View>
  )
}

export default WarningNotification