"use client";

import { useQuery } from "@tanstack/react-query";
import { ServerContext } from "@/lib/server-context";

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
    <ServerContext.Provider value={{ servers: query.data ?? [] }}>
      {children}
    </ServerContext.Provider>
  );
}
