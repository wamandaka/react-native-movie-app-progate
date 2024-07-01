import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUpcomingMovies, image342 } from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

export default function UpComingScreen() {
  const [upcoming, setUpcoming] = useState([]);
  const navigation: any = useNavigation();
  const { width, height } = Dimensions.get("window");
  useEffect(() => {
    getUpcomingMovies();
  }, []);

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data?.results) setUpcoming(data?.results);
  };
  return (
    <View>
      <View className="mx-4 my-3 flex-row justify-between items-center rounded-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-xl p-2 bg-orange-500"
        >
          <ChevronLeftIcon color="white" size={30} />
        </TouchableOpacity>
      </View>
      <Text className="text-white text-center text-4xl mb-5">
        Upcoming Movie
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="space-y-3"
      >
        <View className="flex-row justify-between flex-wrap">
          {upcoming.map((item: any, index: any) => {
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
    </View>
  );
}
