"use client";

import { TabProvider } from "@/context/TabContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TabProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TabProvider>
  );
}
