import React from "react";
import Link from "next/link";
import { BaseHeader } from "@/components/common";
import {
  useCarauselMoviesQuery,
  usePopularMoviesQuery,
  usePopularTvQuery,
  useTopRatedMoviesQuery,
  useTopRatedTvQuery,
  useUpcomingMoviesQuery,
} from "./hooks";
import CarauselMovies from "./sections/Carausel";
import CardList from "./sections/CardList";
import {
  useAddMovieToFavorite,
  useRemoveMovieFromFavorite,
} from "../Movies/hooks";
import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";
import {
  useAddTvSeriesToFavorite,
  useRemoveTvSeriesFromFavorite,
} from "../TvSeries/hooks";

const Home: React.FC = () => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  const { data: dataCarausel, isLoading: loadingCarausel } =
    useCarauselMoviesQuery();

  const {
    data: dataPopularMovies,
    isLoading: loadingPopularMovies,
    refetch: refetchPopularMovies,
  } = usePopularMoviesQuery();

  const {
    data: dataTopRatedMovies,
    isLoading: loadingTopRatedMovies,
    refetch: refetchTopRatedMovies,
  } = useTopRatedMoviesQuery();

  const {
    data: dataUpcomingMovies,
    isLoading: loadingUpcomingMovies,
    refetch: refetchUpcomingMovies,
  } = useUpcomingMoviesQuery();

  const {
    data: dataPopularTv,
    isLoading: loadingPopularTv,
    refetch: refetchPopularTv,
  } = usePopularTvQuery();

  const {
    data: dataTopRatedTv,
    isLoading: loadingTopRatedTv,
    refetch: refetchTopRatedTv,
  } = useTopRatedTvQuery();

  const { mutate: addFavoriteMovie } = useAddMovieToFavorite(userId, () => {
    refetchPopularMovies();
    refetchTopRatedMovies();
    refetchUpcomingMovies();
  });

  const { mutate: removeFavoriteMovie } = useRemoveMovieFromFavorite(
    userId,
    () => {
      refetchPopularMovies();
      refetchTopRatedMovies();
      refetchUpcomingMovies();
    },
  );

  const { mutate: addFavoriteTv } = useAddTvSeriesToFavorite(userId, () => {
    refetchPopularTv();
    refetchTopRatedTv();
  });

  const { mutate: removeFavoriteTv } = useRemoveTvSeriesFromFavorite(
    userId,
    () => {
      refetchPopularTv();
      refetchTopRatedTv();
    },
  );

  return (
    <React.Fragment>
      <BaseHeader title="ReyMovies" />
      <>
        {loadingCarausel ? (
          <p>Loading...</p>
        ) : (
          <CarauselMovies data={dataCarausel} />
        )}

        <div className="mt-14">
          <div className="inline-flex w-full items-center justify-between pb-4 font-semibold">
            <h2 className="text-lg">Popular Movies</h2>
            <Link href="/movies" className="text-sm hover:underline">
              See all
            </Link>
          </div>
          {loadingPopularMovies ? (
            <p>Loading Popular...</p>
          ) : (
            <CardList
              data={dataPopularMovies}
              addFavorite={addFavoriteMovie}
              removeFavorite={removeFavoriteMovie}
            />
          )}
        </div>

        <div className="mt-14">
          <div className="inline-flex w-full items-center justify-between pb-4 font-semibold">
            <h2 className="text-lg">Top Rated Movies</h2>
            <Link href="/movies" className="text-sm hover:underline">
              See all
            </Link>
          </div>
          {loadingTopRatedMovies ? (
            <p>Loading TopRated...</p>
          ) : (
            <CardList
              data={dataTopRatedMovies}
              addFavorite={addFavoriteMovie}
              removeFavorite={removeFavoriteMovie}
            />
          )}
        </div>

        <div className="mt-14">
          <div className="inline-flex w-full items-center justify-between pb-4 font-semibold">
            <h2 className="text-lg">Upcoming Movies</h2>
            <Link href="/movies" className="text-sm hover:underline">
              See all
            </Link>
          </div>
          {loadingUpcomingMovies ? (
            <p>Loading Upcoming...</p>
          ) : (
            <CardList
              data={dataUpcomingMovies}
              addFavorite={addFavoriteMovie}
              removeFavorite={removeFavoriteMovie}
            />
          )}
        </div>

        <div className="mt-14">
          <div className="inline-flex w-full items-center justify-between pb-4 font-semibold">
            <h2 className="text-lg">Popular TV Series</h2>
            <Link href="/tvseries" className="text-sm hover:underline">
              See all
            </Link>
          </div>
          {loadingPopularTv ? (
            <p>Loading Popular TV...</p>
          ) : (
            <CardList
              data={dataPopularTv}
              addFavorite={addFavoriteTv}
              removeFavorite={removeFavoriteTv}
            />
          )}
        </div>

        <div className="mt-14">
          <div className="inline-flex w-full items-center justify-between pb-4 font-semibold">
            <h2 className="text-lg">Top Rated TV Series</h2>
            <Link href="/tvseries" className="text-sm hover:underline">
              See all
            </Link>
          </div>
          {loadingTopRatedTv ? (
            <p>Loading Top Rated TV...</p>
          ) : (
            <CardList
              data={dataTopRatedTv}
              addFavorite={addFavoriteTv}
              removeFavorite={removeFavoriteTv}
            />
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default Home;
