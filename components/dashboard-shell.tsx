"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useTabs } from "@/context/TabContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getLabelByUrl } from "@/lib/menu-data";
import { cn } from "@/lib/utils";
import { DynamicBreadcrumbs } from "./DynamicBreadcrumbs";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { tabs, addTab, removeTab } = useTabs();

  useEffect(() => {
    const dynamicLabel = getLabelByUrl(pathname);
    if (dynamicLabel) {
      addTab({ title: dynamicLabel, url: pathname });
    }
  }, [pathname, addTab]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col min-w-0">
          <header className="flex h-10 items-center gap-0 border-b bg-muted/30 w-full overflow-hidden">
            <div className="flex flex-1 overflow-x-auto no-scrollbar h-full">
              {tabs.map((tab) => (
                <div
                  key={tab.url}
                  onClick={() => router.push(tab.url)}
                  className={cn(
                    "group flex items-center gap-2 px-4 border-r border-border/50 cursor-pointer transition-all h-full min-w-fit select-none",
                    pathname === tab.url
                      ? "bg-background text-primary border-b-2 border-b-primary shadow-[inset_0_1px_0_rgba(0,0,0,0.05)]"
                      : "text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  <span className="text-xs font-medium whitespace-nowrap">
                    {tab.title}
                  </span>
                  <X
                    className={cn(
                      "size-3 text-muted-foreground/60 hover:text-destructive transition-all p-0.5 rounded-sm",
                      pathname === tab.url ? "opacity-100" : "opacity-70",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.url);
                      if (pathname === tab.url) {
                        const remaining = tabs.filter((t) => t.url !== tab.url);
                        router.push(
                          remaining.length > 0
                            ? remaining[remaining.length - 1].url
                            : "/",
                        );
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </header>

          {/* HEADER 2: SidebarTrigger & Breadcrumbs */}
          <header className="flex h-12 items-center gap-4 border-b bg-background px-4 shrink-0">
            <SidebarTrigger className="size-8" />
            <div className="h-4 w-px bg-border/60" />
            <DynamicBreadcrumbs />
          </header>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 overflow-y-auto bg-slate-50/40 p-4 dark:bg-transparent">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
