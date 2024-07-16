import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image185, image342 } from "../api/moviedb";

export default function MovieList({ title, data, hideSeeAll }: any) {
  // console.log(data);

  const { width, height } = Dimensions.get("window");
  const navigation: any = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity
            onPress={() => navigation.navigate(title)}
            className="text-white text-xl"
          >
            <Text className="text-red-500 text-xl">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {data.map((item: any, index: any) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  // source={require("../assets/marcille.jpeg")}
                  source={{ uri: image185(item.poster_path) }}
                  style={{ width: width * 0.33, height: height * 0.25 }}
                  className="rounded-3xl bg-cover"
                />
                <Text className="text-neutral-400 ml-1">
                  {item.original_title.length > 17
                    ? item.original_title.slice(0, 17) + "..."
                    : item.original_title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
