"use client";

import { useQuery } from "@tanstack/react-query";
import { connectionOptions } from "@/lib/docker";
import { type Server, ServerContext } from "@/lib/server-context";

export default function ServerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const query = useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      return [];
    },
  });

  return (
    <ServerContext.Provider
      value={{
        servers: (query.data as Server[]) ?? [],
        loading: query.isLoading,
        success: query.isSuccess,
        error: query.isError ? query.error.message : undefined,
        connectionDetails: connectionOptions,
      }}>
      {children}
    </ServerContext.Provider>
  );
}
