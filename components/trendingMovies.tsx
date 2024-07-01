import React from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";

const TrendingMovies = ({ data }: any) => {
  // console.log("data", data);

  const navigation: any = useNavigation();
  const { width, height } = Dimensions.get("window");
  const handleClick = (item: any) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View>
      <Text className="text-white text-xl mx-4">Trending Movies</Text>
      <View>
        <Carousel
          loop
          width={width}
          height={height * 0.65}
          autoPlay={true}
          data={data}
          mode="parallax"
          scrollAnimationDuration={1800}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <MovieCard item={item} handleClick={handleClick} />
          )}
        />
      </View>
    </View>
  );
};

const MovieCard = ({ item, handleClick }: any) => {
  // console.log("tset", item.poster_path);

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View>
        <Image
          // source={require("../assets/marcille.jpeg")}
          source={{ uri: image500(item.poster_path) }}
          style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
          className="rounded-3xl"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
