/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import { debounce } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavbarStore } from "@/hooks/useNavbarStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiChevronDown } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

import {
  useGetAccountDetailsQuery,
  useLoginMutation,
  useLogoutMutation,
  usePostSessionIdQuery,
} from "./hooks";
import Search from "../Search";
import SearchFilter from "../SearchFilter";

const Navbar = () => {
  const router = useRouter();
  const hiddenSearch = ["/favorite", "/"].includes(router.pathname);
  const moviesPage = router.pathname === "/movies";
  const getLocalSessionId =
    global?.localStorage && !!localStorage.getItem("session_id");

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
    setUserId,
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
      state.setUserId,
    ],
    shallow,
  );

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  }, 500);

  const { mutate: useLogin } = useLoginMutation();

  const { data } = usePostSessionIdQuery();

  const { data: useAccountDetails, isSuccess: useAccountDetailsSuccess } =
    useGetAccountDetailsQuery(getLocalSessionId, setUserId);

  const { mutate: useLogout } = useLogoutMutation();

  return (
    <nav
      className={`fixed right-5 z-40 flex w-full items-center justify-end gap-2 py-3 ${
        hiddenSearch ? "w-auto" : "w-full bg-slate-950/50 backdrop-blur-md"
      }`}
    >
      {/* Search Input */}
      <Search
        search={search}
        moviesPage={moviesPage}
        handleSearch={handleSearch}
        hiddenSeach={hiddenSearch}
        isSearch={isSearch}
      />

      {/* Filter Popover */}
      <SearchFilter
        search={search}
        filter={filter}
        hiddenSearch={hiddenSearch}
        moviesPage={moviesPage}
        isFilter={isFilter}
        includeAdult={includeAdult}
        isIncludeAdult={isIncludeAdult}
        includeVideo={includeVideo}
        isIncludeVideo={isIncludeVideo}
        sortName={sortName}
        setSortName={setSortName}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Avatar */}
      {useAccountDetailsSuccess ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-3 rounded-full bg-slate-800">
              <Avatar className="bg-slate-700">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${useAccountDetails?.username}`}
                  alt={useAccountDetails?.username}
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1 pr-2">
                <p>{useAccountDetails?.username}</p>
                <BiChevronDown className="h-5 w-5" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => useLogout()}>
              <FiLogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="outline" onClick={() => useLogin()}>
          Login
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
