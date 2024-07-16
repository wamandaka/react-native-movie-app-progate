import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_MOVIES_KEY = "FAVORITE_MOVIES";

// Fungsi untuk menyimpan film favorit
export const saveFavoriteMovie = async (movie: any) => {
  try {
    const favorites = await getFavoriteMovies(); // Mengambil film favorit yang sudah ada
    favorites.push(movie); // Menambahkan film baru ke daftar favorit
    await AsyncStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(favorites)); // Menyimpan kembali daftar favorit yang telah diperbarui ke AsyncStorage
  } catch (error) {
    console.error("Failed to save favorite movie", error); // Menampilkan pesan error jika gagal menyimpan
  }
};

// Fungsi untuk mengambil daftar film favorit
export const getFavoriteMovies = async () => {
  try {
    const storedFavorites = await AsyncStorage.getItem(FAVORITE_MOVIES_KEY); // Mengambil data dari AsyncStorage
    return storedFavorites ? JSON.parse(storedFavorites) : []; // Mengembalikan data dalam bentuk array atau array kosong jika tidak ada data
  } catch (error) {
    console.error("Failed to get favorite movies", error); // Menampilkan pesan error jika gagal mengambil data
    return []; // Mengembalikan array kosong jika terjadi kesalahan
  }
};

// Fungsi untuk menghapus film favorit
export const removeFavoriteMovie = async (movieId: any) => {
  try {
    let favorites = await getFavoriteMovies(); // Mengambil daftar film favorit
    favorites = favorites.filter((movie: { id: any; }) => movie.id !== movieId); // Menyaring daftar untuk menghapus film dengan ID yang sesuai
    await AsyncStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(favorites)); // Menyimpan kembali daftar favorit yang telah diperbarui ke AsyncStorage
  } catch (error) {
    console.error("Failed to remove favorite movie", error); // Menampilkan pesan error jika gagal menghapus
  }
};
