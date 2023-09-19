import React from "react";
import { useNavbarStore } from "@/hooks/useNavbarStore";
import { BaseHeader, Card } from "@/components/common";
import { shallow } from "zustand/shallow";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRemoveMovieFromFavorite } from "../Movies/hooks";
import { useRemoveTvSeriesFromFavorite } from "../TvSeries/hooks";
import { useFavoriteMoviesQuery, useFavoriteTvSeriesQuery } from "./hooks";

const Favorite: React.FC = () => {
  const [userId] = useNavbarStore((state) => [state.userId], shallow);

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useFavoriteMoviesQuery(userId);

  const {
    data: dataTvSeries,
    fetchNextPage: fetchNextPageTvSeries,
    hasNextPage: hasNextPageTvSeries,
    isLoading: isLoadingTvSeries,
    refetch: refetchTvSeries,
  } = useFavoriteTvSeriesQuery(userId);

  const { mutate: removeFavoriteMovie } = useRemoveMovieFromFavorite(
    userId,
    refetch,
  );

  const { mutate: removeFavoriteTvSeries } = useRemoveTvSeriesFromFavorite(
    userId,
    refetchTvSeries,
  );

  return (
    <React.Fragment>
      <BaseHeader title="Favorite - ReyMovies" />
      <div>
        <h1 className="text-2xl font-bold">Favorite Movies</h1>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data && (
            <InfiniteScroll
              dataLength={data.pages.length}
              next={fetchNextPage}
              hasMore={hasNextPage || false}
              loader={<h4>Loading...</h4>}
            >
              {data.pages.map((pageData, i) => (
                <div key={i} className="mt-3 grid grid-cols-5 gap-x-4 gap-y-3">
                  {pageData.results.length === 0 ? (
                    <p className="col-span-5 text-center">No favorite movies</p>
                  ) : (
                    pageData.results.map((movie: any) => (
                      <Card
                        key={movie.id}
                        addFavorite={() => {}}
                        removeFavorite={() => removeFavoriteMovie(movie.id)}
                        {...movie}
                      />
                    ))
                  )}
                </div>
              ))}
            </InfiniteScroll>
          )
        )}
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold">Favorite TvSeries</h1>
        {isLoadingTvSeries ? (
          <h1>Loading...</h1>
        ) : (
          dataTvSeries && (
            <InfiniteScroll
              dataLength={dataTvSeries.pages.length}
              next={fetchNextPageTvSeries}
              hasMore={hasNextPageTvSeries || false}
              loader={<h4>Loading...</h4>}
            >
              {dataTvSeries.pages.map((pageData, i) => (
                <div key={i} className="mt-3 grid grid-cols-5 gap-x-4 gap-y-3">
                  {pageData.results.length === 0 ? (
                    <p className="col-span-5 text-center">
                      No favorite tv series
                    </p>
                  ) : (
                    pageData.results.map((tvSeries: any) => (
                      <Card
                        key={tvSeries.id}
                        addFavorite={() => {}}
                        removeFavorite={() =>
                          removeFavoriteTvSeries(tvSeries.id)
                        }
                        {...tvSeries}
                      />
                    ))
                  )}
                </div>
              ))}
            </InfiniteScroll>
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default Favorite;
