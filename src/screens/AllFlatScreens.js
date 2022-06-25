import React, { Component } from "react";
import {
   View,
   Text,
   Button,
   ActivityIndicator,
   TextInput,
   FlatList,
   Platform,
   StyleSheet,
   Pressable,
   TouchableOpacity,
   Dimensions,
   RefreshControl,
   Keyboard,
   TouchableWithoutFeedback,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import s from "../style";
import { useNavigation } from "@react-navigation/native";
import { render } from "react-dom";

import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
   try {
      const jsonValue = await AsyncStorage.getItem("@storage_settings");
      if (jsonValue !== null) {
         // value previously stored
         //console.log("notn + " + JSON.parse(jsonValue).image_size);
         return JSON.parse(jsonValue);
      } else {
         console.log("n");
      }
   } catch (e) {
      // error reading value
      console.log(e);
   }
};

const ios = Platform.OS === "ios";

const btns = [
   {
      name: "Фильмы",
      link: "movies",
   },

   {
      name: "Сериалы",
      link: "tv-series",
   },
   {
      name: "Аниме",
      link: "animes",
   },
   {
      name: "Аниме-сериалы",
      link: "anime-tv-series",
   },
   {
      name: "ТВ-шоу",
      link: "show-tv-series",
   },
];

const isPortrait = () => {
   const dim = Dimensions.get("screen");
   return dim.height >= dim.width;
};

class AllFlatItems extends Component {
   constructor(props) {
      super(props);
      this.state = {
         prot: isPortrait() ? true : false,
         routeparams: props.route.params,
         data: [],
         deviceHeight: 0,
         deviceWidth: 0,
         page: 1,
         loading: true,
         refreshing: false,
      };

      Dimensions.addEventListener("change", () => {
         this.setState({
            prot: isPortrait() ? true : false,
         });
      });
   }

   handleRefreshing = () => {
      this.setState({ data: [], refreshing: true, page: 1 }, () => {
         this.searchFilms("", false, "refresh");
      });
   };

   async searchFilms(text, search = false, type) {
      this.setState({ loading: true });
      var url = "";
      if (search == true) {
         url =
            "https://videocdn.tv/api/" +
            this.state.routeparams.typescreen +
            "?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=released&direction=desc&limit=20&field=title&query=" +
            text;
      } else {
         url =
            "https://videocdn.tv/api/" +
            this.state.routeparams.typescreen +
            "?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=released&direction=desc&limit=20&page=" +
            this.state.page;
      }
      let settings = await getData();

      let image_links = {
         0: "film/",
         1: "film_iphone/iphone360_",
         2: "film_big/",
      };

      return fetch(url)
         .then((response) => response.json())
         .then((json) => {
            var data1 = [];
            json.data.forEach((entry) => {
               let uri =
                  "http://st.kp.yandex.net/images/" +
                  (settings?.image_size
                     ? image_links[settings.image_size]
                     : image_links[2]) +
                  entry.kinopoisk_id +
                  ".jpg";
               data1.push({
                  id: entry.id,
                  uri: uri,
                  title: entry.ru_title,
                  kp_id: entry.kinopoisk_id,
                  quality: entry.media[0]?.source_quality || " - ",
                  year: this.state.routeparams.typescreen.includes("tv-series")
                     ? entry.start_date.split("-")[0]
                     : entry.year.split("-")[0],
                  frame: entry.iframe,
               });
            });

            if (search == true) {
               this.setState({ data: data1 });
            } else {
               //alert(type)
               this.setState({
                  data: this.state.data.concat(data1),
                  refreshing: false,
               });
            }

            this.setState({ loading: false });
         })
         .catch((error) => {
            console.log(error);
         });
   }

   componentDidMount() {
      this.searchFilms("");
   }

