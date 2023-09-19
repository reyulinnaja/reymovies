import { getFavoriteMovies } from "@/services/FavoriteServices";
import {
  getDiscoverMovies,
  getPopularMovies,
  getSearchMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/services/MoviesServices";
import type {
  DiscoverMoviesParams,
  SearchMoviesParams,
} from "@/services/MoviesServices";
import { mapDatasWithFavorite } from "@/domains/Favorite";

interface DiscoverMoviesUseCase extends DiscoverMoviesParams {
  userId: number;
}

interface SearchMoviesUseCase extends SearchMoviesParams {
  userId: number;
}

export const getDiscoverMoviesUseCase = async ({
  userId,
  pageParam,
  sortName,
  sortBy,
  includeAdult,
  includeVideo,
}: DiscoverMoviesUseCase) => {
  const responseDiscover = await getDiscoverMovies({
    pageParam,
    sortName,
    sortBy,
    includeAdult,
    includeVideo,
  });
  const responseFavorite = await getFavoriteMovies(userId);

  const favoriteMovies = responseFavorite.data.results.map(
    (movie: any) => movie.id,
  );

  const discoverMovies = mapDatasWithFavorite(
    responseDiscover.data.results,
    favoriteMovies,
  );

  return {
    ...responseDiscover.data,
    results: discoverMovies,
  };
};

export const getSearchMoviesUseCase = async ({
  query,
  pageParam,
  userId,
}: SearchMoviesUseCase) => {
  const responseSearch = await getSearchMovies({ query, pageParam });

  const responseFavorite = await getFavoriteMovies(userId);

  const favoriteMovies = responseFavorite.data.results.map(
    (movie: any) => movie.id,
  );

  const searchMovies = mapDatasWithFavorite(
    responseSearch.data.results,
    favoriteMovies,
  );

  return {
    ...responseSearch.data,
    results: searchMovies,
  };
};

export const getPopularMoviesUseCase = async (userId: number) => {
  const responsePopular = await getPopularMovies();
  const responseFavorite = await getFavoriteMovies(userId);

  const favoriteMovies = responseFavorite.data.results.map(
    (movie: any) => movie.id,
  );

  const popularMovies = mapDatasWithFavorite(
    responsePopular.data.results,
    favoriteMovies,
  );

  return popularMovies.slice(0, 10);
};

export const getTopRatedMoviesUseCase = async (userId: number) => {
  const responseTopRatedMovies = await getTopRatedMovies();
  const responseFavorite = await getFavoriteMovies(userId);

  const favoriteMovies = responseFavorite.data.results.map(
    (movie: any) => movie.id,
  );

  const topRatedMovies = mapDatasWithFavorite(
    responseTopRatedMovies.data.results,
    favoriteMovies,
  );

  return topRatedMovies.slice(0, 10);
};

export const getUpcomingMoviesUseCase = async (userId: number) => {
  const responseUpcomingMovies = await getUpcomingMovies();
  const responseFavorite = await getFavoriteMovies(userId);

  const favoriteMovies = responseFavorite.data.results.map(
    (movie: any) => movie.id,
  );

  const upcomingMovies = mapDatasWithFavorite(
    responseUpcomingMovies.data.results,
    favoriteMovies,
  );

  return upcomingMovies.slice(0, 10);
};
