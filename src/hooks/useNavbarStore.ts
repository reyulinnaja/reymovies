import { createWithEqualityFn } from "zustand/traditional";

interface NavbarStore {
  search: boolean;
  filter: boolean;
  includeAdultMovie: boolean;
  includeVideo: boolean;
  sortName: string;
  sortBy: string;
  isSearch: () => void;
  isFilter: () => void;
  isIncludeAdultMovie: () => void;
  isIncludeVideo: () => void;
  setSortName: (value: string) => void;
  setSortBy: () => void;
}

export const useNavbarStore = createWithEqualityFn<NavbarStore>(
  (set) => ({
    search: false,
    filter: false,
    includeAdultMovie: false,
    includeVideo: false,
    sortName: "popularity",
    sortBy: "desc",
    isSearch: () => set((state) => ({ search: !state.search })),
    isFilter: () =>
      set((state) => {
        if (state.filter) {
          return {
            filter: false,
            includeAdultMovie: false,
            sortName: "popularity",
            sortBy: "desc",
          };
        } else {
          return { filter: true };
        }
      }),
    isIncludeAdultMovie: () =>
      set((state) => ({ includeAdultMovie: !state.includeAdultMovie })),
    isIncludeVideo: () =>
      set((state) => ({ includeVideo: !state.includeVideo })),
    setSortName: (value: string) => set(() => ({ sortName: value })),
    setSortBy: () =>
      set((state) => ({ sortBy: state.sortBy === "desc" ? "asc" : "desc" })),
  }),
  Object.is,
);
