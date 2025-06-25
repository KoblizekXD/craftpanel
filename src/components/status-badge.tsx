import { Badge } from "./ui/badge";

export default function StatusBadge(
  props: { status: string } & React.ComponentProps<typeof Badge>,
) {
  const status = props.status.toLowerCase();

  return status === "running" ? (
    <Badge {...props} variant={"default"}>
      Running
    </Badge>
  ) : status === "restarting" ? (
    <Badge className="bg-orange-400" {...props}>
      Restarting
    </Badge>
  ) : status === "created" ? (
    <Badge variant={"secondary"} {...props}>
      Not started
    </Badge>
  ) : (
    <Badge variant={"destructive"} {...props}>
      Stopped
    </Badge>
  );
}
