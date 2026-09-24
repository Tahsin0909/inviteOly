import { AdminMatrics } from "@/features/metrics/components/adminMatrics/AdminMatrics";
import { AdminOverviewHeader } from "@/features/metrics/components/adminMatrics/AdminOverviewHeader";
import { RevnueBar } from "@/features/metrics/components/adminMatrics/RevnueBar";
import { RecentRegisterUser } from "@/features/user/components/admin/RecentRegisterUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Overview - InviteOly",
};

export default function AdminDashboardPage() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <AdminOverviewHeader />

      {/* 4 Stat Cards */}
      <AdminMatrics />

      {/* Revenue Breakdown Chart */}
      <RevnueBar />

      {/* Recent Registered Users Table */}
      <RecentRegisterUser />
    </div>
  );
}
