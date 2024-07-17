import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";
import { robotoWeights } from "react-native-typography";

const ios = Platform.OS === "ios";
const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation: any = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getPopularMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data?.results) setTrending(data?.results);
    // console.log(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data?.results) setUpcoming(data?.results);
    setLoading(false);
  };

  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    if (data && data?.results) setPopular(data?.results);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar barStyle="light-content" />
        <View className="flex-row items-center p-4 justify-between">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="bars" color="white" size={30} />
          </TouchableOpacity>
          <Text
            style={robotoWeights.condensedBold}
            className="text-white font-bold text-3xl"
          >
            Movie<Text className="text-red-500">App</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon name="magnifying-glass" color="white" size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {/* Popular movies */}
          {popular.length > 0 && <MovieList title="Popular" data={popular} />}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
