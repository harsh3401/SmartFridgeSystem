import { Divider, Spacer } from 'react-native-flex-layout';
import { useState } from 'react';
import {View,Text,Switch} from 'react-native';
import { IconButton } from 'react-native-paper';

const Tile = (props) => {
    const [isEnabled,setEnabled]=useState(false)
  return (
    <View style={{flexDirection:'column'}}>
       <View style={{flexDirection:'row',justifyContent: 'space-between', backgroundColor: 'white',padding:'2%',alignItems: 'center'}}>
        <Text style={{fontSize: 18}}>{props.content}</Text>
        {props.switch&&<Switch
        onValueChange={()=>{setEnabled(!isEnabled);}}
        value={isEnabled}
      />}
      {!props.switch&&<IconButton icon="chevron-right"></IconButton>}
    </View>
    <Divider />
    </View>
   

  )
}

export default Tile