import React, { useEffect, useState} from 'react';
import s from '../style'
import { View, Text, ScrollView, SafeAreaView,  Dimensions, Animated, ImageBackground, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OFFSET = 40
const ITEM_WIDTH = Dimensions.get("window").width
const ITEM_HEIGHT = 240



export default function SerialsCarousel (){
  const scrollX = React.useRef(new Animated.Value(0)).current
  const [data, setData] = useState([]);

  const getMoviesFromApi = () => {
    return fetch('https://videocdn.tv/api/tv-series?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=created&limit=10')
      .then((response) => response.json())
      .then((json) => {
        var data = [];
        json.data.forEach((entry)=>{
            data.push({"uri" : 'http://st.kp.yandex.net/images/film_iphone/iphone360_'+entry.kinopoisk_id + '.jpg', "title" : entry.ru_title, "year" : entry.start_date.split('-')[0], "frame" : entry.iframe})
        })
        
        setData(data)

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigation = useNavigation();
  function goWatch(frame) {
    var p = frame.toString().replace('\\', '').replace('//', 'https://').replace('640', '100%').replace('480', '100%')
    navigation.navigate('watch', {frame : p})
  } 

  useEffect(() => {
    getMoviesFromApi();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        horizontal={true}
        decelerationRate={"normal"}
        snapToInterval={ITEM_WIDTH}
        style={{ marginTop: 10, paddingHorizontal: 0 }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        disableIntervalMomentum
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={12}
      >
        {data.map((item, idx) => {
          const inputRange = [
            (idx - 1) * ITEM_WIDTH,
            idx * ITEM_WIDTH,
            (idx + 1) * ITEM_WIDTH,
          ]

          const translate = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          })

          return (
            <TouchableOpacity
            activeOpacity={1}
            style={s.item}
            key={idx}
            onPress={() => {
              goWatch(item.frame)
            }}>
            <Animated.View
              key={idx}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginLeft: 0,
                marginRight: idx === data.length - 1 ? OFFSET : undefined,
                opacity: opacity,
                transform: [{ scale: translate }],
              }}
            >
              
              <ImageBackground
                source={{uri : item.uri}}
                style={{
                  flex: 1,
                  resizeMode: "stretch",
                  justifyContent: "flex-start",
                }}
                imageStyle={{ borderRadius: 6}}
              >
                <View style={s.filmText}>
                <Text style={{color: 'white'}}>{item.title}</Text>
                </View>
                <View style={s.filmTextRight}>
                <Text style={{color: 'white'}}>{item.year}</Text>
                </View>
                
                
              </ImageBackground>
              
            </Animated.View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}
