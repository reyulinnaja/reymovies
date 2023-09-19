import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";

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
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useQuery({
    queryFn: async () => {
      const responsePopularMovie = await axiosInstance.get(`/movie/popular`);
      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/movies`,
      );

      const favoriteMovies = responseFavorite.data.results.map(
        (movie: any) => movie.id,
      );

      const popularMovies = responsePopularMovie.data.results.map(
        (movie: any) => {
          if (favoriteMovies.includes(movie.id)) {
            return {
              ...movie,
              favorite: true,
            };
          }
          return movie;
        },
      );

      return popularMovies.slice(0, 10);
    },
    queryKey: ["popular_movies", userId],
  });
};

export const useTopRatedMoviesQuery = () => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useQuery({
    queryFn: async () => {
      const responseTopRatedMovies =
        await axiosInstance.get("/movie/top_rated");
      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/movies`,
      );

      const favoriteMovies = responseFavorite.data.results.map(
        (movie: any) => movie.id,
      );

      const topRatedMovies = responseTopRatedMovies.data.results.map(
        (movie: any) => {
          if (favoriteMovies.includes(movie.id)) {
            return {
              ...movie,
              favorite: true,
            };
          }
          return movie;
        },
      );

      return topRatedMovies.slice(0, 10);
    },
    queryKey: ["top_rated_movies", userId],
  });
};

export const useUpcomingMoviesQuery = () => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useQuery({
    queryFn: async () => {
      const responseUpcomingMovies = await axiosInstance.get("/movie/upcoming");
      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/movies`,
      );

      const favoriteMovies = responseFavorite.data.results.map(
        (movie: any) => movie.id,
      );

      const upcomingMovies = responseUpcomingMovies.data.results.map(
        (movie: any) => {
          if (favoriteMovies.includes(movie.id)) {
            return {
              ...movie,
              favorite: true,
            };
          }
          return movie;
        },
      );

      return upcomingMovies.slice(0, 10);
    },
    queryKey: ["upcoming_movies", userId],
  });
};

export const usePopularTvQuery = () => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useQuery({
    queryFn: async () => {
      const responsePopularTv = await axiosInstance.get("/tv/popular");
      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/tv`,
      );

      const favoriteTvSeries = responseFavorite.data.results.map(
        (tv: any) => tv.id,
      );

      const popularTv = responsePopularTv.data.results.map((tv: any) => {
        if (favoriteTvSeries.includes(tv.id)) {
          return {
            ...tv,
            favorite: true,
          };
        }
        return tv;
      });

      return popularTv.slice(0, 10);
    },
    queryKey: ["popular_tv"],
  });
};

export const useTopRatedTvQuery = () => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useQuery({
    queryFn: async () => {
      const responseTopRatedTv = await axiosInstance.get("tv/top_rated");
      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/tv`,
      );

      const favoriteTvSeries = responseFavorite.data.results.map(
        (tv: any) => tv.id,
      );

      const topRatedTv = responseTopRatedTv.data.results.map((tv: any) => {
        if (favoriteTvSeries.includes(tv.id)) {
          return {
            ...tv,
            favorite: true,
          };
        }
        return tv;
      });

      return topRatedTv.slice(0, 10);
    },
    queryKey: ["top_rated_tv"],
  });
};
