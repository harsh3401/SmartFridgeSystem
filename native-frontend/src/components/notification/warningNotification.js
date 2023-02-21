import React from 'react'
import {View} from 'react-native'
import { List } from 'react-native-paper';
const WarningNotification = ({warningTitle, warningDesc, created_at}) => {
  return (
    <View>
        <List.Item
        title={warningTitle}
        titleStyle={{color:'red'}}
        description={warningDesc}
        descriptionStyle={{color:'grey'}}
        right={props => <Text style={{fontSize:10}}>{created_at}</Text>}
        />
    </View>
  )
}

export default WarningNotification