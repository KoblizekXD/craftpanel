"use client";

import { Pin } from "lucide-react";
import usePinnedServers from "@/hooks/use-pinned-servers";

export default function PinnedServersListing() {
  const { pinnedServers } = usePinnedServers();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg flex items-center gap-x-2 font-semibold">
        <Pin className="rotate-45" />
        Pinned Servers
      </h2>
      {pinnedServers.length > 0 ? (
        <ul className="list-disc pl-5">
          {pinnedServers.map((serverId) => (
            <li key={serverId} className="text-sm">
              Server ID: {serverId}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm self-center text-gray-500">No pinned servers.</p>
      )}
    </div>
  );
}
