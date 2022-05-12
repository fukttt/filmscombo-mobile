import React, { useEffect } from "react";
import {
   View,
   Text,
   ScrollView,
   SafeAreaView,
   StatusBar,
   TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import s from "./style";
import { Ionicons } from "@expo/vector-icons";

import MainSlider from "./components/MainSlider";

import AllFlatScreens from "./screens/AllFlatScreens";
import PlayerScreen from "./screens/playerscreen";
import NewsScreen from "./screens/NewsScreen";
import { expo } from "../app.json";

const TitleText = (props) => {
   return (
      <TouchableOpacity
         onPress={() => {
            props.navigation.navigate("search", { typescreen: "animes" });
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
            <Ionicons name={props.icon} size={24} color="white" />
            <Text style={s.title}>{props.title}</Text>
            <Ionicons
               name="arrow-forward"
               size={20}
               color="white"
               style={{ marginRight: 15 }}
            />
         </View>
      </TouchableOpacity>
   );
};

const onSwipeLeft = (nav) => {
   nav.navigate("films");
};

const HomeScreen = (props, { navigation }) => {
   return (
      <SafeAreaView style={s.container}>
         <StatusBar hidde />
         <ScrollView
            key="asd"
            style={{ flex: 1, backgroundColor: "#100e19", paddingBottom: 50 }}
         >
            <TitleText
               icon="film"
               title="Фильмы"
               navigation={props.navigation}
               toScreen="films"
            />
            <MainSlider api_name="movies" />
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

const Tab = createMaterialBottomTabNavigator();

export default function App() {
   useEffect(() => {
      //
      var semver = require("semver");
      fetch(
         "https://raw.githubusercontent.com/fukttt/filmscombo-mobile/master/app.json"
      )
         .then((response) => response.json())
         .then((json) => {
            if (semver.gte(json.expo.version, expo.version)) {
               alert("New version is available!");
            }
         })
         .catch((error) => {
            alert(error);
         });
   }, []);
   return (
      <NavigationContainer>
         <Tab.Navigator
            initialRouteName="Home"
            activeColor="white"
            inactiveColor="gray"
            barStyle={{ backgroundColor: "#1f1b2e", paddingBottom: 2 }}
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
                  } else if (route.name === "news") {
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
                  headerShown: false,
               }}
               component={HomeScreen}
            />
            <Tab.Screen
               name="search"
               options={{
                  title: "Поиск",
                  headerTintColor: "#fff",
               }}
               component={AllFlatScreens}
               initialParams={{ typescreen: "movies" }}
            />
            <Tab.Screen
               name="watch"
               options={{
                  title: "Плеер",
                  headerTintColor: "#fff",
               }}
               component={PlayerScreen}
               initialParams={{ frame: "" }}
            />
            <Tab.Screen
               name="news"
               options={{
                  title: "Новости",
                  headerTintColor: "#fff",
               }}
               component={NewsScreen}
               initialParams={{ frame: "" }}
            />
         </Tab.Navigator>
      </NavigationContainer>
   );
}
