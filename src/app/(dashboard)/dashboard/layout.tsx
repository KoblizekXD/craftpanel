import ServerContextProvider from "@/components/server-context-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServerContextProvider>{children}</ServerContextProvider>;
}
