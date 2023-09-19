import {
  getFavoriteMoviesUseCase,
  getFavoriteTvSeriesUseCase,
} from "@/useCases/FavoriteUseCases";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFavoriteMoviesQuery = (userId: number) => {
  return useInfiniteQuery(
    ["favoriteMovies", userId],
    async ({ pageParam = 1 }) =>
      getFavoriteMoviesUseCase({ userId, pageParam }),
  );
};

export const useFavoriteTvSeriesQuery = (userId: number) => {
  return useInfiniteQuery(
    ["favoriteTvSeries", userId],
    async ({ pageParam = 1 }) =>
      getFavoriteTvSeriesUseCase({ userId, pageParam }),
  );
};
