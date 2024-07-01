import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_MOVIES_KEY = "FAVORITE_MOVIES";

export const saveFavoriteMovie = async (movie: any) => {
  try {
    const existingFavorites = await getFavoriteMovies();
    const updatedFavorites = [...existingFavorites, movie];
    const jsonValue = JSON.stringify(updatedFavorites);
    await AsyncStorage.setItem(FAVORITE_MOVIES_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save favorite movie", e);
  }
};

export const getFavoriteMovies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITE_MOVIES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to get favorite movies", e);
    return [];
  }
};
