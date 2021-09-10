import React from "react";
import {View, Dimensions} from 'react-native';
import s from "../style";
import { WebView } from "react-native-webview";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


const PlayerScreen = ({ route }) => {
    const { frame } = route.params;

    return (
      <View style={s.containerd}>
        <WebView
          source={{
            html: `<!doctype html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Hello, world!</title>
              </head>
              <body style="margin:0;padding:0; background-color: #100e19; height: 100vh;max-height:100%;width: 100vw">
               ${frame}
              </body>
            </html>`,
          }}
          mixedContentMode="always"
          
          originWhitelist={["*svetacdn*"]}
          mediaPlaybackRequiresUserAction={true}
          androidLayerType="hardware"
          domStorageEnabled={true}
          style={{
            
            flex: 1,
            width: deviceWidth,
            alignSelf: "center",
            alignContent: "center",
          }}
          javaScriptEnabled={true}
        />
      </View>
    );
  };

  export default PlayerScreen;