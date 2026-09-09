import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host Dashboard - InviteOnly",
};

export default function HostDashboardPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space-grotesk text-foreground">
          Host Dashboard
        </h1>
      </div>
    </div>
  );
}