   render() {
      return (
         <View
            onPress={Keyboard.dismiss}
            style={{ flex: 1, backgroundColor: "#100e19" }}
         >
            <View
               style={{
                  paddingHorizontal: this.state.prot ? 25 : 55,
               }}
            >
               <TextInput
                  editable
                  maxLength={40}
                  placeholder="Поиск"
                  placeholderTextColor={"#ddd"}
                  keyboardAppearance="dark"
                  onChangeText={(text) => {
                     this.searchFilms(text, true, "input");
                  }}
                  keyboardType="default"
                  style={{
                     marginTop: ios ? (this.state.prot ? 50 : 20) : 10,
                     borderWidth: 4,
                     borderRadius: 10,
                     color: "#fff",
                     fontSize: 18,
                     borderColor: "#1f1b2e",
                     padding: ios ? 15 : 10,
                     fontWeight: "bold",
                  }}
               ></TextInput>
            </View>
            <View
               style={{
                  backgroundColor: "#100e19",
                  paddingVertical: 15,
                  paddingHorizontal: this.state.prot ? 25 : 55,
               }}
            >
               <FlatList
                  data={btns}
                  horizontal={true}
                  renderItem={({ item }) => (
                     <Pressable
                        style={{
                           alignItems: "center",
                           justifyContent: "center",
                           paddingVertical: 12,
                           paddingHorizontal: 32,
                           borderRadius: 4,
                           elevation: 3,
                           marginRight: 8,
                           backgroundColor:
                              this.state.routeparams.typescreen == item.link
                                 ? "#5b3553"
                                 : "#1f1b2e",
                        }}
                        onPress={() => {
                           this.state.page = 1;
                           this.state.data = [];
                           this.state.routeparams.typescreen = item.link;
                           this.searchFilms("");
                        }}
                     >
                        <Text style={styles.text}>{item.name}</Text>
                     </Pressable>
                  )}
                  keyExtractor={(item) => item.name}
               />
            </View>
            <View
               style={{
                  flex: 1,
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <ActivityIndicator
                  size="large"
                  color="rgb(70 ,48, 235)"
                  style={{ position: "absolute" }}
                  hidesWhenStopped={true}
                  animating={this.state.loading}
               />

               {this.state.prot ? (
                  <FlatList
                     key={"_"}
                     style={{ backgroundColor: "#100e19" }}
                     data={this.state.data}
                     onEndReachedThreshold={0.5}
                     refreshing={this.state.refreshing}
                     onRefresh={this.handleRefreshing}
                     onEndReached={() => {
                        this.setState({ page: this.state.page + 1 }, () => {
                           this.searchFilms("", false, "end");
                        });
                     }}
                     numColumns={2}
                     renderItem={({ item }) => {
                        return (
                           <TouchableWithoutFeedback
                              activeOpacity={1}
                              key={item.id}
                              onPress={() => {
                                 var p = item.frame
                                    .toString()
                                    .replace("\\", "")
                                    .replace("//", "https://")
                                    .replace("640", "100%")
                                    .replace("480", "100%");
                                 this.props.navigation.navigate("Player", {
                                    frame: p,
                                 });
                              }}
                           >
                              <View
                                 style={{
                                    width: this.state.prot
                                       ? Dimensions.get("window").width * 0.45
                                       : Dimensions.get("window").width * 0.25,
                                    padding: 5,
                                    marginLeft: 10,
                                    height: this.state.prot
                                       ? Dimensions.get("window").height * 0.3
                                       : Dimensions.get("window").height * 0.7,
                                 }}
                              >
                                 <ImageBackground
                                    source={{ uri: item.uri }}
                                    style={{
                                       resizeMode: "stretch",
                                       backgroundColor: "#1f1b2e",
                                       borderTopLeftRadius: 12,
                                       borderTopRightRadius: 12,
                                       flex: 1,
                                    }}
                                    imageStyle={{ borderRadius: 12 }}
                                 >
                                    <View style={s.filmText}>
                                       <Text
                                          style={{
                                             color: "white",
                                             fontWeight: "bold",
                                             fontSize: 11,
                                          }}
                                       >
                                          {item.title}
                                       </Text>
                                    </View>
                                    <View
                                       style={{
                                          position: "absolute",
                                          backgroundColor: "#343c44",
                                          bottom: 0,
                                          marginLeft: 0,
                                          overflow: "hidden",
                                          left: 0,
                                          padding: 8,
                                          borderBottomLeftRadius: 12,
                                          borderTopRightRadius: 12,
                                       }}
                                    >
                                       <Text
                                          style={{
                                             color: "white",
                                             fontWeight: "bold",
                                             fontSize: 11,
                                          }}
                                       >
                                          {item.quality.toUpperCase()}
                                       </Text>
                                    </View>
                                    <View style={s.filmTextRight}>
                                       <Text style={{ color: "black" }}>
                                          {item.year}
                                       </Text>
                                    </View>
                                 </ImageBackground>
                              </View>
                           </TouchableWithoutFeedback>
                        );
                     }}
                     keyExtractor={(item) => item.id}
                  />
               ) : (
                  <FlatList
                     key={"#"}
                     columnWrapperStyle={{ justifyContent: "space-between" }}
                     style={{ backgroundColor: "#100e19" }}
                     data={this.state.data}
                     onEndReachedThreshold={0.5}
                     refreshing={this.state.refreshing}
                     onRefresh={this.handleRefreshing}
                     onEndReached={() => {
                        this.setState({ page: this.state.page + 1 }, () => {
                           this.searchFilms("", false, "end");
                        });
                     }}
                     numColumns={4}
                     renderItem={({ item }) => {
                        return (
                           <TouchableWithoutFeedback
                              activeOpacity={1}
                              key={item.id}
                              onPress={() => {
                                 var p = item.frame
                                    .toString()
                                    .replace("\\", "")
                                    .replace("//", "https://")
                                    .replace("640", "100%")
                                    .replace("480", "100%");
                                 this.props.navigation.navigate("watch", {
                                    frame: p,
                                 });
                              }}
                           >
                              <View
                                 style={{
                                    width: Dimensions.get("window").width * 0.2,
                                    height:
                                       Dimensions.get("window").height * 0.7,
                                    margin: 10,
                                 }}
                              >
                                 <ImageBackground
                                    source={{ uri: item.uri }}
                                    style={{
                                       resizeMode: "stretch",
                                       backgroundColor: "#1f1b2e",
                                       borderTopLeftRadius: 12,
                                       borderTopRightRadius: 12,
                                       flex: 1,
                                    }}
                                    imageStyle={{ borderRadius: 12 }}
                                 >
                                    <View style={s.filmSearchText}>
                                       <Text
                                          style={{
                                             color: "white",
                                             fontSize: 15,
                                             fontWeight: "bold",
                                          }}
                                       >
                                          {item.title} {item.year}
                                       </Text>
                                    </View>
                                 </ImageBackground>
                              </View>
                           </TouchableWithoutFeedback>
                        );
                     }}
                     keyExtractor={(item) => item.id}
                  />
               )}
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      marginRight: 8,
      backgroundColor: "#192a56",
   },
   text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
   },
});
export default AllFlatItems;
