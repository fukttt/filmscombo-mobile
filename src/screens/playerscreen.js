import React from "react";
import { View, Dimensions, Text } from "react-native";
import s from "../style";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const PlayerScreen = ({ route }) => {
	const { frame } = route.params;

	return (
		<View style={s.containerd}>
			{frame ? (
				<WebView
					source={{
						html: `<!doctype html>
            <html lang="en" >
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Hello, world!</title>
                <style>
                  html, body{
                    overflow : hidden,
                  }
                </style>
              </head>
              <body style="margin:0;padding:0; background-color: #100e19; height: 100vh;max-height:100vh;width: 100vw;max-width:100vw,">
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
					allowsFullscreenVideo={true}
				/>
			) : (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<View
						style={{
							alignItems: "center",
						}}
					>
						<Ionicons name={"alert-circle"} size={48} color="white" />
						<Text style={{ color: "white", marginTop: 10, fontSize: 20 }}>
							{" "}
							Для начала, выбери фильм.
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default PlayerScreen;
