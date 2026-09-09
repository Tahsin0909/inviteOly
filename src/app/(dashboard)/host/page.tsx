import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host Dashboard - InviteOnly",
};

export default function HostDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-foreground">
          Host Dashboard
        </h1>
        <p className="text-sm font-work-sans text-muted-foreground mt-1">
          Welcome to your Host Dashboard.
        </p>
      </div>
    </div>
  );
}


