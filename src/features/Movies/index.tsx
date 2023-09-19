import React from "react";
import { BaseHeader, Card } from "@/components/common";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useAddMovieToFavorite,
  useDiscoverMoviesQuery,
  useRemoveMovieFromFavorite,
  useSearchMoviesQuery,
} from "./hooks";
import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";

const Movies: React.FC = () => {
  const [query, userId] = useNavbarStore(
    (state) => [state.query, state.userId],
    shallow,
  );

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useDiscoverMoviesQuery();

  const {
    data: searchData,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    isLoading: searchIsLoading,
    refetch: searchRefetch,
  } = useSearchMoviesQuery(query);

  const { mutate: addFavorite } = useAddMovieToFavorite(userId, () => {
    refetch();
    searchRefetch();
  });

  const { mutate: removeFavorite } = useRemoveMovieFromFavorite(userId, () => {
    refetch();
    searchRefetch();
  });

  return (
    <React.Fragment>
      <BaseHeader title="Movies - ReyMovies" />
      <h1 className="text-2xl font-bold">Discover Movies</h1>
      <div>
        {query.length >= 3 ? (
          searchIsLoading ? (
            <h1>Loading...</h1>
          ) : (
            searchData && (
              <InfiniteScroll
                dataLength={searchData.pages.length}
                next={searchFetchNextPage}
                hasMore={searchHasNextPage || false}
                loader={<h4>Loading...</h4>}
                endMessage={<p>End of list</p>}
              >
                {searchData.pages.map((pageData, i) => (
                  <div
                    key={i}
                    className="mt-3 grid grid-cols-5 gap-x-4 gap-y-3"
                  >
                    {pageData.total_results !== 0 ? (
                      pageData.results.map((item: any) => (
                        <Card
                          key={item.id}
                          addFavorite={() => addFavorite(item.id)}
                          removeFavorite={() => removeFavorite(item.id)}
                          {...item}
                        />
                      ))
                    ) : (
                      <p className="col-span-5 text-center italic text-slate-700">
                        Not Found Movies {query}
                      </p>
                    )}
                  </div>
                ))}
              </InfiniteScroll>
            )
          )
        ) : isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data && (
            <InfiniteScroll
              dataLength={data.pages.length}
              next={fetchNextPage}
              hasMore={hasNextPage || false}
              loader={<h4>Loading...</h4>}
              endMessage={<p>End of list</p>}
            >
              {data.pages.map((pageData, i) => (
                <div key={i} className="mt-3 grid grid-cols-5 gap-x-4 gap-y-3">
                  {pageData.results.map((item: any) => (
                    <Card
                      key={item.id}
                      addFavorite={() => addFavorite(item.id)}
                      removeFavorite={() => removeFavorite(item.id)}
                      {...item}
                    />
                  ))}
                </div>
              ))}
            </InfiniteScroll>
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default Movies;
