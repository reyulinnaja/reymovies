import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useDiscoverMoviesQuery = () => {
  const [sortName, sortBy, includeAdult, includeVideo] = useNavbarStore(
    (state) => [
      state.sortName,
      state.sortBy,
      state.includeAdult,
      state.includeVideo,
    ],
    shallow,
  );
  return useInfiniteQuery(
    ["discover_movie", sortName, sortBy, includeAdult, includeVideo],
    async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/discover/movie?page=${pageParam}&sort_by=${sortName}.${sortBy}&include_adult=${includeAdult}&include_video=${includeVideo}`,
      );
      return response.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};
