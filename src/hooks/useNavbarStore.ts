import { createWithEqualityFn } from "zustand/traditional";

export interface NavbarStore {
  search: boolean;
  filter: boolean;
  includeAdult: boolean;
  includeVideo: boolean;
  sortName: string;
  sortBy: string;
  query: string;
  userId: number;
  isSearch: () => void;
  isFilter: () => void;
  isIncludeAdult: () => void;
  isIncludeVideo: () => void;
  setSortName: (value: string) => void;
  setSortBy: () => void;
  setQuery: (value: string) => void;
  setUserId: (value: number) => void;
}

export const useNavbarStore = createWithEqualityFn<NavbarStore>(
  (set) => ({
    search: false,
    filter: false,
    includeAdult: false,
    includeVideo: false,
    sortName: "popularity",
    sortBy: "desc",
    query: "",
    userId: 0,
    isSearch: () =>
      set((state) => {
        if (state.search) {
          return {
            search: false,
            query: "",
          };
        } else {
          return { search: true };
        }
      }),
    isFilter: () =>
      set((state) => {
        if (state.filter) {
          return {
            filter: false,
            includeAdult: false,
            sortName: "popularity",
            sortBy: "desc",
          };
        } else {
          return { filter: true };
        }
      }),
    isIncludeAdult: () =>
      set((state) => ({ includeAdult: !state.includeAdult })),
    isIncludeVideo: () =>
      set((state) => ({ includeVideo: !state.includeVideo })),
    setSortName: (value: string) => set(() => ({ sortName: value })),
    setSortBy: () =>
      set((state) => ({ sortBy: state.sortBy === "desc" ? "asc" : "desc" })),
    setQuery: (value: string) => set(() => ({ query: value })),
    setUserId: (value: number) => set(() => ({ userId: value })),
  }),
  Object.is,
);
