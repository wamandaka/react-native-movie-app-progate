import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import debounce from "lodash/debounce";
import { fetchSearchMovie, image342 } from "../api/moviedb";
import { includes } from "lodash";

export default function SearchScreen() {
  const navigation: any = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = (value: any) => {
    // console.log(value);
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovie({
        query: value,
        page: 1,
        include_adult: false,
        language: "en-US",
      }).then((data) => {
        setLoading(false);
        // console.log(data);
        if (data && data?.results) setResults(data?.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="p-4 text-base text-white"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="p-6 m-1 rounded-full bg-neutral-500"
        >
          <Icon name="xmark" color="white" size={20} />
        </TouchableOpacity>
      </View>
      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-4">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item: any, index: any) => {
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
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white font-semibold">No data found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
