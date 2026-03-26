"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface Tab {
  title: string;
  url: string;
}

interface TabContextType {
  tabs: Tab[];
  addTab: (tab: Tab) => void;
  removeTab: (url: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([]);

  const addTab = (tab: Tab) => {
    setTabs((prev) => {
      if (prev.find((t) => t.url === tab.url)) return prev;
      return [...prev, tab];
    });
  };

  const removeTab = (url: string) => {
    setTabs((prev) => prev.filter((t) => t.url !== url));
  };

  return (
    <TabContext.Provider value={{ tabs, addTab, removeTab }}>
      {children}
    </TabContext.Provider>
  );
}

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("useTabs must be used within TabProvider");
  return context;
};
