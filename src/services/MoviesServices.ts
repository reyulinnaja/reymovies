import { axiosInstance } from "@/lib/axios";

export interface DiscoverMoviesParams {
  pageParam: number;
  sortName: string;
  sortBy: string;
  includeAdult: boolean;
  includeVideo: boolean;
}

export interface SearchMoviesParams {
  query: string;
  pageParam: number;
}

export const getDiscoverMovies = ({
  pageParam,
  sortName,
  sortBy,
  includeAdult,
  includeVideo,
}: DiscoverMoviesParams) => {
  return axiosInstance.get(
    `/discover/movie?page=${pageParam}&sort_by=${sortName}.${sortBy}&include_adult=${includeAdult}&include_video=${includeVideo}`,
  );
};

export const getSearchMovies = ({ query, pageParam }: SearchMoviesParams) => {
  return axiosInstance.get(`/search/movie?page=${pageParam}&query=${query}`);
};

export const getPopularMovies = () => {
  return axiosInstance.get(`/movie/popular`);
};

export const getTopRatedMovies = () => {
  return axiosInstance.get(`/movie/top_rated`);
};

export const getNowPlayingMovies = () => {
  return axiosInstance.get(`/movie/now_playing`);
};

export const getUpcomingMovies = () => {
  return axiosInstance.get(`/movie/upcoming`);
};
