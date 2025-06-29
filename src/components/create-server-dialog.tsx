"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPaperVersions } from "@/lib/versions";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function CreateServerDialog({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const _queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["paperVersions"],
    queryFn: getPaperVersions,
  });
  const createServerSchema = z.object({
    name: z.string().min(1, "Server name is required"),
    type: z.enum(["Paper"]),
    version: z.string().refine((val) => query.data?.includes(val), {
      message: "Invalid version",
    }),
  });

  const form = useForm<z.infer<typeof createServerSchema>>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      name: "",
      type: "Paper",
      version: query.data?.[0] || "",
    },
  });

  async function onSubmit(_values: z.infer<typeof createServerSchema>) {
    form.control._disableForm(true);
    // toast.promise(createServerContainer(values), {
    //   loading: "Pulling image and creating server...",
    //   success: () => {
    //     setOpen(false);
    //     queryClient.invalidateQueries({ queryKey: ["serverContainers"] });
    //     return "Successfully created server!";
    //   },
    //   error: (e) => {
    //     form.control._disableForm(false);
    //     return `Failed to create server: ${e}`;
    //   },
    // });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a Minecraft server</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium">
                    Server Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="mt-1 block w-full rounded-md shadow-sm"
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-1 text-sm font-medium">
                    Type
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="Paper" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paper">Paper</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-1 text-sm font-medium">
                    Version
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="Minecraft Version" />
                      </SelectTrigger>
                      <SelectContent>
                        {query.data?.toReversed().map((version) => (
                          <SelectItem key={version} value={version}>
                            {version}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="cursor-pointer" type="submit">
                Create Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
