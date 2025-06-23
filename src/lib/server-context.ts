import type Dockerode from "dockerode";
import { createContext, useContext } from "react";

export interface Server {
  id: string;
  name: string;
  status: string;
}

type ServerContext = {
  servers: Server[];
  loading: boolean;
  success: boolean;
  error?: string;
  connectionDetails: Dockerode.DockerOptions;
};

export const ServerContext = createContext<ServerContext | undefined>(
  undefined,
);

export const useServerContext = () => useContext(ServerContext);
