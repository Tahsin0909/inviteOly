import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview - InviteOnly",
};

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-foreground">
          Overview
        </h1>
        <p className="text-sm font-work-sans text-muted-foreground mt-1">
          Welcome to the Admin Overview dashboard.
        </p>
      </div>
    </div>
  );
}

