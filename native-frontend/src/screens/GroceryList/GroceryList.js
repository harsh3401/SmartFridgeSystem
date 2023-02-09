import { View,StyleSheet,Text,FlatList} from "react-native"
import { Chip } from 'react-native-paper';
import { Divider,Button, FAB  } from 'react-native-paper';
const GroceryList=(props)=>{

    return <View style={styles.dashContainer}>
        <View>
 <Text style={styles.titleText}>Grocery List</Text>
 </View>
 <View style={styles.chipDrawer}>
 <Chip style ={styles.categoryChip}icon="food" onPress={() => console.log('Pressed')}>Snacks</Chip>
 <Chip style ={styles.categoryChip} icon="food-apple" onPress={() => console.log('Pressed')}>Fruits</Chip>
 <Chip style ={styles.categoryChip} icon="food-steak" onPress={() => console.log('Pressed')}>Meats</Chip>
 </View>
 <FlatList
        style={{paddingTop:20,color:'#6200EE'}}
          data={[
            { key: 'Tomatoes' },
            { key: 'Potatoes' },
            { key: 'Butter' },
            { key: 'Milk' },
   
          ]}
          renderItem={({ item }) => {
            return (
                <View>
              <View style={{ flexDirection:'row',alignItems: 'center',paddingTop:10,paddingBottom:10}}>
                <Button  labelStyle={{fontSize:30}} icon={'plus-circle-outline'}></Button>
                <Text style={{ fontSize: 20 }}>{item.key}</Text>
              </View>
              <Divider/>
              </View>
            );
          }}
        />
          <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => console.log('Pressed')}
    label={'ADD ITEM'}
    size={'small'}

  />
    </View>
}

export default GroceryList

const styles=StyleSheet.create({
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',

      },
      dashContainer:{
        paddingTop:'15%',
        paddingLeft:'5%',
        paddingRight:'5%',
        height:'95%',
        justifyContent: 'flex-start',

    },
    chipDrawer:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    categoryChip:
    {
        margin:"3%"
    }
    

})