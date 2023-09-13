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

import { BsFilter } from "react-icons/bs";
import { MdSearch, MdSearchOff } from "react-icons/md";

import { useNavbarStore } from "@/hooks/useNavbarStore";
import { shallow } from "zustand/shallow";

const Navbar = () => {
  const [search, filter, isSearch, isFilter] = useNavbarStore(
    (state) => [state.search, state.filter, state.isSearch, state.isFilter],
    shallow,
  );
  return (
    <nav className="fixed right-4 top-4 flex items-center justify-end gap-2">
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
              className="rounded-full border-none bg-slate-700 text-slate-300 outline-none"
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
            {!search ? <p>Search Movies</p> : <p>Remove Search</p>}
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
                  className="rounded-full border-none bg-slate-700 text-slate-300 outline-none"
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
