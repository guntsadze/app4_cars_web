import { create } from "zustand";

interface Tab {
  title: string;
  url: string;
}

interface TabStore {
  tabs: Tab[];
  addTab: (tab: Tab) => void;
  removeTab: (url: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  tabs: [],
  addTab: (tab) =>
    set((state) => {
      if (state.tabs.find((t) => t.url === tab.url)) return state;
      return { tabs: [...state.tabs, tab] };
    }),
  removeTab: (url) =>
    set((state) => ({
      tabs: state.tabs.filter((t) => t.url !== url),
    })),
}));
