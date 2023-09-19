import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import {
  getDiscoverMoviesUseCase,
  getSearchMoviesUseCase,
} from "@/useCases/MoviesUseCases";
import {
  addMovieToFavoriteUseCase,
  removeMovieFromFavoriteUseCase,
} from "@/useCases/FavoriteUseCases";

export const useDiscoverMoviesQuery = ({
  userId,
  sortName,
  sortBy,
  includeAdult,
  includeVideo,
}: any) => {
  return useInfiniteQuery(
    ["discover_movie", sortName, sortBy, includeAdult, includeVideo, userId],
    async ({ pageParam = 1 }) =>
      getDiscoverMoviesUseCase({
        userId,
        pageParam,
        sortName,
        sortBy,
        includeAdult,
        includeVideo,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};

export const useSearchMoviesQuery = ({ query, userId }: any) => {
  return useInfiniteQuery(
    ["search_movie", query, userId],
    async ({ pageParam = 1 }) =>
      getSearchMoviesUseCase({ query, pageParam, userId }),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};

export const useAddMovieToFavorite = (userId: number, refetch: () => void) => {
  return useMutation({
    mutationFn: async (movieId: number) =>
      addMovieToFavoriteUseCase({ userId, movieId }),
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
    mutationFn: async (movieId: number) =>
      removeMovieFromFavoriteUseCase({ userId, movieId }),
    onSuccess: (data) => {
      toast({
        description: data.status_message,
      });
      refetch();
    },
  });
};
