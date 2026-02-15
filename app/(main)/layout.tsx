import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Providers } from "./providers";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-background p-6 transition-colors duration-300">
          <SidebarTrigger className="mb-4" />
          <Providers>{children}</Providers>
        </main>
      </div>
    </SidebarProvider>
  );
}
