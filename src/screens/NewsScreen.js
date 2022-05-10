import React from "react";
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	View,
	Text,
	FlatList,
} from "react-native";

import news from "../../news";
const copy = `# h1 Heading 8-)
 
**This is some bold text!**
 
This is normal text
`;

const NewsScreen = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#100e19",
			}}
		>
			<StatusBar hidde />
			<FlatList
				style={{
					flex: 1,
					paddingVertical: 10,
					paddingHorizontal: 25,
				}}
				data={news}
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
export default NewsScreen;
