import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  FlatList,
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



class FilmsScreen extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: [],
            deviceHeight : 0,
            deviceWidth : 0,
            page: 1,
            loading: true,
            refreshing: false,
            numColumns: 2,
        };
    }
    

  goWatch(frame) {
    var p = frame
      .toString()
      .replace("\\", "")
      .replace("//", "https://")
      .replace("640", "100%")
      .replace("480", "100%");
    useNavigation().navigation.navigate("watch", { frame: p });
  }

  searchFilms (text) {
    this.state.loading =true;
    return fetch(
      "https://videocdn.tv/api/movies?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=created&limit=20&query=" +
        text +
        "&page=" +
        this.state.page
    )
      .then((response) => response.json())
      .then((json) => {
        var data1 = [];
        json.data.forEach((entry) => {
          data1.push({
            id: entry.id,
            uri:
              "http://st.kp.yandex.net/images/film_iphone/iphone360_" +
              entry.kinopoisk_id +
              ".jpg",
            title: entry.ru_title,
            year: entry.year.split("-")[0],
            frame: entry.iframe,
          });
        });
        this.setState({data: this.state.data.concat(data1), refreshing : false})
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.searchFilms("");
  }

  renderItem ({ item }){
    return (
      <TouchableWithoutFeedback
        activeOpacity={1}
        key={item.id}
        onPress={() => {
          this.goWatch(item.frame);
        }}
      >
        <View
          style={{
            width: Dimensions.get('window').width * 0.45,
            padding: 5,
            height: Dimensions.get('window').height * 0.3,
          }}
        >
          <ImageBackground
            source={{ uri: item.uri }}
            style={{
              resizeMode: "stretch",
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
      </TouchableWithoutFeedback>
    );
  };
    handleRefreshing = () => {
        this.setState({data: [], refreshing : true, page: 1}, ()=>{
            this.searchFilms("")
        })
    }

  render() {
    return (
      <View
        onPress={Keyboard.dismiss}
        style={{ flex: 1, backgroundColor: "#100e19" }}
      >
        <View
          style={{
            backgroundColor: "#100e19",
            paddingVertical: 15,
            paddingHorizontal: 25,
          }}
        >
          <TextInput
            editable
            maxLength={40}
            placeholder="Поиск"
            keyboardAppearance="dark"
            onChangeText={(text) => {
              this.searchFilms(text, page);
            }}
            keyboardType="default"
            style={{
              marginTop: 50,
              backgroundColor: "white",
              padding: 15,
              fontWeight: "bold",
            }}
          ></TextInput>
        </View>

        <View
          style={{
            flex: 1,
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            style={{ backgroundColor: "#100e19" }}
            data={this.state.data}
            onEndReachedThreshold={0}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefreshing}
            onEndReached={() => {
                this.setState({page: this.state.page + 1}, ()=>{
                    this.searchFilms("")
                })
            }}
            numColumns={this.state.numColumns}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}

export default FilmsScreen;
