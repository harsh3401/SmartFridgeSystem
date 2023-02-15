import { View ,Text,Image,FlatList, Pressable} from "react-native";
import { VictoryAxis,VictoryBar,VictoryChart,VictoryTheme } from "victory-native";
import styles from "./styles"
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const Card=(props)=>{

  const navigation = useNavigation();
  const listdata = useSelector((state)=>state.glist.listdata)

    return <Pressable onPress={()=>{navigation.navigate("GList")}}><View style={{...styles.card,height:props.height}}>

<Text style={styles.cardTitle}>{props.titleText}</Text>
{props.data.graphData && <VictoryChart 
horizontal={props.data.graphOrientation==='horizontal'}
height={200} width={200} theme={VictoryTheme.material}>
          <VictoryBar    barRatio={1.6} style={{data: { fill: "#6200EE" }}}data={props.data.graphData} x="quarter" y="earnings" />
          <VictoryAxis   style={ {    axis: { stroke: 'none' },
    ticks: { stroke: 'none' },
    tickLabels: { fill: 'none' },
    grid: { stroke: 'transparent' }}}/>
          <VictoryAxis   style={{    axis: { stroke: 'none' },
    ticks: { stroke: 'none' },
    tickLabels: { fill: 'none' },
    grid: { stroke: 'transparent' }}}/>
        </VictoryChart>}
    
        <Text style={styles.indicator}>{props?.indicator}</Text>
 
        {props?.image&&<Image style={styles.foodItem} source={require('../../../assets/Dashboard/Pasta.png')}/>}
        {props.list&&<FlatList
        style={{paddingLeft:10,color:'#6200EE'}}
          data={
            listdata.map((obj)=>{return {key:obj.item_name}})}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 20 }}>{item.key}</Text>
              </View>
            );
          }}
        />}
        </View>
        </Pressable>
}
Card.defaultProps = {
    data:{graphOrientation:'vertical'}
  };

  
export default Card