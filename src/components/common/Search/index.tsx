import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { MdSearch, MdSearchOff } from "react-icons/md";

interface SearchProps {
  search: boolean;
  moviesPage: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  homePage: boolean;
  isSearch: () => void;
}

const Search: React.FC<SearchProps> = ({
  search,
  moviesPage,
  handleSearch,
  homePage,
  isSearch,
}) => {
  return (
    <>
      {search && (
        <div className="w-72 flex-grow-0">
          <Input
            type="text"
            placeholder={`Search ${moviesPage ? "Movies.." : "Tv Series.."}`}
            onChange={handleSearch}
          />
        </div>
      )}
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full bg-slate-700 text-slate-300 outline-none ${
                search ? "border-2 border-slate-500" : "border-none"
              } ${homePage && "hidden"}`}
              onClick={isSearch}
            >
              {!search ? (
                <MdSearch className="h-5 w-5" />
              ) : (
                <MdSearchOff className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!search ? (
              <p>Search {moviesPage ? "Movies" : "TV Series"}</p>
            ) : (
              <p>Remove Search</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default Search;
