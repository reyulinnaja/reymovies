/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { BsFilter, BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { MdSearch, MdSearchOff } from "react-icons/md";
import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const Navbar = () => {
  const router = useRouter();
  const homePage = router.pathname === "/";
  const moviesPage = router.pathname === "/movies";

  const [
    search,
    filter,
    includeAdultMovie,
    includeVideo,
    isSearch,
    isFilter,
    isIncludeAdultMovie,
    isIncludeVideo,
    sortName,
    setSortName,
    sortBy,
    setSortBy,
  ] = useNavbarStore(
    (state) => [
      state.search,
      state.filter,
      state.includeAdultMovie,
      state.includeVideo,
      state.isSearch,
      state.isFilter,
      state.isIncludeAdultMovie,
      state.isIncludeVideo,
      state.sortName,
      state.setSortName,
      state.sortBy,
      state.setSortBy,
    ],
    shallow,
  );

  return (
    <nav
      className={`fixed right-5 z-40 flex w-full items-center justify-end gap-2 py-3 ${
        homePage ? "w-auto" : "w-full bg-slate-950/50 backdrop-blur-md"
      }`}
    >
      {search && (
        <div className="flex-grow-0">
          <Input type="text" placeholder="Search Movies.." />
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
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full bg-slate-700 text-slate-300 outline-none ${
                    filter ? "border-2 border-slate-500" : "border-none"
                  } ${homePage && "hidden"}`}
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
                            <SelectItem value="popularity">
                              Popularity
                            </SelectItem>
                            <SelectItem value="revenue">Revenue</SelectItem>
                            <SelectItem value="vote_average">
                              Vote Average
                            </SelectItem>
                            <SelectItem value="vote_count">
                              Vote Count
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={setSortBy}
                        >
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
                        checked={includeAdultMovie}
                        onCheckedChange={isIncludeAdultMovie}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <p>Include Video</p>
                      <Checkbox
                        checked={includeVideo}
                        onCheckedChange={isIncludeVideo}
                      />
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </Tooltip>
      </TooltipProvider>
      <Avatar className="bg-slate-700">
        <AvatarImage
          src="https://api.dicebear.com/7.x/lorelei/svg?seed=U"
          alt="Ulinnaja"
        />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
