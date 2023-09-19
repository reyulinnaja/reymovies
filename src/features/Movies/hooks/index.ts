import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";

export const useDiscoverMoviesQuery = () => {
  const [sortName, sortBy, includeAdult, includeVideo, userId] = useNavbarStore(
    (state) => [
      state.sortName,
      state.sortBy,
      state.includeAdult,
      state.includeVideo,
      state.userId,
    ],
    shallow,
  );

  return useInfiniteQuery(
    ["discover_movie", sortName, sortBy, includeAdult, includeVideo, userId],
    async ({ pageParam = 1 }) => {
      const responseDiscover = await axiosInstance.get(
        `/discover/movie?page=${pageParam}&sort_by=${sortName}.${sortBy}&include_adult=${includeAdult}&include_video=${includeVideo}`,
      );
      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/movies`,
      );

      const favoriteMovies = responseFavorite.data.results.map(
        (movie: any) => movie.id,
      );

      const discoverMovies = responseDiscover.data.results.map((movie: any) => {
        if (favoriteMovies.includes(movie.id)) {
          return {
            ...movie,
            favorite: true,
          };
        }
        return movie;
      });

      return {
        ...responseDiscover.data,
        results: discoverMovies,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};

export const useSearchMoviesQuery = (query: string) => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useInfiniteQuery(
    ["search_movie", query, userId],
    async ({ pageParam = 1 }) => {
      const responseSearch = await axiosInstance.get(
        `/search/movie?page=${pageParam}&query=${query}`,
      );

      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/movies`,
      );

      const favoriteMovies = responseFavorite.data.results.map(
        (movie: any) => movie.id,
      );

      const searchMovies = responseSearch.data.results.map((movie: any) => {
        if (favoriteMovies.includes(movie.id)) {
          return {
            ...movie,
            favorite: true,
          };
        }
        return movie;
      });

      return {
        ...responseSearch.data,
        results: searchMovies,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};

export const useAddMovieToFavorite = (userId: number, refetch: () => void) => {
  return useMutation({
    mutationFn: async (movieId: number) => {
      const response = await axiosInstance.post(`/account/${userId}/favorite`, {
        media_type: "movie",
        media_id: movieId,
        favorite: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        description: data.status_message,
      });
      refetch();
    },
  });
};

export const useRemoveMovieFromFavorite = (
  userId: number,
  refetch: () => void,
) => {
  return useMutation({
    mutationFn: async (movieId: number) => {
      const response = await axiosInstance.post(`/account/${userId}/favorite`, {
        media_type: "movie",
        media_id: movieId,
        favorite: false,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        description: data.status_message,
      });
      refetch();
    },
  });
};
