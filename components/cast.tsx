import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { image185 } from "../api/moviedb";
import { fallbackPersonImage } from "../constant";

export default function Cast({ cast }: any) {
  // console.log(cast);

  return (
    <View className="mt-6 mb-10">
      <Text className="text-white text-xl">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {cast &&
          cast.map((item: any, index: any) => {
            return (
              <TouchableOpacity key={index} className="mr-4 items-center">
                <View className="rounded-full overflow-hidden h-20 w-20 mt-3">
                  <Image
                    className="w-full h-full"
                    // source={require("../assets/profile.jpg")}
                    source={{ uri: image185(item?.profile_path) || fallbackPersonImage }}
                  />
                </View>
                <Text className="text-white mt-3">
                  {item?.character.length > 10
                    ? item.character.slice(0, 10) + "..."
                    : item.character}
                </Text>
                <Text className="text-neutral-400 mt-1">
                  {item?.name.length > 10
                    ? item?.name.slice(0, 10) + "..."
                    : item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
