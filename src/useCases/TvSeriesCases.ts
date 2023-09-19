import { mapDatasWithFavorite } from "@/domains/Favorite";
import { getFavoriteTvSeries } from "@/services/FavoriteServices";
import {
  getDiscoverTvSeries,
  type DiscoverTvSeriesParams,
  type SearchTvSeriesParams,
  getSearchTvSeries,
  getPopularTvSeries,
  getTopRatedTvSeries,
} from "@/services/TvSeriesServices";

interface DiscoverTvSeriesUseCase extends DiscoverTvSeriesParams {
  userId: number;
}

interface SearchTvSeriesUseCase extends SearchTvSeriesParams {
  userId: number;
}

export const getDiscoverTvSeriesUseCase = async ({
  userId,
  pageParam,
  sortName,
  sortBy,
  includeAdult,
}: DiscoverTvSeriesUseCase) => {
  const responseDiscover = await getDiscoverTvSeries({
    pageParam,
    sortName,
    sortBy,
    includeAdult,
  });

  const responseFavorite = await getFavoriteTvSeries(userId);

  const favoriteTvSeries = responseFavorite.data.results.map(
    (tv: any) => tv.id,
  );

  const discoverTvSeries = mapDatasWithFavorite(
    responseDiscover.data.results,
    favoriteTvSeries,
  );

  return {
    ...responseDiscover.data,
    results: discoverTvSeries,
  };
};

export const getSearchTvSeriesUseCase = async ({
  query,
  pageParam,
  userId,
}: SearchTvSeriesUseCase) => {
  const responseSearch = await getSearchTvSeries({
    query,
    pageParam,
  });

  const responseFavorite = await getFavoriteTvSeries(userId);

  const favoriteTvSeries = responseFavorite.data.results.map(
    (tv: any) => tv.id,
  );

  const searchTvSeries = mapDatasWithFavorite(
    responseSearch.data.results,
    favoriteTvSeries,
  );

  return {
    ...responseSearch.data,
    results: searchTvSeries,
  };
};

export const getPopularTvSeriesUseCase = async (userId: number) => {
  const responsePopularTv = await getPopularTvSeries();
  const responseFavorite = await getFavoriteTvSeries(userId);

  const favoriteTvSeries = responseFavorite.data.results.map(
    (tv: any) => tv.id,
  );

  const popularTvSeries = mapDatasWithFavorite(
    responsePopularTv.data.results,
    favoriteTvSeries,
  );

  return popularTvSeries.slice(0, 10);
};

export const getTopRatedTvSeriesUseCase = async (userId: number) => {
  const responseTopRatedTv = await getTopRatedTvSeries();
  const responseFavorite = await getFavoriteTvSeries(userId);

  const favoriteTvSeries = responseFavorite.data.results.map(
    (tv: any) => tv.id,
  );

  const topRatedTvSeries = mapDatasWithFavorite(
    responseTopRatedTv.data.results,
    favoriteTvSeries,
  );

  return topRatedTvSeries.slice(0, 10);
};
