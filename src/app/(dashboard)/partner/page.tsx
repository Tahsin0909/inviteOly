import { EventsTable } from "@/features/event/components/partner/EventsTable";
import { PartnerMetrics } from "@/features/metrics/components/partnerMetrics/PartnerMetrics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Dashboard - InviteOnly",
};

export default function PartnerDashboardPage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <PartnerMetrics />
      <EventsTable />
    </div>
  );
}

