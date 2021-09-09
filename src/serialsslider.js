import React, { useEffect, useState, useRef} from 'react';
const axios = require('axios');
import { LogBox } from 'react-native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
const {width: windowWidth} = Dimensions.get('window');








const INITIAL_INDEX = 0;
export default function SerialCarousel(props) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);


  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMoviesFromApi = () => {
    return fetch('https://videocdn.tv/api/tv-series?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=created&limit=10')
      .then((response) => response.json())
      .then((json) => {
        var data = [];
        json.data.forEach((entry)=>{
            data.push({"uri" : 'http://st.kp.yandex.net/images/film_iphone/iphone360_'+entry.kinopoisk_id + '.jpg', "title" : entry.ru_title, "year" : entry.start_date.split('-')[0]})
        })
        
        setData(data)

      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };


  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    getMoviesFromApi();
  }, []);

  function renderItem({item, index}) {
    const {uri, title, year} = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <ImageBackground imageStyle={{ borderRadius: 6}} source={{uri: uri}} style={styles.imageBackground}>
          <View style={styles.rightTextContainer}>
            <Text style={styles.rightText}>{year}</Text>
          </View>
        </ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.contentText}></Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={200}
        inActiveOpacity={0.3}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
    },
  carousel: {
    backgroundColor: '#fff',
    aspectRatio: 1.5,
    flexGrow: 0,
    marginBottom: 20,
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
  },
  imageBackground: {
    flex: 3,
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: '#6d23b6',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: {color: 'white'},
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentText: {
    marginTop: 10,
    fontSize: 12,
  },
});