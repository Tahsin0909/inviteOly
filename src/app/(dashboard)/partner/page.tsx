import { PartnerMetrics } from "@/features/metrics/components/partnerMetrics/PartnerMetrics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Dashboard - InviteOnly",
};

export default function PartnerDashboardPage() {
  return (
    <div className="space-y-6">
      <PartnerMetrics />
    </div>
  );
}

