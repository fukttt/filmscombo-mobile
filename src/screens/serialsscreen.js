import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import s from "../style";
import { useNavigation } from '@react-navigation/native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const SerialsScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  function goWatch(frame) {
    var p = frame.toString().replace('\\', '').replace('//', 'https://').replace('640', '100%').replace('480', '100%')
    navigation.navigate('watch', {frame : p})
  } 

  const searchFilms = (text) => {
    setData([]);
    if (text != "") setLoading(true);

    return fetch(
      "https://videocdn.tv/api/tv-series?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=created&limit=20&query=" +
        text
    )
      .then((response) => response.json())
      .then((json) => {
        var data = [];
        json.data.forEach((entry) => {
          data.push({
            uri:
              "http://st.kp.yandex.net/images/film_iphone/iphone360_" +
              entry.kinopoisk_id +
              ".jpg",
            title: entry.ru_title,
            year: entry.start_date.split("-")[0],
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

  useEffect(() => {
    searchFilms('');
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView horizontal={false} style={{ backgroundColor: "#11324D" }}>
        <View
          style={{
            flex: 1,
            paddingTop: 50,
            backgroundColor: "#100e19",
            paddingVertical: 15,
            paddingHorizontal: 15,
          }}
        >
          <TextInput
            editable
            maxLength={40}
            placeholder="Поиск"
            keyboardAppearance="dark"
            onChangeText={(text) => {
              searchFilms(text);
            }}
            keyboardType="default"
            style={{
              backgroundColor: "white",
              width: deviceWidth - 40,
              padding: 10,
            }}
          ></TextInput>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            padding: 10,
            flex: 1,
            flexDirection: "row",
            alignContent: "sctretch",
            backgroundColor: "#11324D",
            flexWrap: "wrap",
          }}
        >
          <ActivityIndicator
            animating={loading}
            hidesWhenStopped={true}
            size="large"
            style={{
              position: "absolute",
              marginLeft: deviceWidth * 0.5,
              marginTop: 50,
            }}
          />
          {data.map((item, idx) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={idx}
                style={s.item}
                onPress={() => {
                  goWatch(item.frame);
                }}
              >
                <View
                  style={{
                    width: deviceWidth * 0.45,
                    padding: 5,
                    height: deviceHeight * 0.3,
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.uri }}
                    style={{
                      resizeMode: "cover",
                      padding: 20,
                      flex: 1,
                    }}
                    imageStyle={{ borderRadius: 6 }}
                  >
                    <View style={s.filmSearchText}>
                      <Text style={{ color: "white", fontSize: 15 }}>
                        {item.title} [{item.year}]
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SerialsScreen;
