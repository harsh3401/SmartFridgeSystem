import { View,StyleSheet,Text,FlatList} from "react-native"
import { Chip } from 'react-native-paper';
import { Divider,Button, FAB ,Snackbar } from 'react-native-paper';
import { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import listSlice, { modify } from "../../slice/listSlice"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import axios from 'axios'
const GroceryList=(props)=>{

const navigation=useNavigation()
const dispatch=useDispatch()
const listState=useSelector((state)=>state.glist.listdata)
console.log("List",listState)

const [snackData,setSnackData]=useState('')
const [snackVis,setSnackVis]=useState(false)
const [lastData,setLastData]=useState(listState?.listdata)

const addItem=(data,)=>{

}


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
          data={listState}
          renderItem={({ item }) => {
            return (
                <View>
              <View style={{ flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',paddingTop:10,paddingBottom:10}}>
                <Button  onPress={()=>{
                  navigation.navigate('EditGList',{obj:item})
                }} labelStyle={{fontSize:30}} icon={'plus-circle-outline'}></Button>
                <Text style={{ fontSize: 20 }}>{item.item_name}</Text>
                <Button  onPress={()=>{
     
                  var list=[...listState]
                  setLastData(list)
                  list=list.filter((obj)=>{
                    console.log(obj)
                    if(obj.item_name===item.item_name)
                    {
                      return false
                    }
                    return true
                  })
                
                  axios.delete('/user-food-items/',{
                    data:{food_items:[item.id]}
                  }).then((response) => {
                    dispatch(modify({listdata:list}))
                    setSnackData(`${item.item_name} was deleted`)
                    setSnackVis(true)
                  }).catch((error) =>{
                    console.log(error)
                    setSnackData(`Unable to delete item`)
                    setSnackVis(true)
                  })
                
                }} labelStyle={{fontSize:30}} icon={'delete'}></Button>
              </View>
              <Divider/>
              </View>
            );
          }}
        />
          <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => {
      navigation.navigate('EditGList',{listdata:listState})
    }}
    label={'ADD ITEM'}
    size={'small'}

  />
  <Snackbar
        visible={snackVis}
        onDismiss={()=>{setSnackVis(false)}}
        action={{
          label: 'Undo',
          onPress: () => {

            dispatch(modify({listdata:lastData}))
        setSnackVis(false)
          },
        }}>
        {snackData}
      </Snackbar>
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