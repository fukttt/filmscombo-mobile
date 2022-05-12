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
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import news from "../../news";
const copy = `# h1 Heading 8-)
 
**This is some bold text!**
 
This is normal text
`;

const Tab = createMaterialTopTabNavigator();

const News = () => {
	const [data, setData] = useState();
	useEffect(() => {
		fetch(
			"https://raw.githubusercontent.com/fukttt/filmscombo-mobile/master/news.json"
		)
			.then((response) => response.json())
			.then((json) => {
				setData(json);
				alert(json.length);
			})
			.catch((error) => {
				alert(error);
			});
	}, []);

	return (
		<FlatList
			style={{
				flex: 1,
				paddingVertical: 20,
				paddingHorizontal: 25,

				backgroundColor: "#100e19",
			}}
			data={data}
			renderItem={({ item }) => (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						marginBottom: 20,
					}}
				>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 5,
						}}
					>
						<Text
							style={{
								color: "#fff",
								fontWeight: "bold",
								fontSize: 20,
							}}
						>
							{item.title}
						</Text>
						<Text
							style={{
								color: "#fff",
								fontWeight: "bold",
							}}
						>
							{item.created_at}
						</Text>
					</View>

					<Text
						style={{
							color: "#fff",
						}}
					>
						{item.text}
					</Text>
				</View>
			)}
		/>
	);
};

const Settings = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#100e19",
				paddingVertical: 15,
				paddingHorizontal: 10,
			}}
		>
			<Text style={{ color: "#fff", fontSize: 15 }}>
				Версия приложения: {expo.version}
			</Text>
			<View
				style={{
					bottom: 5,
					right: 10,
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
export default SettingsScreen;
