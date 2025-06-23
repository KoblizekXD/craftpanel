"use client";

import { useQuery } from "@tanstack/react-query";
import { getConnectionOptions, getServerContainers } from "@/lib/docker";
import { type Server, ServerContext } from "@/lib/server-context";

export default function ServerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const query = useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      return (await getServerContainers()).map((container) => ({
        id: container.Id,
        name: container.Names[0].replace(/^\/+/, ""),
        status: container.State,
      }));
    },
  });

  const connectionQuery = useQuery({
    queryKey: ["connectionDetails"],
    queryFn: async () => {
      return await getConnectionOptions();
    },
  });

  return (
    <ServerContext.Provider
      value={{
        servers: (query.data as Server[]) ?? [],
        loading: query.isLoading,
        success: query.isSuccess,
        error: query.isError ? query.error.message : undefined,
        connectionDetails: connectionQuery.data ?? {},
      }}>
      {children}
    </ServerContext.Provider>
  );
}
