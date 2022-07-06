import React, { useEffect, useState } from "react";
import {
   SafeAreaView,
   ScrollView,
   Pressable,
   Linking,
   Dimensions,
   StatusBar,
   View,
   Text,
   FlatList,
} from "react-native";
import { expo } from "../../app.json";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";

const copy = `# h1 Heading 8-)
 
**This is some bold text!**
 
This is normal text
`;

const Tab = createMaterialTopTabNavigator();

const News = () => {
   const [data, setData] = useState([]);

   var myHeaders = new Headers();
   myHeaders.append("pragma", "no-cache");
   myHeaders.append("Cache-Control", "no-cache");

   var myInit = {
      method: "GET",
      headers: myHeaders,
      cache: "no-cache",
   };

   const btns = [
      {
         id: 1,
         link: "https://4fcombo.ru",
         icon: <FontAwesome name="globe" size={32} color="white" />,
         name: "Наш сайт",
      },
      {
         id: 2,
         link: "https://4pda.to/forum/index.php?showtopic=1048306",
         icon: <FontAwesome name="mobile" size={32} color="white" />,
         name: "4PDA",
      },
      {
         id: 3,
         link: "https://t.me/filmscombo",
         icon: <FontAwesome name="telegram" size={32} color="white" />,
         name: "Телеграм",
      },

      {
         id: 4,
         link: "https://github.com/fukttt/filmscombo-mobile/releases",
         icon: <FontAwesome name="github" size={32} color="white" />,
         name: "Гитхаб",
      },
      {
         id: 5,
         link: "https://github.com/fukttt/filmscombo/releases",
         icon: <FontAwesome name="desktop" size={32} color="white" />,
         name: "ПК-версия",
      },
   ];

   const todo = [
      {
         id: 1,
         icon: <FontAwesome name="cloud" size={32} color="white" />,
         name: "Облачная синхронизация",
      },
      {
         id: 2,
         icon: <FontAwesome name="user" size={32} color="white" />,
         name: "Один профиль на всех устройствах",
      },

      {
         id: 3,
         icon: <FontAwesome name="history" size={32} color="white" />,
         name: "История просмотров",
      },
      {
         id: 4,
         icon: <FontAwesome name="heart" size={32} color="white" />,
         name: 'Добавление в "Понравившиеся"',
      },
   ];

   useEffect(() => {
      fetch(
         "https://raw.githubusercontent.com/fukttt/filmscombo-mobile/master/news.json",
         myInit
      )
         .then((response) => response.json())
         .then((json) => {
            setData(json);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <SafeAreaView
         style={{
            flex: 1,
            backgroundColor: "#100e19",
         }}
      >
         <View
            style={{
               paddingVertical: 10,
               paddingHorizontal: 25,

               backgroundColor: "#100e19",
            }}
         >
            <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
               Новости
            </Text>
         </View>

         <View
            style={{
               paddingHorizontal: 20,
            }}
         >
            <FlatList
               style={{
                  backgroundColor: "#100e19",
               }}
               data={data}
               horizontal={true}
               renderItem={({ item }) => (
                  <View
                     style={{
                        marginRight: 10,
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "flex-start",
                        backgroundColor: "#1f1b2e",
                     }}
                  >
                     <Text
                        style={{
                           color: "#fff",
                           fontWeight: "bold",
                           fontSize: 18,
                        }}
                     >
                        {item.title}
                     </Text>
                     <Text
                        style={{
                           color: "#fff",
                           fontSize: 14,
                           marginTop: 10,
                        }}
                     >
                        {item.text}
                     </Text>
                  </View>
               )}
            />
         </View>

         <View
            style={{
               paddingVertical: 10,
               paddingHorizontal: 25,

               backgroundColor: "#100e19",
            }}
         >
            <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
               Социальное
            </Text>
         </View>
         <View
            style={{
               paddingHorizontal: 20,
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
                        if (item.mod) {
                           setsettingsModal(true);
                        }
                        if (item.link) {
                           Linking.openURL(item.link);
                        }
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
         <View
            style={{
               paddingVertical: 10,
               paddingHorizontal: 25,

               backgroundColor: "#100e19",
            }}
         >
            <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
               Скоро ...
            </Text>
         </View>
         <View
            style={{
               paddingHorizontal: 20,
            }}
         >
            <FlatList
               data={todo}
               keyExtractor={(item) => item.id}
               horizontal={true}
               renderItem={({ item }) => (
                  <Pressable
                     style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        width: 200,
                        height: 150,
                        borderRadius: 4,
                        marginRight: 8,
                        backgroundColor: "#1f1b2e",
                     }}
                     onPress={() => {
                        if (item.mod) {
                           setsettingsModal(true);
                        }
                        if (item.link) {
                           Linking.openURL(item.link);
                        }
                     }}
                  >
                     {item.icon || null}
                     {item.name ? (
                        <Text
                           style={{
                              color: "#fff",
                              marginTop: item.icon ? 10 : 0,
                              fontWeight: "700",
                           }}
                        >
                           {item.name}
                        </Text>
                     ) : null}
                  </Pressable>
               )}
            />
         </View>
      </SafeAreaView>
   );
};

const Settings = () => {
   const [actual, setactual] = useState();

   var myHeaders = new Headers();
   myHeaders.append("pragma", "no-cache");
   myHeaders.append("Cache-Control", "no-cache");

   var myInit = {
      method: "GET",
      headers: myHeaders,
      cache: "no-cache",
   };

   useEffect(() => {
      fetch(
         "https://raw.githubusercontent.com/fukttt/filmscombo-mobile/master/app.json",
         myInit
      )
         .then((response) => response.json())
         .then((json) => {
            setactual(json.expo.version);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);
   return (
      <View
         style={{
            flex: 1,
            backgroundColor: "#100e19",
            paddingVertical: 15,
            paddingHorizontal: 10,
         }}
      >
         <Text style={{ color: "#fff", fontSize: 18 }}>
            Версия приложения: {expo.version}
         </Text>
         <Text style={{ color: "#fff", fontSize: 18, marginTop: 5 }}>
            Актуальная версия: {actual || "N/A"}
         </Text>
         <View
            style={{
               bottom: 10,
               right: 15,
               position: "absolute",
               flex: 1,
               flexDirection: "row",
               flexWrap: "wrap",
            }}
         >
            <Pressable
               onPress={() => {
                  Linking.openURL(
                     "https://github.com/fukttt/filmscombo-mobile"
                  );
               }}
            >
               <Ionicons name="logo-github" size={48} color="white" />
            </Pressable>

            <Pressable
               onPress={() => {
                  Linking.openURL("https://t.me/filmscombo");
               }}
            >
               <FontAwesome5
                  name="telegram-plane"
                  size={48}
                  color="white"
                  style={{ marginLeft: 5 }}
               />
            </Pressable>
         </View>
      </View>
   );
};

const SettingsScreen = () => {
   return (
      <SafeAreaView
         style={{
            flex: 1,
            backgroundColor: "#100e19",
         }}
      >
         <StatusBar hidde />
         <Tab.Navigator
            screenOptions={{
               tabBarLabelStyle: { fontSize: 15, color: "#fff" },
               tabBarStyle: { backgroundColor: "#100e19" },
            }}
            initialLayout={{
               width: Dimensions.get("window").width,
            }}
         >
            <Tab.Screen name="Новости" component={News} />
            <Tab.Screen name="Настройки" component={Settings} />
         </Tab.Navigator>
      </SafeAreaView>
   );
};

const markdownStyles = {
   heading1: {
      fontSize: 24,
      color: "#fff",
   },
   link: {
      color: "pink",
   },
   mailTo: {
      color: "orange",
   },
   text: {
      color: "#fff",
   },
};
export default News;
