"use server";

import type { DockerOptions } from "dockerode";
import Docker from "dockerode";

const connectionOptions: DockerOptions = {
  socketPath: "/var/run/docker.sock",
  // host: "localhost",
  // port: 2375,
  // protocol: "http",
  // ca: fs.readFileSync("/path/to/ca.pem"),
  // cert: fs.readFileSync("/path/to/cert.pem"),
  // key: fs.readFileSync("/path/to/key.pem"),
} satisfies DockerOptions;

const docker = new Docker(connectionOptions);

export async function getServerContainers() {
  return await docker.listContainers({
    all: true,
    filters: {
      label: ["craftpanel=true"],
    },
  });
}

export async function getConnectionOptions() {
  return connectionOptions;
}
