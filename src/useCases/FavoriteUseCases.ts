import { mapDatasWithFavorite } from "@/domains/Favorite";
import {
  getFavoriteMoviesList,
  getFavoriteTvSeriesList,
  postFavorite,
} from "@/services/FavoriteServices";
import type {
  getFavoriteMoviesParams,
  postFavoriteParams,
} from "@/services/FavoriteServices";

export const addMovieToFavoriteUseCase = async ({
  userId,
  movieId,
}: postFavoriteParams) => {
  const response = await postFavorite({
    userId,
    mediaType: "movie",
    movieId,
    isFavorite: true,
  });
  return response.data;
};

export const removeMovieFromFavoriteUseCase = async ({
  userId,
  movieId,
}: postFavoriteParams) => {
  const response = await postFavorite({
    userId,
    mediaType: "movie",
    movieId,
    isFavorite: false,
  });
  return response.data;
};

export const addTvSeriesToFavoriteUseCase = async ({
  userId,
  tvId,
}: postFavoriteParams) => {
  const response = await postFavorite({
    userId,
    mediaType: "tv",
    movieId: tvId,
    isFavorite: true,
  });
  return response.data;
};

export const removeTvSeriesFromFavoriteUseCase = async ({
  userId,
  tvId,
}: postFavoriteParams) => {
  const response = await postFavorite({
    userId,
    mediaType: "tv",
    movieId: tvId,
    isFavorite: false,
  });
  return response.data;
};

export const getFavoriteMoviesUseCase = async ({
  userId,
  pageParam,
}: getFavoriteMoviesParams) => {
  const response = await getFavoriteMoviesList({
    userId,
    pageParam,
  });

  const favoriteMovies = response.data.results.map((movie: any) => {
    return {
      ...movie,
      favorite: true,
    };
  });

  return {
    ...response.data,
    results: favoriteMovies,
  };
};

export const getFavoriteTvSeriesUseCase = async ({
  userId,
  pageParam,
}: getFavoriteMoviesParams) => {
  const response = await getFavoriteTvSeriesList({
    userId,
    pageParam,
  });

  const favoriteTvSeries = response.data.results.map((tv: any) => {
    return {
      ...tv,
      favorite: true,
    };
  });

  return {
    ...response.data,
    results: favoriteTvSeries,
  };
};
