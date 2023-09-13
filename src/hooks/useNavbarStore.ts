import { createWithEqualityFn } from "zustand/traditional";

interface NavbarStore {
  search: boolean;
  filter: boolean;
  isSearch: () => void;
  isFilter: () => void;
}

export const useNavbarStore = createWithEqualityFn<NavbarStore>(
  (set) => ({
    search: false,
    filter: false,
    isSearch: () => set((state) => ({ search: !state.search })),
    isFilter: () => set((state) => ({ filter: !state.filter })),
  }),
  Object.is,
);
