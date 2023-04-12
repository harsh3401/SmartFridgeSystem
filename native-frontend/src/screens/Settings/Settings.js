import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Avatar } from "react-native-paper";
import Tile from "../../components/Tile";
import { signOut } from "../../services/firebase/signOut";
import { useSelector } from "react-redux";

const Settings = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <View style={styles.dashContainer}>
      <View style={styles.topContainer}>
        {/* <Text style={styles.titleText}>Settings</Text> */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Avatar.Image
            size={60}
            source={require("../../../assets/avatar.png")}
          />
          <View style={styles.headerContent}>
            <Text style={styles.proftext}>
              {auth.email.split("@")[0].toUpperCase()}
            </Text>
            <Text>{auth.email}</Text>
          </View>
          <Button
            onPress={() => {
              signOut();
            }}
          >
            <Text style={{ color: "purple", margin: 10 }}>Sign out</Text>
          </Button>
        </View>
      </View>
      <View>
        <ScrollView>
          <Text style={styles.separator}>NOTFICATIONS</Text>
          <View>
            <Tile content={"Send push notification"} switch />
          </View>
          <Text style={styles.separator}>RECOMMENDATION SETTINGS</Text>
          <View>
            <Tile content={"Privacy Policy"} />
            <Tile content={"Model Data"} />
            <Tile content={"Reset Local Model"} />
            <Tile content={"Model Accuracy survey"} />
          </View>
          <Text style={styles.separator}>GENERAL</Text>
          <View>
            <Tile content={"Change Password"} />
            <Tile content={"Send staleness Updates"} switch />
            <Tile content={"Clear user data"} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashContainer: {
    height: "95%",
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  topContainer: {
    backgroundColor: "white",
    padding: "5%",
  },
  proftext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContent: {
    paddingLeft: "5%",
    paddingTop: "2.5%",
  },
  separator: {
    color: "#a4a4a7",
    marginTop: "5%",
    marginBottom: "2%",
    marginLeft: "2%",
  },
});

export default Settings;
