import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import {
  getDiscoverTvSeriesUseCase,
  getSearchTvSeriesUseCase,
} from "@/useCases/TvSeriesCases";
import {
  addTvSeriesToFavoriteUseCase,
  removeTvSeriesFromFavoriteUseCase,
} from "@/useCases/FavoriteUseCases";

export const useDiscoverTvSeriesQuery = ({
  userId,
  sortName,
  sortBy,
  includeAdult,
}: any) => {
  return useInfiniteQuery(
    ["discover_tv", sortName, sortBy, userId],
    async ({ pageParam = 1 }) =>
      getDiscoverTvSeriesUseCase({
        userId,
        pageParam,
        sortName,
        sortBy,
        includeAdult,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};

export const useSearchTvSeriesQuery = ({ query, userId }: any) => {
  return useInfiniteQuery(
    ["search_tv", query, userId],
    async ({ pageParam = 1 }) =>
      getSearchTvSeriesUseCase({ query, pageParam, userId }),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};

export const useAddTvSeriesToFavorite = (
  userId: number,
  refetch: () => void,
) => {
  return useMutation({
    mutationFn: async (tvId: number) =>
      addTvSeriesToFavoriteUseCase({ userId, tvId }),
    onSuccess: (data) => {
      toast({
        description: data.status_message,
      });
      refetch();
    },
  });
};

export const useRemoveTvSeriesFromFavorite = (
  userId: number,
  refetch: () => void,
) => {
  return useMutation({
    mutationFn: async (tvId: number) =>
      removeTvSeriesFromFavoriteUseCase({ userId, tvId }),
    onSuccess: (data) => {
      toast({
        description: data.status_message,
      });
      refetch();
    },
  });
};
