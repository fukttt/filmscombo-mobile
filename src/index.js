import React, { useEffect, useState } from "react";
import {
   View,
   Text,
   Pressable,
   Modal,
   Linking,
   FlatList,
   ScrollView,
   SafeAreaView,
   StatusBar,
   TouchableOpacity,
   Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import s from "./style";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import MainSlider from "./components/MainSlider";

import AllFlatScreens from "./screens/AllFlatScreens";
import PlayerScreen from "./screens/playerscreen";
import SettingsScreen from "./screens/SettingsScreen";
import { expo } from "../app.json";
import * as Analytics from "expo-firebase-analytics";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TitleText = (props) => {
   return (
      <TouchableOpacity
         onPress={() => {
            !props.link
               ? props.navigation.navigate("search", { typescreen: "animes" })
               : null;
         }}
      >
         <View
            style={{
               flex: 1,
               justifyContent: "space-between",
               paddingVertical: 20,
               paddingHorizontal: 20,
               flexDirection: "row",
               alignItems: "center",
            }}
         >
            <View
               style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "flex-start",
               }}
            >
               <Ionicons name={props.icon} size={24} color="white" />
               <Text style={s.title}>{props.title}</Text>
            </View>
            {!props.link ? (
               <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="white"
                  style={{ marginRight: 15 }}
               />
            ) : null}
         </View>
      </TouchableOpacity>
   );
};

const onSwipeLeft = (nav) => {
   nav.navigate("films");
};

const isPortrait = () => {
   const dim = Dimensions.get("screen");
   return dim.height >= dim.width;
};

const HomeScreen = (props, { navigation }) => {
   const btns = [
      {
         id: 1,
         link: "https://t.me/filmscombo",
         icon: <FontAwesome name="telegram" size={38} color="white" />,
      },

      {
         id: 2,
         link: "https://github.com/fukttt/filmscombo-mobile",
         icon: <FontAwesome name="github" size={38} color="white" />,
      },
      {
         id: 3,
         name: expo.version,
      },
   ];

   Dimensions.addEventListener("change", () => {
      setprot(isPortrait() ? true : false);
   });
   const [prot, setprot] = useState(isPortrait() ? true : false);
   const [modalVisible, setmodalVisible] = useState(false);
   const [modalText, setModalText] = useState(
      "Текст внутри.\nВозможно произошел какой-то сбой, сообщи разработчику об этом !"
   );

   clearAll = async () => {
      try {
         await AsyncStorage.clear();
      } catch (e) {
         // clear error
      }

      console.log("Done.");
   };
   useEffect(() => {
      // clearAll();
      var semver = require("semver");
      fetch(
         "https://raw.githubusercontent.com/fukttt/filmscombo-mobile/master/app.json"
      )
         .then((response) => response.json())
         .then((json) => {
            if (semver.gt(json.expo.version, expo.version)) {
               setmodalVisible(true);
               setModalText(
                  "Юхууу!\nДоступна новая версия приложения - " +
                     json.expo.version +
                     "!\nУстановленная на данный момент - " +
                     expo.version
               );
            }
         })
         .catch((error) => {
            alert(error);
         });
      Analytics.logEvent("screen_view", "Home").then(() => {});
   }, []);

   return (
      <SafeAreaView style={s.container}>
         <StatusBar hidde />
         <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               setModalVisible(!modalVisible);
            }}
         >
            <View
               style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1f1b2e",
               }}
            >
               <Text
                  style={{
                     fontWeight: "bold",
                     textAlign: "center",
                     fontSize: 18,
                     color: "#fff",
                  }}
               >
                  {modalText}
               </Text>
               <View
                  style={{
                     flex: 1 / 6,
                     padding: 10,
                     alignItems: "center",
                     justifyContent: "center",
                     flexDirection: "row",
                     flexWrap: "wrap",
                  }}
               >
                  <Pressable
                     style={{
                        borderRadius: 10,
                        padding: 15,
                        elevation: 2,
                        backgroundColor: "#673147",
                     }}
                     onPress={() => {
                        Linking.openURL(
                           "https://github.com/fukttt/filmscombo-mobile/releases"
                        );
                     }}
                  >
                     <Text
                        style={{
                           textAlign: "center",
                           color: "#fff",
                        }}
                     >
                        <Ionicons
                           name="cloud-download-outline"
                           size={15}
                           color="#fff"
                        />{" "}
                        Скачать
                     </Text>
                  </Pressable>
                  <Pressable
                     style={{
                        marginLeft: 5,
                        borderRadius: 10,
                        padding: 15,
                        elevation: 2,
                        backgroundColor: "#100e19",
                     }}
                     onPress={() => setmodalVisible(false)}
                  >
                     <Text
                        style={{
                           color: "#fff",
                        }}
                     >
                        <Ionicons name="close" size={15} color="#fff" /> Закрыть
                     </Text>
                  </Pressable>
               </View>
            </View>
         </Modal>
         <ScrollView
            key="asd"
            style={{ flex: 1, backgroundColor: "#100e19", paddingBottom: 50 }}
         >
            <View
               style={{
                  flex: 0,
                  paddingVertical: 10,
                  paddingHorizontal: 25,

                  backgroundColor: "#100e19",
               }}
            >
               <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
                  FilmsCombo
               </Text>
            </View>
            <TitleText
               icon="chatbox-ellipses"
               title="Следи за новостями"
               link
            />
            <View
               style={{
                  backgroundColor: "#100e19",
                  paddingBottom: 15,
                  paddingHorizontal: 15,
               }}
            >
               <FlatList
                  data={btns}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  renderItem={({ item }) => (
                     <Pressable
                        style={{
                           alignItems: "center",
                           justifyContent: "center",
                           width: 100,
                           height: 100,
                           borderRadius: 4,
                           marginRight: 8,
                           backgroundColor: "#1f1b2e",
                        }}
                        onPress={() => {
                           item.link ? Linking.openURL(item.link) : null;
                        }}
                     >
                        {item.icon || null}
                        {item.name ? (
                           <Text
                              style={{
                                 color: "#fff",
                                 marginTop: item.icon ? 10 : 0,
                                 fontWeight: "800",
                              }}
                           >
                              {item.name}
                           </Text>
                        ) : null}
                     </Pressable>
                  )}
               />
            </View>
            <TitleText
               icon="film"
               title="Фильмы"
               navigation={props.navigation}
               toScreen="films"
            />
            <MainSlider api_name="movies" port={prot} navigation={navigation} />
            <TitleText
               icon="tv"
               title="Сериалы"
               navigation={props.navigation}
               toScreen="serials"
            />
            <MainSlider api_name="tv-series" />
            <TitleText
               icon="rocket"
               title="Аниме-фильмы"
               navigation={props.navigation}
               toScreen="anime"
            />
            <MainSlider api_name="animes" />
            <TitleText
               icon="rose"
               title="Аниме-сериалы"
               navigation={props.navigation}
               toScreen="anime-series"
            />
            <MainSlider api_name="anime-tv-series" />
         </ScrollView>
      </SafeAreaView>
   );
};

