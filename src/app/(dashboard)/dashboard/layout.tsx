import ServerContextProvider from "@/components/server-context-provider";
import DashboardSidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerContextProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }>
        <DashboardSidebar />
        <main className="flex w-full min-h-screen flex-col justify-between p-8 md:p-24">
          {children}
        </main>
      </SidebarProvider>
    </ServerContextProvider>
  );
}
