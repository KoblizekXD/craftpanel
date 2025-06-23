import { createContext, useContext } from "react";

interface Server {
  id: string;
  name: string;
  status: string;
}

interface ServerContext {
  servers: Server[];
}

export const ServerContext = createContext<ServerContext | undefined>(
  undefined,
);
export const useServerContext = () => useContext(ServerContext);
