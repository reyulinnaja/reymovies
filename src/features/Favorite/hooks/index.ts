import { useNavbarStore } from "@/hooks/useNavbarStore";
import { axiosInstance } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { shallow } from "zustand/shallow";

export const useFavoriteMoviesQuery = () => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useInfiniteQuery(
    ["favoriteMovies", userId],
    async ({ pageParam = 1 }) => {
      const responseFavoriteMovies = await axiosInstance.get(
        `/account/${userId}/favorite/movies?page=${pageParam}`,
      );

      const favoriteMovies = responseFavoriteMovies.data.results.map(
        (movie: any) => {
          return {
            ...movie,
            favorite: true,
          };
        },
      );

      return {
        ...responseFavoriteMovies.data,
        results: favoriteMovies,
      };
    },
  );
};

export const useFavoriteTvSeriesQuery = () => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useInfiniteQuery(
    ["favoriteTvSeries", userId],
    async ({ pageParam = 1 }) => {
      const responseFavoriteTvSeries = await axiosInstance.get(
        `/account/${userId}/favorite/tv?page=${pageParam}`,
      );

      const favoriteTvSeries = responseFavoriteTvSeries.data.results.map(
        (tv: any) => {
          return {
            ...tv,
            favorite: true,
          };
        },
      );

      return {
        ...responseFavoriteTvSeries.data,
        results: favoriteTvSeries,
      };
    },
  );
};
