import { View ,Text,Image} from "react-native";
import { VictoryAxis,VictoryBar,VictoryChart,VictoryTheme } from "victory-native";
import styles from "./styles"

const Card=(props)=>{
    return <View style={{...styles.card,height:props.height,}}>
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
        {props?.image&&<Image source={require('../../../assets/Dashboard/Pasta.png')}/>}
    </View>
}
Card.defaultProps = {
    data:{graphOrientation:'vertical'}
  };

  
export default Card