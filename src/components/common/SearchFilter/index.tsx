import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { BsFilter, BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchFilterProps {
  search: boolean;
  filter: boolean;
  homePage: boolean;
  moviesPage: boolean;
  isFilter: () => void;
  includeAdult: boolean;
  isIncludeAdult: () => void;
  includeVideo: boolean;
  isIncludeVideo: () => void;
  sortName: string;
  setSortName: (value: string) => void;
  sortBy: string;
  setSortBy: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  filter,
  homePage,
  moviesPage,
  isFilter,
  includeAdult,
  isIncludeAdult,
  includeVideo,
  isIncludeVideo,
  sortName,
  setSortName,
  sortBy,
  setSortBy,
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                disabled={search}
                className={`rounded-full bg-slate-700 text-slate-300 outline-none ${
                  filter ? "border-2 border-slate-500" : "border-none"
                } ${homePage && "hidden"} ${search && "cursor-not-allowed"}`}
              >
                <BsFilter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent>
            <p>Filter Search</p>
          </TooltipContent>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium leading-none">Filter Search</h4>
                <div className="flex items-center gap-2">
                  <p>{filter ? "on" : "off"}</p>
                  <Switch checked={filter} onCheckedChange={isFilter} />
                </div>
              </div>
              {filter === true && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p>Sort By</p>
                    <div className="flex gap-2">
                      <Select
                        onValueChange={setSortName}
                        defaultValue={sortName}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Movies" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="revenue">Revenue</SelectItem>
                          <SelectItem value="vote_average">
                            Vote Average
                          </SelectItem>
                          <SelectItem value="vote_count">Vote Count</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" onClick={setSortBy}>
                        {sortBy === "desc" ? (
                          <BsSortAlphaDown />
                        ) : (
                          <BsSortAlphaUpAlt />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p>Include Adult</p>
                    <Checkbox
                      checked={includeAdult}
                      onCheckedChange={isIncludeAdult}
                    />
                  </div>
                  {moviesPage && (
                    <div className="flex items-center gap-4">
                      <p>Include Video</p>
                      <Checkbox
                        checked={includeVideo}
                        onCheckedChange={isIncludeVideo}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SearchFilter;
