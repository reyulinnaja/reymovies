import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  getPopularMoviesUseCase,
  getTopRatedMoviesUseCase,
  getUpcomingMoviesUseCase,
} from "@/useCases/MoviesUseCases";
import {
  getPopularTvSeriesUseCase,
  getTopRatedTvSeriesUseCase,
} from "@/useCases/TvSeriesCases";

export const useCarauselMoviesQuery = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/movie/now_playing");

      const result = response.data.results.slice(0, 7);
      return result;
    },
    queryKey: ["now_playing"],
  });
};

export const usePopularMoviesQuery = (userId: number) => {
  return useQuery({
    queryFn: async () => getPopularMoviesUseCase(userId),
    queryKey: ["popular_movies", userId],
  });
};

export const useTopRatedMoviesQuery = (userId: number) => {
  return useQuery({
    queryFn: async () => getTopRatedMoviesUseCase(userId),
    queryKey: ["top_rated_movies", userId],
  });
};

export const useUpcomingMoviesQuery = (userId: number) => {
  return useQuery({
    queryFn: async () => getUpcomingMoviesUseCase(userId),
    queryKey: ["upcoming_movies", userId],
  });
};

export const usePopularTvQuery = (userId: number) => {
  return useQuery({
    queryFn: async () => getPopularTvSeriesUseCase(userId),
    queryKey: ["popular_tv", userId],
  });
};

export const useTopRatedTvQuery = (userId: number) => {
  return useQuery({
    queryFn: async () => getTopRatedTvSeriesUseCase(userId),
    queryKey: ["top_rated_tv", userId],
  });
};
