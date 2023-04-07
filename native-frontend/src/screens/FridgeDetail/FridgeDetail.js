import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
const FridgeDetail = () => {
  const [ogimage, setOgImage] = useState();
  const [dtimage, setDtImage] = useState();
  const isFocused = useIsFocused();
  const fetchImage = () => {
    axios.get("/");
  };
  useEffect(() => {
    if (isFocused) {
      axios
        .get("image")
        .then((response) => {
          console.log(response.data);
          setOgImage({ uri: response.data[response.data.length - 1].image });
          setDtImage({
            uri: response.data[response.data.length - 1].image_identified,
          });
        })
        .catch((error) => {
          console.log("Unable to fetch image");
        });
    }
  }, [isFocused]);
  return (
    <View>
      <Text style={styles.titleText}>Actual Image</Text>
      <TouchableOpacity style={styles.touchableArea} onPress={() => {}}>
        <Image source={ogimage} style={styles.cameraFeed} />
      </TouchableOpacity>
      <Text style={styles.titleText}>Objects Identified</Text>
      <TouchableOpacity style={styles.touchableArea} onPress={() => {}}>
        <Image source={dtimage} style={styles.cameraFeed} />
      </TouchableOpacity>
      <View style={[{ width: "90%", marginLeft: "5%", marginLeft: "5%" }]}>
        <Button
          onClick={fetchImage}
          color={"purple"}
          title={"Get Latest Image"}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
    height: "95%",
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "5%",
  },

  touchableArea: {
    margin: "5%",
    height: "30%",
    marginTop: 10,
  },
  cameraFeed: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  graphContainer: {
    flexDirection: "row",
    paddingTop: "1%",
    height: "30%",
  },
  smallContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
export default FridgeDetail;
