import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

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

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/movie/popular`);
      return response.data.results.slice(0, 10);
    },
    queryKey: ["popular_movies"],
  });
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/movie/top_rated");
      return response.data.results.slice(0, 10);
    },
    queryKey: ["top_rated_movies"],
  });
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/movie/upcoming");
      return response.data.results.slice(10, 20);
    },
    queryKey: ["upcoming_movies"],
  });
};

export const usePopularTvQuery = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/tv/popular");
      return response.data.results.slice(0, 10);
    },
    queryKey: ["popular_tv"],
  });
};

export const useTopRatedTvQuery = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("tv/top_rated");
      return response.data.results.slice(0, 10);
    },
    queryKey: ["top_rated_tv"],
  });
};
