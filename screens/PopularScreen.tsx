import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  fetchPopularMovies,
  fetchUpcomingMovies,
  image342,
} from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";
const PopularScreen = () => {
  const [popular, setPopular] = useState([]);
  const navigation: any = useNavigation();
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    if (data && data?.results) setPopular(data?.results);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="absolute z-20 mx-4 my-3 flex-row justify-between items-center rounded-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-xl p-2 bg-orange-500"
        >
          <Icon name="chevron-left" color="white" size={30} />
        </TouchableOpacity>
      </View>
      <Text className="text-white text-center text-3xl my-4">
        Popular Movie
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="space-y-3"
      >
        <View className="flex-row justify-between flex-wrap">
          {popular.map((item: any, index: any) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Movie", item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    // source={require("../assets/marcille.jpeg")}
                    source={{ uri: image342(item?.poster_path) }}
                    style={{ width: width * 0.45, height: height * 0.25 }}
                  />
                  <Text className="text-neutral-400 ml-1">
                    {item.original_title.length > 25
                      ? item.original_title.slice(0, 25) + "..."
                      : item.original_title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PopularScreen;
