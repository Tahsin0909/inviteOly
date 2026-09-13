import { EventTable } from "@/features/event/components/host/EventTable";
import { HostMetrics } from "@/features/metrics/components/hostMetrics/HostMetrics";
import { HostPendingPaymentBanner } from "@/features/payment/components/pricingCard/host-payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host Dashboard - InviteOnly",
};

export default function HostDashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Alert banner if payment is pending */}
      <HostPendingPaymentBanner />

      {/* Metrics overview */}
      <HostMetrics />

      {/* Events Table & RSVP Metrics Overview */}
      <EventTable />
    </div>
  );
}
