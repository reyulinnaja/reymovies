"use client";

import React, { useEffect } from "react";
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
import { debounce } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { BiChevronDown } from "react-icons/bi";

const Navbar = () => {
  const router = useRouter();
  const homePage = router.pathname === "/";
  const moviesPage = router.pathname === "/movies";

  const [
    search,
    filter,
    includeAdult,
    includeVideo,
    isSearch,
    isFilter,
    isIncludeAdult,
    isIncludeVideo,
    sortName,
    setSortName,
    sortBy,
    setSortBy,
    setQuery,
  ] = useNavbarStore(
    (state) => [
      state.search,
      state.filter,
      state.includeAdult,
      state.includeVideo,
      state.isSearch,
      state.isFilter,
      state.isIncludeAdult,
      state.isIncludeVideo,
      state.sortName,
      state.setSortName,
      state.sortBy,
      state.setSortBy,
      state.setQuery,
    ],
    shallow,
  );

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  }, 500);

  const { mutate: login } = useMutation(
    async () => {
      const response = await axiosInstance.get("/authentication/token/new");
      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.request_token);
        window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000`;
      },
    },
  );

  const { mutate: getSession } = useMutation(
    async () => {
      const response = await axiosInstance.post("/authentication/session/new", {
        request_token: localStorage.getItem("token"),
      });

      console.log(response.data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("session_id", data.session_id);
      },
    },
  );

  useEffect(() => {
    if (window.location.href.includes("approved=true")) {
      getSession();
    }
  }, []);

  return (
    <nav
      className={`fixed right-5 z-40 flex w-full items-center justify-end gap-2 py-3 ${
        homePage ? "w-auto" : "w-full bg-slate-950/50 backdrop-blur-md"
      }`}
    >
      {/* Search Input */}
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

      {/* Filter Popover */}
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

      {/* Avatar */}
      {/* <div className="flex items-center gap-3 rounded-full bg-slate-800">
          <Avatar className="bg-slate-700">
            <AvatarImage
              src="https://api.dicebear.com/7.x/lorelei/svg?seed=U"
              alt="Ulinnaja"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1 pr-2">
            <p>Ulinnaja</p>
            <BiChevronDown className="h-5 w-5" />
          </div>
        </div> */}
      <Button variant="outline" onClick={() => login()}>
        Login
      </Button>
    </nav>
  );
};

export default Navbar;