const Stack = createNativeStackNavigator();

function HomeRoot() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
               headerShown: false,
            }}
         />
         <Stack.Screen
            name="Player"
            component={PlayerScreen}
            options={{
               headerBackTitle: "Назад",
               title: "Плеер",
               headerRight: () => (
                  <View style={{ flex: 0, flexDirection: "row" }}>
                     <Pressable onPress={() => alert("В разработке!")}>
                        <FontAwesome name="heart" size={24} color="white" />
                     </Pressable>
                     <Pressable
                        onPress={() => alert("В разработке!")}
                        style={{ marginLeft: 15 }}
                     >
                        <Feather name="share" size={24} color="white" />
                     </Pressable>
                  </View>
               ),
               headerStyle: {
                  backgroundColor: "#000",
               },
               headerTintColor: "#fff",
               headerTitleStyle: {
                  fontWeight: "800",
               },
            }}
         />
      </Stack.Navigator>
   );
}

function SearchRoot() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Home"
            component={AllFlatScreens}
            initialParams={{ typescreen: "movies" }}
            options={{
               headerShown: false,
            }}
         />
         <Stack.Screen
            name="Player"
            component={PlayerScreen}
            options={{
               headerBackTitle: "Назад",
               title: "Плеер",
               headerRight: () => (
                  <View style={{ flex: 0, flexDirection: "row" }}>
                     <Pressable onPress={() => alert("В разработке!")}>
                        <FontAwesome name="heart" size={24} color="white" />
                     </Pressable>
                     <Pressable
                        onPress={() => alert("В разработке!")}
                        style={{ marginLeft: 15 }}
                     >
                        <Feather name="share" size={24} color="white" />
                     </Pressable>
                  </View>
               ),
               headerStyle: {
                  backgroundColor: "#000",
               },
               headerTintColor: "#fff",
               headerTitleStyle: {
                  fontWeight: "800",
               },
            }}
         />
      </Stack.Navigator>
   );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
   return (
      <NavigationContainer>
         <Tab.Navigator
            initialRouteName="Home"
            activeColor="white"
            inactiveColor="gray"
            barStyle={{ backgroundColor: "#1f1b2e" }}
            screenOptions={({ route }) => ({
               tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "main") {
                     iconName = focused ? "film" : "film-outline";
                  } else if (route.name === "films") {
                     iconName = focused ? "tv" : "tv-outline";
                  } else if (route.name === "watch") {
                     iconName = focused ? "play" : "play-outline";
                  } else if (route.name === "serials") {
                     iconName = focused
                        ? "people-circle"
                        : "people-circle-outline";
                  } else if (route.name === "anime") {
                     iconName = focused ? "rocket" : "rocket-outline";
                  } else if (route.name === "anime-series") {
                     iconName = focused ? "contrast" : "contrast-outline";
                  } else if (route.name === "search") {
                     iconName = focused ? "search" : "search";
                  } else if (route.name === "settings") {
                     iconName = focused ? "newspaper" : "newspaper-outline";
                  }

                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={23} color={color} />;
               },
               tabBarActiveTintColor: "red",
               tabBarInactiveTintColor: "",
            })}
         >
            <Tab.Screen
               name="main"
               options={{
                  title: "Главная",
                  headerTintColor: "#fff",
               }}
               component={HomeRoot}
            />

            <Tab.Screen
               name="search"
               options={{
                  title: "Поиск",
                  headerTintColor: "#fff",
               }}
               component={SearchRoot}
            />
            <Tab.Screen
               name="settings"
               options={{
                  title: "Новости",
                  headerTintColor: "#fff",
               }}
               component={SettingsScreen}
               initialParams={{ frame: "" }}
            />
         </Tab.Navigator>
      </NavigationContainer>
   );
}
