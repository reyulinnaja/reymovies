import { axiosInstance } from "@/lib/axios";

export interface postFavoriteParams {
  userId?: number;
  mediaType?: string;
  movieId?: number;
  tvId?: number;
  isFavorite?: boolean;
}

export interface getFavoriteMoviesParams {
  userId: number;
  pageParam?: number;
}

export const getFavoriteMovies = (userId: number) => {
  return axiosInstance.get(`/account/${userId}/favorite/movies`);
};

export const getFavoriteTvSeries = (userId: number) => {
  return axiosInstance.get(`/account/${userId}/favorite/tv`);
};

export const postFavorite = ({
  userId,
  mediaType,
  movieId,
  isFavorite,
}: postFavoriteParams) => {
  return axiosInstance.post(`/account/${userId}/favorite`, {
    media_type: `${mediaType}`,
    media_id: movieId,
    favorite: isFavorite,
  });
};

export const getFavoriteMoviesList = ({
  userId,
  pageParam,
}: getFavoriteMoviesParams) => {
  return axiosInstance.get(
    `/account/${userId}/favorite/movies?page=${pageParam}`,
  );
};

export const getFavoriteTvSeriesList = ({
  userId,
  pageParam,
}: getFavoriteMoviesParams) => {
  return axiosInstance.get(`/account/${userId}/favorite/tv?page=${pageParam}`);
};
