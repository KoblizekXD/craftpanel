"use client";

import { LoaderCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateServerDialog from "@/components/create-server-dialog";
import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useServerContext } from "@/lib/server-context";

export default function ServersPage() {
  const servers = useServerContext();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-7 h-full">
      <h1 className="text-2xl font-bold">Servers</h1>
      <div className="flex items-center">
        <CreateServerDialog>
          <Button className="flex items-center gap-x-1">
            <Plus />
            Create
          </Button>
        </CreateServerDialog>
      </div>
      {servers?.loading ? (
        <div className="flex items-center gap-x-2 justify-center h-full">
          <p className="text-sm text-muted-foreground">
            Loading servers, please wait...
          </p>
          <LoaderCircle className="animate-spin stroke-muted-foreground" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit">Container Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servers?.servers.map((server) => (
              <TableRow
                className="cursor-pointer"
                onClick={() => router.push(`/servers/${server.id}`)}
                key={server.id}>
                <TableCell>{server.id.substring(0, 12)}</TableCell>
                <TableCell>{server.name}</TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={server.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
