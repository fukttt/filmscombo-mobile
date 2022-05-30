import React, { useEffect, useState } from "react";
import s from "../style";
import {
   View,
   Text,
   ScrollView,
   SafeAreaView,
   Dimensions,
   Animated,
   ActivityIndicator,
   ImageBackground,
   TouchableOpacity,
   FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const OFFSET = 20;
const ITEM_WIDTH = Dimensions.get("window").width * 0.4;
const ITEM_HEIGHT = Dimensions.get("window").height * 0.3;

const SerialsCarousel = (props) => {
   const scrollX = React.useRef(new Animated.Value(0)).current;
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [stored, setStored] = useState([]);
   const getMoviesFromApi = () => {
      return fetch(
         "https://videocdn.tv/api/" +
            props.api_name +
            "?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=idw&limit=20&direction=desc"
      )
         .then((response) => response.json())
         .then((json) => {
            var data = [];
            json.data.forEach((entry, id) => {
               data.push({
                  id: id,
                  uri:
                     "http://st.kp.yandex.net/images/film_iphone/iphone360_" +
                     entry.kinopoisk_id +
                     ".jpg",
                  title: entry.ru_title,
                  year: props.api_name.includes("tv-series")
                     ? entry.start_date.split("-")[0]
                     : entry.year.split("-")[0],
                  frame: entry.iframe,
               });
            });
            setLoading(false);
            setData(data);
         })
         .catch((error) => {
            console.error(error);
         });
   };

   const navigation = useNavigation();
   function goWatch(frame) {
      var p = frame
         .toString()
         .replace("\\", "")
         .replace("//", "https://")
         .replace("640", "100%")
         .replace("480", "100%");
      navigation.navigate("watch", { frame: p });
   }

   useEffect(() => {
      getMoviesFromApi();
   }, []);

   return (
      <View style={{ backgroundColor: "#100e19", paddingHorizontal: 20 }}>
         <View style={s.loading}>
            <ActivityIndicator
               animating={loading}
               hidesWhenStopped={true}
               size="large"
            />
         </View>
         <Animated.FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal={true}
            decelerationRate={"fast"}
            snapToInterval={ITEM_WIDTH}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            disableIntervalMomentum
            renderItem={({ item }) => {
               const inputRange = [
                  (item.id - 1) * ITEM_WIDTH,
                  item.id * ITEM_WIDTH,
                  (item.id + 1) * ITEM_WIDTH,
               ];

               const translate = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.9, 1, 0.9],
               });

               const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 0.8],
               });
               return (
                  <TouchableOpacity
                     key={item.id}
                     onPress={() => {
                        goWatch(item.frame);
                     }}
                  >
                     <Animated.View
                        key={item.id}
                        style={{
                           width: ITEM_WIDTH,
                           height: ITEM_HEIGHT,
                           backgroundColor: "#1f1b2e",
                           borderRadius: 12,
                           marginLeft: 0,
                           marginRight:
                              item.id === data.length - 1 ? OFFSET : undefined,
                           opacity: opacity,
                           overflow: "hidden",
                           transform: [{ scale: translate }],
                        }}
                     >
                        <ImageBackground
                           source={{ uri: item.uri }}
                           style={{
                              flex: 1,
                           }}
                           imageStyle={{ borderRadius: 12 }}
                        >
                           <View style={s.filmText}>
                              <Text
                                 style={{ color: "white", fontWeight: "bold" }}
                              >
                                 {item.title.substr(0, 10) + "..."}
                              </Text>
                           </View>
                           <View style={s.filmTextRight}>
                              <Text style={{ color: "white" }}>
                                 {item.year}
                              </Text>
                           </View>
                        </ImageBackground>
                     </Animated.View>
                  </TouchableOpacity>
               );
            }}
            onScroll={Animated.event(
               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
               { useNativeDriver: true }
            )}
            scrollEventThrottle={12}
         ></Animated.FlatList>
      </View>
   );
};

export default SerialsCarousel;
