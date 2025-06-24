"use client";

export default function usePinnedServers(): {
  pinnedServers: string[];
  setPinnedServers: (servers: string[]) => void;
} {
  if (typeof window === "undefined")
    return {
      pinnedServers: [],
      setPinnedServers: () => {
        throw new Error("LocalStorage is not available");
      },
    };

  const pinnedServers = localStorage.getItem("craftpanel-pinned-servers");

  const setPinnedServers = (servers: string[]) => {
    localStorage.setItem("craftpanel-pinned-servers", JSON.stringify(servers));
  };

  return {
    pinnedServers: pinnedServers ? JSON.parse(pinnedServers) : [],
    setPinnedServers,
  };
}
