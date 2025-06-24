import PinnedServersListing from "@/components/pinned-servers";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-y-7">
      <h1 className="text-2xl font-bold">Welcome back, User!</h1>
      <PinnedServersListing />
    </div>
  );
}
