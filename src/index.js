import React from 'react';
import { View, Text, Button, ScrollView, SafeAreaView,Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import s from './style'
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import FilmsCarusel from './components/filmsslider';
import SerialsCarusel from './components/serialsslider';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const films = FilmsCarusel();
  const serials = SerialsCarusel();
    return (
          
        <SafeAreaView style={s.container}>
          <ScrollView key="asd" style={{flex: 1, backgroundColor: '#fff'}}>
            
            <Text style={s.title}><FontAwesome name="film" size={24} color="black" /> Фильмы</Text>
            {films}
            <Text style={s.title}><FontAwesome name="tv" size={24} color="black" /> Сериалы</Text>
            {serials}
          </ScrollView>
          </SafeAreaView>
      );
}
const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
const PlayerScreen = ({ route }) => {
  const { frame } = route.params;
  
  return (
    <View style={s.containerd}>
       <WebView
        source={{  
          html: frame}}

          mixedContentMode='always'
          originWhitelist={['*svetacdn*']}
          mediaPlaybackRequiresUserAction={true}
          androidLayerType= 'hardware'
          domStorageEnabled={true}
          style={{ height: deviceHeight,flex : 1, width: deviceWidth, alignSelf: "center", alignContent: "center", }} 
          javaScriptEnabled={true}
      />
      </View>

  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'main') {
                  iconName = 'film';
                } else if (route.name === 'films') {
                  iconName = 'tv';
                }
                else if (route.name === 'watch') {
                  iconName = 'play';
                }

                // You can return any component that you like here!
                return <FontAwesome name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#6d23b6',
              tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name="main" options={{
                  title:"Главная",
                  headerTintColor: '#fff',
                  headerStyle: {
                    backgroundColor: '#6d23b6',
                  },
                  }} component={HomeScreen} />
                <Tab.Screen name="films" options={{
                  title:"Фильмы", 
                  headerTintColor: '#fff',
                  headerStyle: {
                    backgroundColor: '#6d23b6',
                  },
                  }} component={DetailsScreen} />
                  <Tab.Screen name="watch" options={{
                  title:"Плеер", 
                  headerTintColor: '#fff',
                  headerStyle: {
                    backgroundColor: '#6d23b6',
                  },
                  }} component={PlayerScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    </>
  );
}