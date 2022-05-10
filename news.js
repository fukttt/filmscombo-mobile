import { Text } from "react-native";

export default news = [
  {
    title: "Первая",
    text: (
      <>
        <Text style={{ color: "#fff" }}>
          Первая новость в приложении.{"\n"}Буду очень рад вашему фидбеку!
        </Text>
      </>
    ),
    created_at: "10-05-2022",
  },
  {
    title: "Вторая",
    text: "А вот и вторая новость!",
    created_at: "10-05-2022",
  },
];
