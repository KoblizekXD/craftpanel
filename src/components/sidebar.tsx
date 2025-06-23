"use client";

import { Info, Server, Settings } from "lucide-react";
import Link from "next/link";
import { useServerContext } from "@/lib/server-context";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

const dockerOptionsFields = Object.entries({
  socketPath: "Socket Path",
  host: "Host",
  port: "Port",
  username: "Username",
  headers: "Headers",
  ca: "Certificate Authority (CA)",
  cert: "Client Certificate",
  key: "Private Key",
  protocol: "Protocol (http | https | ssh)",
  timeout: "Timeout (ms)",
  version: "API Version",
  sshAuthAgent: "SSH Auth Agent",
  sshOptions: "SSH Options (ConnectConfig)",
});

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const serverContext = useServerContext();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <Server />
                    <div className="flex flex-col">
                      <span className="font-semibold">Craftpanel</span>
                      <span className="text-xs text-muted-foreground">
                        (Hover for status)
                      </span>
                    </div>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm w-fit">
                  <p className="font-semibold">Connection details:</p>
                  {Object.entries(serverContext?.connectionDetails || {}).map(
                    (k, v) => (
                      <span key={k[0]}>
                        {dockerOptionsFields[v][1]}: {k[1]}
                      </span>
                    ),
                  )}
                </HoverCardContent>
              </HoverCard>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/analytics"}>
                    <Info />
                    Analytics
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/settings"}>
                    <Settings />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Servers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {serverContext?.servers.map((server) => (
                <SidebarMenuItem key={server.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/servers/${server.id}`}>
                      <Server />
                      {server.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default DashboardSidebar;
