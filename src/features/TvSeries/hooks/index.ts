import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { stat } from "fs";

export const useDiscoverTvSeriesQuery = () => {
  const [sortName, sortBy, includeAdult, userId] = useNavbarStore(
    (state) => [state.sortName, state.sortBy, state.includeAdult, state.userId],
    shallow,
  );

  return useInfiniteQuery(
    ["discover_tv", sortName, sortBy, userId],
    async ({ pageParam = 1 }) => {
      const responseDiscover = await axiosInstance.get(
        `/discover/tv?page=${pageParam}&sort_by=${sortName}.${sortBy}&include_adult=${includeAdult}`,
      );
      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/tv`,
      );

      const favoriteTvSeries = responseFavorite.data.results.map(
        (tv: any) => tv.id,
      );

      const discoverTvSeries = responseDiscover.data.results.map((tv: any) => {
        if (favoriteTvSeries.includes(tv.id)) {
          return {
            ...tv,
            favorite: true,
          };
        }
        return tv;
      });

      return {
        ...responseDiscover.data,
        results: discoverTvSeries,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};

export const useSearchTvSeriesQuery = (query: string) => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  return useInfiniteQuery(
    ["search_tv", query, userId],
    async ({ pageParam = 1 }) => {
      const responseSearch = await axiosInstance.get(
        `/search/tv?page=${pageParam}&query=${query}`,
      );
      const responseFavorite = await axiosInstance.get(
        `/account/${userId}/favorite/tv`,
      );

      const favoriteTvSeries = responseFavorite.data.results.map(
        (tv: any) => tv.id,
      );

      const searchTvSeries = responseSearch.data.results.map((tv: any) => {
        if (favoriteTvSeries.includes(tv.id)) {
          return {
            ...tv,
            favorite: true,
          };
        }
        return tv;
      });

      return {
        ...responseSearch.data,
        results: searchTvSeries,
      };
    },
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
    mutationFn: async (tvId: number) => {
      const response = await axiosInstance.post(`/account/${userId}/favorite`, {
        media_type: "tv",
        media_id: tvId,
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

export const useRemoveTvSeriesFromFavorite = (
  userId: number,
  refetch: () => void,
) => {
  return useMutation({
    mutationFn: async (tvId: number) => {
      const response = await axiosInstance.post(`/account/${userId}/favorite`, {
        media_type: "tv",
        media_id: tvId,
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
