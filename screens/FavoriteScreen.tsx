import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getFavoriteMovies } from "../constant/storage";
import { image342 } from "../api/moviedb";

export default function FavoriteScreen() {
  const navigation: any = useNavigation();
  const [favorite, setFavorite] = useState([]);
  const { width, height } = Dimensions.get("window");

  useFocusEffect(() => {
    const fetchFavorites = async () => {
      const favoriteMovies = await getFavoriteMovies();
      setFavorite(favoriteMovies);
    };
    fetchFavorites();
  });

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
        Favorite Movie
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="space-y-3"
      >
        <View className="flex-row justify-between flex-wrap">
          {favorite.map((item: any, index: any) => {
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
}
