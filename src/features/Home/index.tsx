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

const Home: React.FC = () => {
  const { data: dataCarausel, isLoading: loadingCarausel } =
    useCarauselMoviesQuery();

  const { data: dataPopularMovies, isLoading: loadingPopularMovies } =
    usePopularMoviesQuery();

  const { data: dataTopRatedMovies, isLoading: loadingTopRatedMovies } =
    useTopRatedMoviesQuery();

  const { data: dataUpcomingMovies, isLoading: loadingUpcomingMovies } =
    useUpcomingMoviesQuery();

  const { data: dataPopularTv, isLoading: loadingPopularTv } =
    usePopularTvQuery();

  const { data: dataTopRatedTv, isLoading: loadingTopRatedTv } =
    useTopRatedTvQuery();

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
            <CardList data={dataPopularMovies} />
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
            <CardList data={dataTopRatedMovies} />
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
            <CardList data={dataUpcomingMovies} />
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
            <CardList data={dataPopularTv} />
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
            <CardList data={dataTopRatedTv} />
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default Home;
