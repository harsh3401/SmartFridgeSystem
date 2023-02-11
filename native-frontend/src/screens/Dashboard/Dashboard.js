import { View,Text,StyleSheet,Image } from "react-native"
import Card from "../../components/Card";

const Dashboard=()=>{

 
   
    return <View style={styles.dashContainer}>
        <Text style={styles.titleText}>Dashboard</Text>
        <Image source={require('../../../assets/Dashboard/camera-feed-mockup.jpeg')} style={styles.cameraFeed}/>
   
        <View style={styles.graphContainer}>
        <Card data={{graphData:[
    { quarter: 1, earnings: 20 },
    { quarter: 2, earnings: 28 },
    { quarter: 3, earnings: 45 },
    { quarter: 4, earnings: 40 },   
     { quarter: 5, earnings: 30 }
    
  ],graphOrientation:'horizontal'}} titleText={"Nutritional Details of recipes"}>
                
        </Card>
        <Card data={{graphData:[
    { quarter: 1, earnings: 20 },
    { quarter: 2, earnings: 28 },
    { quarter: 3, earnings: 45 },
    { quarter: 4, earnings: 40 },   
     { quarter: 5, earnings: 30 },
  ],graphOrientation:'vertical'}}titleText={"Temperature"}>
        </Card>
        </View>
        <View style={styles.graphContainer}>
            <View style={styles.smallContainer}>
            <Card height={'50%'} titleText={"No of times Opened"} indicator={5}/>
            <Card height={'50%'} indicator={5} titleText={"Stale Items Found"}/>
            </View>
            <Card list titleText={"Suggested Grocery"}/>
        </View>
    
            {/* <Card  height={'50%'} titleText={"Recipes Ready to Prepare"} indicator={11} image={true}/> */}
            <Image source={require('../../../assets/Dashboard/Pasta.png')} style={styles.cameraFeed}/>
   
 
    
    </View>

}

const styles=StyleSheet.create({
    dashContainer:{
        paddingTop:'15%',
        paddingLeft:'5%',
        paddingRight:'5%',
        height:'95%',
        justifyContent: 'flex-start',

    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
  
      },
      cameraFeed:{
        marginTop:10,
        width: '100%',
        height: '20%',
    
      },
      graphContainer:{
   
        flexDirection:'row',
        paddingTop:'1%',
        justifyContent:'space-between',
        height: '30%',

   
      }
   ,
      smallContainer:{
        justifyContent:'space-between',
        alignItems:'stretch',

      },
  
      
})
export default Dashboard