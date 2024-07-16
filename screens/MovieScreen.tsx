import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";
import {
  saveFavoriteMovie,
  getFavoriteMovies,
  removeFavoriteMovie,
} from "../constant/storage";

export default function MovieScreen() {
  // let movieName = "Dungon Meshi: The Animation";
  const { width, height } = Dimensions.get("window");
  const { params: item }: any = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie]: any = useState({});
  const navigation: any = useNavigation();

  useEffect(() => {
    // console.log(item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    checkIfFavorite(item.id);
  }, [item]);
  const getMovieDetails = async (id: any) => {
    const data = await fetchMovieDetails(id);
    // console.log(data);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id: any) => {
    const data = await fetchMovieCredits(id);
    // console.log(data);

    if (data && data?.cast) setCast(data?.cast);
  };

  const getSimilarMovies = async (id: any) => {
    const data = await fetchSimilarMovies(id);
    if (data && data?.results) setSimilarMovies(data?.results);
  };

  const checkIfFavorite = async (id: any) => {
    const favoriteMovies = await getFavoriteMovies();
    const isFav = favoriteMovies.some((movie: any) => movie.id === id);
    setIsFavorite(isFav);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavoriteMovie(movie.id);
    } else {
      await saveFavoriteMovie(movie);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center p-4 mt-3">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-xl p-1 bg-orange-500"
          >
            <ChevronLeftIcon color="white" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite}>
            <HeartIcon color={isFavorite ? "red" : "white"} size={40} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/marcille.jpeg")}
              source={{ uri: image500(movie?.backdrop_path) }}
              style={{ width, height: height * 0.6 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.6 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0 w-full h-1/2"
            />
          </View>
        )}
      </View>
      {/* Mvie details */}
      <View className="px-4 space-y-4 -mt-24">
        <Text className="text-white text-3xl">{movie?.title}</Text>
        <View>
          <Text className="text-neutral-400">
            Released on {movie?.release_date}
          </Text>
          <Text className="text-neutral-400">
            Duration: {movie?.runtime} min
          </Text>
        </View>
        <Text className="text-white text-xl">Overview</Text>
        <Text className="text-neutral-400">{movie?.overview}</Text>

        {/* genres */}
        <Text className="text-white text-xl">Genres</Text>
        <View className="flex-row gap-x-2">
          {movie?.genres?.map((item: any, index: any) => {
            return (
              <Text className="text-neutral-400 flex-row" key={index}>
                {item.name}
              </Text>
            );
          })}
        </View>

        {/* cast */}
        {cast.length > 0 && <Cast cast={cast} />}
      </View>

      {/* similar movies */}
      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
}
