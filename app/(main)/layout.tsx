import { DashboardShell } from "@/components/dashboard-shell";
import { Providers } from "@/providers/providers";
import { TabProvider } from "@/context/TabContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DashboardShell>{children}</DashboardShell>
    </Providers>
  );
}
