import { StyleSheet, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const stylesheet = StyleSheet.create({
   alwaysred: {
      backgroundColor: "red",
      height: 100,
      width: 100,
      justifyContent: "center",
   },
   cont: {
      flex: 1,
      alignItems: "flex-start",
      padding: 20,
   },
   titleText: {
      fontSize: 20,
      fontWeight: "bold",
   },
   filmitem: {
      borderRadius: 10,
   },
   container: {
      flex: 1,
      backgroundColor: "#100e19",
   },
   statusBar: {
      height: 40,
   },
   appBar: {
      backgroundColor: "#79B45D",
      height: 20,
   },
   content: {
      flex: 1,
      backgroundColor: "#33373B",
   },
   title: {
      paddingHorizontal: 20,
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
   },
   buttonText: {
      color: "white",
   },
   filmText: {
      marginLeft: 0,
      maxWidth: deviceWidth * 0.5,
      backgroundColor: "#1f1b2e",
      padding: 8,
      position: "absolute",
      borderTopLeftRadius: 12,
      borderBottomRightRadius: 12,
   },
   filmTextRight: {
      marginLeft: "auto",
      marginRight: -1,
      marginBottom: 0,
      marginTop: "auto",
      backgroundColor: "#fff",
      color: "#000",
      padding: 8,
      borderTopLeftRadius: 12,
      borderBottomRightRadius: 12,
   },
   video: {
      marginTop: 20,
      maxHeight: 200,
      height: 200,
      width: 320,
      flex: 1,
   },
   containerd: {
      flex: 1,
      alignItems: "center",
      paddingTop: 15,
      backgroundColor: "black",
      overflow: "hidden",
   },
   loading: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
   },
   filmSearchText: {
      backgroundColor: "#100e19",
      color: "white",
      textAlign: "center",
      marginBottom: 0,
      maxWidth: deviceWidth * 0.4,
      padding: 8,
      fontWeight: "bold",
      borderBottomRightRadius: 10,
      opacity: 0.65,
   },
});

export default stylesheet;
