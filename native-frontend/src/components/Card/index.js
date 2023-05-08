import { View, Text, Image, FlatList, Pressable } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const Card = (props) => {
  console.log(
    "received",
    props?.indicator,
    props?.indicator >= 0 ? true : null
  );
  const navigation = useNavigation();
  const listdata = useSelector((state) => state.glist.listdata);

  return (
    <Pressable
      style={{ ...styles.card, height: props.height }}
      onPress={() => {
        navigation.navigate("Grocery List");
      }}
    >
      <View>
        <Text style={styles.cardTitle}>{props.titleText}</Text>
        {props.data.graphData && (
          <View>
            <VictoryChart
              horizontal={props.data.graphOrientation === "horizontal"}
              //TODO change
              height={180}
              width={180}
              theme={VictoryTheme.material}
            >
              <VictoryBar
                barRatio={1.6}
                style={{ data: { fill: "#6200EE" } }}
                data={props.data.graphData}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryLabel dy={30} />}
              />

              <VictoryAxis
                style={{
                  axis: { stroke: "none" },
                  ticks: { stroke: "none" },
                  tickLabels: { fill: "none" },
                  grid: { stroke: "transparent" },
                }}
              />
              <VictoryAxis
                style={{
                  axis: { stroke: "none" },
                  ticks: { stroke: "none" },
                  tickLabels: { fill: "none" },
                  grid: { stroke: "transparent" },
                }}
              />
            </VictoryChart>
          </View>
        )}

        {props?.indicator >= 0 ? (
          <Text style={styles.indicator}>{props?.indicator}</Text>
        ) : null}
        {props?.descriptor ? <Text style={styles.indicator}>Hello</Text> : null}

        {props?.image && (
          <Image
            style={styles.foodItem}
            source={require("../../../assets/Dashboard/Pasta.png")}
          />
        )}
        {props.list && (
          <FlatList
            style={{ paddingLeft: 10, color: "#6200EE" }}
            data={listdata.map((obj) => {
              return { key: obj.item_name };
            })}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text>{"\u2B24"}</Text>
                  <Text style={{ fontSize: 20 }}>{" " + item.key + " "}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </Pressable>
  );
};
Card.defaultProps = {
  data: { graphOrientation: "vertical" },
};

export default Card;
