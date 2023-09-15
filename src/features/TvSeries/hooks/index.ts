import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useDiscoverTvSeriesQuery = () => {
  const [sortName, sortBy, includeAdult] = useNavbarStore(
    (state) => [state.sortName, state.sortBy, state.includeAdult],
    shallow,
  );

  return useInfiniteQuery(
    ["discover_tv", sortName, sortBy],
    async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/discover/tv?page=${pageParam}&sort_by=${sortName}.${sortBy}&include_adult=${includeAdult}`,
      );
      return response.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};

export const useSearchTvSeriesQuery = (query: string) => {
  return useInfiniteQuery(
    ["search_tv", query],
    async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/search/tv?page=${pageParam}&query=${query}`,
      );
      return response.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};
