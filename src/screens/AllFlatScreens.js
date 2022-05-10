import React, { Component } from "react";
import {
	View,
	Text,
	Button,
	ActivityIndicator,
	TextInput,
	FlatList,
	StyleSheet,
	Pressable,
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

const btns = [
	{
		name: "Фильмы",
		link: "movies",
	},

	{
		name: "Сериалы",
		link: "tv-series",
	},
	{
		name: "Аниме",
		link: "animes",
	},
	{
		name: "Аниме-сериалы",
		link: "anime-tv-series",
	},
	{
		name: "ТВ-шоу",
		link: "show-tv-series",
	},
];

class AllFlatItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			routeparams: props.route.params,
			data: [],
			deviceHeight: 0,
			deviceWidth: 0,
			page: 1,
			loading: true,
			refreshing: false,
			numColumns: 2,
		};
	}

	handleRefreshing = () => {
		this.setState({ data: [], refreshing: true, page: 1 }, () => {
			this.searchFilms("", false, "refresh");
		});
	};

	searchFilms(text, search = false, type) {
		this.setState({ loading: true });
		var url = "";
		if (search == true) {
			url =
				"https://videocdn.tv/api/" +
				this.state.routeparams.typescreen +
				"?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=released&direction=desc&limit=20&query=" +
				text;
		} else {
			url =
				"https://videocdn.tv/api/" +
				this.state.routeparams.typescreen +
				"?api_token=jvbY6usny3y4hgcEvc51TPNunRRsPMms&ordering=released&direction=desc&limit=20&page=" +
				this.state.page;
		}
		return fetch(url)
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
						year: this.state.routeparams.typescreen.includes("tv-series")
							? entry.start_date.split("-")[0]
							: entry.year.split("-")[0],
						frame: entry.iframe,
					});
				});

				if (search == true) {
					this.setState({ data: data1 });
				} else {
					//alert(type)
					this.setState({
						data: this.state.data.concat(data1),
						refreshing: false,
					});
				}

				this.setState({ loading: false });
			})
			.catch((error) => {
				alert(error);
			});
	}

	componentDidMount() {
		this.searchFilms("");
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
						paddingHorizontal: 25,
					}}
				>
					<TextInput
						editable
						maxLength={40}
						placeholder="Поиск"
						placeholderTextColor={"#7f8fa6"}
						keyboardAppearance="dark"
						onChangeText={(text) => {
							this.searchFilms(text, true, "input");
						}}
						keyboardType="default"
						style={{
							marginTop: 50,
							borderWidth: 2,
							borderRadius: 10,
							color: "#7f8fa6",
							borderColor: "#718093",
							padding: 15,
							fontWeight: "bold",
						}}
					></TextInput>
				</View>
				<View
					style={{
						backgroundColor: "#100e19",
						paddingVertical: 15,
						paddingHorizontal: 25,
					}}
				>
					<FlatList
						data={btns}
						horizontal={true}
						renderItem={({ item }) => (
							<Pressable
								style={{
									alignItems: "center",
									justifyContent: "center",
									paddingVertical: 12,
									paddingHorizontal: 32,
									borderRadius: 4,
									elevation: 3,
									marginRight: 8,
									backgroundColor:
										this.state.routeparams.typescreen == item.link
											? "#192a56"
											: "#273c75",
								}}
								onPress={() => {
									this.state.page = 1;
									this.state.data = [];
									this.state.routeparams.typescreen = item.link;
									this.searchFilms("");
								}}
							>
								<Text style={styles.text}>{item.name}</Text>
							</Pressable>
						)}
						keyExtractor={(item) => item.name}
					/>
				</View>
				<View
					style={{
						flex: 1,
						flexGrow: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator
						size="large"
						color="rgb(70 ,48, 235)"
						style={{ position: "absolute" }}
						hidesWhenStopped={true}
						animating={this.state.loading}
					/>
					<FlatList
						style={{ backgroundColor: "#100e19" }}
						data={this.state.data}
						onEndReachedThreshold={0.5}
						refreshing={this.state.refreshing}
						onRefresh={this.handleRefreshing}
						onEndReached={() => {
							this.setState({ page: this.state.page + 1 }, () => {
								this.searchFilms("", false, "end");
							});
						}}
						numColumns={this.state.numColumns}
						renderItem={({ item }) => {
							return (
								<TouchableWithoutFeedback
									activeOpacity={1}
									key={item.id}
									onPress={() => {
										var p = item.frame
											.toString()
											.replace("\\", "")
											.replace("//", "https://")
											.replace("640", "100%")
											.replace("480", "100%");
										this.props.navigation.navigate("watch", {
											frame: p,
										});
									}}
								>
									<View
										style={{
											width: Dimensions.get("window").width * 0.45,
											padding: 5,

											height: Dimensions.get("window").height * 0.3,
										}}
									>
										<ImageBackground
											source={{ uri: item.uri }}
											style={{
												resizeMode: "stretch",
												backgroundColor: "#1f1b2e",
												borderRadius: 12,
												flex: 1,
											}}
											imageStyle={{ borderRadius: 12 }}
										>
											<View style={s.filmSearchText}>
												<Text
													style={{
														color: "white",
														fontSize: 15,
														fontWeight: "bold",
													}}
												>
													{item.title.substr(0, 10) + "..."}{" "}
													{item.year}
												</Text>
											</View>
										</ImageBackground>
									</View>
								</TouchableWithoutFeedback>
							);
						}}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		marginRight: 8,
		backgroundColor: "#192a56",
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
});
export default AllFlatItems;
