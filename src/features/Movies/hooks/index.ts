import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useDiscoverMovies = () => {
  const [sortName, sortBy, includeAdultMovie, includeVideo] = useNavbarStore(
    (state) => [
      state.sortName,
      state.sortBy,
      state.includeAdultMovie,
      state.includeVideo,
    ],
    shallow,
  );
  return useInfiniteQuery(
    ["discover_movie", sortName, sortBy, includeAdultMovie, includeVideo],
    async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/discover/movie?page=${pageParam}&sort_by=${sortName}.${sortBy}&include_adult=${includeAdultMovie}&include_video=${includeVideo}`,
      );
      return response.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    },
  );
};
