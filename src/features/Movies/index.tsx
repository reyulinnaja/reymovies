import { BaseHeader, Card } from "@/components/common";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDiscoverMovies } from "./hooks";

const Movies = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useDiscoverMovies();

  return (
    <div>
      <BaseHeader title="Movies - ReyMovies" />
      <h1 className="text-2xl font-bold">Discover Movies</h1>
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
                    <Card key={item.id} href={`/movies/${item.id}`} {...item} />
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

export default Movies;
