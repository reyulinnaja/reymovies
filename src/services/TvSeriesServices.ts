import { axiosInstance } from "@/lib/axios";

export interface DiscoverTvSeriesParams {
  pageParam: number;
  sortName: string;
  sortBy: string;
  includeAdult: boolean;
}

export interface SearchTvSeriesParams {
  query: string;
  pageParam: number;
}

export const getDiscoverTvSeries = ({
  pageParam,
  sortName,
  sortBy,
  includeAdult,
}: DiscoverTvSeriesParams) => {
  return axiosInstance.get(
    `/discover/tv?page=${pageParam}&sort_by=${sortName}.${sortBy}&include_adult=${includeAdult}`,
  );
};

export const getSearchTvSeries = ({
  query,
  pageParam,
}: SearchTvSeriesParams) => {
  return axiosInstance.get(`/search/tv?page=${pageParam}&query=${query}`);
};

export const getPopularTvSeries = () => {
  return axiosInstance.get(`/tv/popular`);
};

export const getTopRatedTvSeries = () => {
  return axiosInstance.get(`/tv/top_rated`);
};
