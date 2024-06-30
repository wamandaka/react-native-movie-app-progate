import axios from "axios";
import { API_KEY } from "../constant/index";

// endpoints
const BASE_URL = "https://api.themoviedb.org/3";
const trendingMovies = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMovies = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`;
const popularMovies = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const searchMovies = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

// dynamic endpoint
const movieDetails = (id: any) => `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
const movieCredits = (id: any) =>
  `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMovies = (id: any) =>
  `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`;

export const image500: any = (path: any) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342: any = (path: any) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185: any = (path: any) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint: string, params: any) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMovies, {});
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMovies, {});
};

export const fetchPopularMovies = () => {
  return apiCall(popularMovies, {});
};

export const fetchMovieDetails = (id: any) => {
  return apiCall(movieDetails(id), {});
};

export const fetchMovieCredits = (id: any) => {
  return apiCall(movieCredits(id), {});
};

export const fetchSimilarMovies = (id: any) => {
  return apiCall(similarMovies(id), {});
};

export const fetchSearchMovie = (params: any) => {
  return apiCall(searchMovies, params);
};
