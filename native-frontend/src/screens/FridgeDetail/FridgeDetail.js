import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { Button as BButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
const FridgeDetail = () => {
  const [ogimage, setOgImage] = useState();
  const [dtimage, setDtImage] = useState();
  const [fetch, setFetch] = useState(0);
  const [arduinoStatus, setArduinoStatus] = useState(false);
  const isFocused = useIsFocused();
  setInterval(() => {
    fetchImage();
  }, 30000);
  const fetchImage = () => {
    axios
      .get("hardware-image")
      .then((response) => {
        setArduinoStatus(true);
      })
      .catch((error) => {
        setArduinoStatus(false);
        console.log("Unable to fetch image");
      });

    // useEffect(() => {

    // }, []);
    // console.log("here");
    // // axios
    // //   .get("hardware-image")
    // //   .then(() => {
    // //     setFetch((fetch) => {
    // //       return fetch + 1;
    // //     });
    // //   })
    // //   .catch((err) => {
    // //     console.log("Unable to capture image arduino unavailable");
    // //   });

    // // setFetch((fetch) => {
    // //   return fetch + 1;
    // // });
    // const uninterceptedAxiosInstance = axios.create();
    // uninterceptedAxiosInstance
    //   .get("http://192.168.164.231/capture")
    //   .then((response) => {
    //     setOgImage({ uri: "http://192.168.164.231/saved-photo" });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // setArduinoStatus(true);
  };
  useEffect(() => {
    if (isFocused) {
      axios
        .get("hardware-image")
        .then((response) => {
          setArduinoStatus(true);
        })
        .catch((error) => {
          setArduinoStatus(false);
          console.log("Unable to fetch image");
        });
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 2,
        }}
      >
        <Text style={styles.titleText}>Actual Image</Text>
      </View>

      <TouchableOpacity style={styles.touchableArea} onPress={() => {}}>
        {ogimage ? (
          <Image source={ogimage} style={styles.cameraFeed} />
        ) : (
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/016/808/173/small/camera-not-allowed-no-photography-image-not-available-concept-icon-in-line-style-design-isolated-on-white-background-editable-stroke-vector.jpg",
            }}
            style={styles.cameraFeed}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.titleText}>Objects Identified</Text>
      <TouchableOpacity style={styles.touchableArea} onPress={() => {}}>
        {dtimage ? (
          <Image source={dtimage} style={styles.cameraFeed} />
        ) : (
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/016/808/173/small/camera-not-allowed-no-photography-image-not-available-concept-icon-in-line-style-design-isolated-on-white-background-editable-stroke-vector.jpg",
            }}
            style={styles.cameraFeed}
          />
        )}
      </TouchableOpacity>
      {/* <View style={[{ width: "90%", marginLeft: "5%", marginLeft: "5%" }]}>
        <Button
          onPress={fetchImage}
          color={"purple"}
          title={"Get Latest Image"}
        />
      </View> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Device Status:</Text>
        <BButton
          textColor={arduinoStatus ? "white" : "black"}
          buttonColor={arduinoStatus ? "green" : "red"}
        >
          {arduinoStatus ? "Online" : "Offline"}
        </BButton>
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
