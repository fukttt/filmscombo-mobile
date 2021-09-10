import React from "react";
import {
  View,
  Text,
  Button,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import s from "./style";
import { FontAwesome } from "@expo/vector-icons";

import FilmsCarusel from "./components/filmsslider";
import SerialsCarusel from "./components/serialsslider";
import AnimeCarusel from "./components/animeslider";

import FilmsScreen from "./screens/filmsscreen";
import PlayerScreen from "./screens/playerscreen";
import AnimeScreen from "./screens/animescreen";
import SerialsScreen from "./screens/serialsscreen";









const HomeScreen = ({ navigation }) => {
  const films = FilmsCarusel();
  const serials = SerialsCarusel();
  const anime = AnimeCarusel();
  return (
    <SafeAreaView style={s.container}>
      <ScrollView key="asd" style={{ flex: 1, backgroundColor: "#100e19" }}>
        <Text style={s.title}>
          <FontAwesome name="film" size={24} color="white" /> Фильмы
        </Text>
        {films}
        <Text style={s.title}>
          <FontAwesome name="tv" size={24} color="white" /> Сериалы
        </Text>
        {serials}
        <Text style={s.title}>
          <FontAwesome name="eercast" size={24} color="white" /> Аниме
        </Text>
        {anime}
      </ScrollView>
    </SafeAreaView>
  );
};



const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#f0edf6"
          inactiveColor="black"
          barStyle={{ backgroundColor: '#6d23b6', paddingBottom: 10 }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "main") {
                iconName = "film";
              } else if (route.name === "films") {
                iconName = "tv";
              } else if (route.name === "watch") {
                iconName = "play";
              } else if (route.name === "serials") {
                iconName = "user-secret";
              } else if (route.name === "anime") {
                iconName = "eercast";
              }
              else if (route.name === "search") {
                iconName = "search";
              }

              // You can return any component that you like here!
              return <FontAwesome name={iconName} size={16} color={color} />;
            },
            
            tabBarActiveTintColor: "#6d23b6",
            tabBarInactiveTintColor: "white",
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
            name="films"
            options={{
              title: "Фильмы",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#610094",
              },
            }}
            component={FilmsScreen}
          />
          <Tab.Screen
            name="serials"
            options={{
              title: "Сериалы",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#610094",
              },
            }}
            component={SerialsScreen}
          />
          <Tab.Screen
            name="anime"
            options={{
              title: "Аниме",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#610094",
              },
            }}
            component={AnimeScreen}
          />
          <Tab.Screen
            name="watch"
            options={{
              title: "Плеер",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#6d23b6",
              },
            }}
            component={PlayerScreen}
            initialParams={{ frame: '' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
