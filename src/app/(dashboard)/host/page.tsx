import { HostMetrics } from "@/features/metrics/components/hostMetrics/HostMetrics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host Dashboard - InviteOnly",
};

export default function HostDashboardPage() {
  return (
    <div className="space-y-6">
      <HostMetrics />
    </div>
  );
}


