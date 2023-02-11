import { View,Button,StyleSheet,Text,TextInput} from "react-native"
import { useState } from "react"
import { Divider,Chip,IconButton } from "react-native-paper"


const EditItem=()=>{

    const [itemName,setItemName] = useState("")

    return <View style={styles.dashContainer}> 
    <View style={styles.topHalf}>
        <View style={styles.buttonContainer}>
            <Button color={'#e7e7f9'} title="Cancel" />
            <Button color={'#e7e7f9'} title="Done"/>
            
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
                <View  style={{borderWidth:1,borderColor:"#a1a0e8",width:"15%",borderRadius:"3 "}}>
                   <Button
                    title="+"
                    color='#a1a0e8'
                    style={{ fontSize:10}}
                    />
                </View>
                <View  style={{borderWidth:1,borderColor:"#a1a0e8",width:"15%",borderRadius:"3 "}}>
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
        borderWidth: 2,
        paddingTop:'15%',
        paddingLeft:'5%',
        paddingRight:'5%',
    },
    dashContainer:{
     
        height:'95%',
        justifyContent: 'flex-start',
        

    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
 
    },
    categoryChip:
    {
        padding:"1%",
        backgroundColor:"#ffffff",
        fontColor:"#000000",
        borderRadius:"50px",
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