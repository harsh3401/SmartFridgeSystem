import { View,StyleSheet,Text,TextInput} from "react-native"
import { useState } from "react"
import { Button } from "react-native-paper"
import { Divider,Chip,IconButton } from "react-native-paper"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { modify } from "../../slice/listSlice";
import axios from "axios"
const EditItem=(route)=>{

    const dispatch=useDispatch()
    console.log(route)
    const [itemName,setItemName] = useState(route.route.params?.hasOwnProperty('obj')?route.route.params.obj.key:"")
    const navigation=useNavigation()
    return <View style={styles.dashContainer}> 
    <View style={styles.topHalf}>
        <View style={styles.buttonContainer}>
        <Button textColor={'#e7e7f9'} title="Done" onPress={()=>{  navigation.navigate('Grocery List')}}>Cancel</Button>
        <Button textColor={'#e7e7f9'} onPress={()=>{
            console.log(route.route.params)
            var data=[...route.route.params.listdata]
            console.log("this",data)
            console.log(itemName.trim()!=='')
            if(itemName.trim()!=='')
            {
          
            console.log("request",{food_item:[{item_name:itemName,expiry_time:0}]})
            axios.post('/user-food-items/',{
                food_item:[{item_name:  itemName,expiry_time:0}]
              }).then((response) => {
                console.log(response.data);
                data.push({item_name:  itemName,...response.data})
                dispatch(modify({listdata:data}))
             
              }).catch((error) =>{


              })
          
            
        }   
            navigation.navigate('Grocery List')

        }} title="Done">Done</Button>
        </View>
       
            <Text style={{color: '#cacaf2',marginTop:10,marginBottom:5}}>ITEM NAME</Text>
            
            <TextInput
        editable
        multiline
        numberOfLines={4    }
        maxLength={40}
        onChangeText={text => setItemName(text) }
        value={itemName}
        style={{paddingLeft: 1,color:'white',fontWeight:'bold',fontSize:20}}
      />
      <Divider style={{color:'white',marginTop: 5,marginBottom:20}}/> 
      <Chip style ={styles.categoryChip} icon="food-apple" onPress={() => console.log('Pressed')}>Fruits</Chip>
        </View>
        <View style={styles.bottomHalf}>
            <View style={styles.valueDrawer}>
                <Text style={{  color:"#999999"}}>Qty</Text>
                <Text  style={{  marginLeft:'10%'}}>5</Text>
               <View style={{marginLeft:'50%',flexDirection:'row',width:'100%'}}>
                <View  style={{borderWidth:1,borderColor:"#a1a0e8",width:"15%",borderRadius:2}}>
                   <Button
                    title="+"
                    color='#a1a0e8'
                    style={{ fontSize:10}}
                    />
                </View>
                <View  style={{borderWidth:1,borderColor:"#a1a0e8",width:"15%",borderRadius:3}}>
                   <Button
                    title="-"
                    color='#a1a0e8'
                    style={{ fontSize:10}}
                    />
                </View>

                </View>
                

            </View>
            <Divider style={{color:'#999999'}}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    topHalf: {
       
        backgroundColor: '#5856d6',
        paddingLeft:'5%',
        paddingRight:'5%',
    },
    dashContainer:{
 
        height:'95%',
        justifyContent: 'flex-start',
        

    },
    buttonContainer:{
        marginTop:'15%',
        flexDirection:'row',
        justifyContent:'space-between',
 
    },
    categoryChip:
    {
        padding:"1%",
        backgroundColor:"#ffffff",
        fontColor:"#000000",
        // borderRadius:"50px",
        width:"30%",
        marginBottom:"5%"
    },
    valueDrawer:
    {
        flexDirection:"row",
        margin:"5%",
        justifyContent:"flex-start",
      
    }
})
export default EditItem