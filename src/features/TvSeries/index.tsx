import { BaseHeader, Card } from "@/components/common";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDiscoverTvSeriesQuery } from "./hooks";

const TvSeries = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useDiscoverTvSeriesQuery();

  return (
    <div>
      <BaseHeader title="Tv Series - ReyMovies" />
      <h1 className="text-2xl font-bold">Discover Tv Series</h1>
      <div>
        {isLoading ? (
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
                      href={`/tvseries/${item.id}`}
                      {...item}
                    />
                  ))}
                </div>
              ))}
            </InfiniteScroll>
          )
        )}
      </div>
    </div>
  );
};

export default TvSeries;
