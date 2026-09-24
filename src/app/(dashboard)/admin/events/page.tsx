import { AllEvents } from "@/features/event/components/admin/AllEvents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Management - InviteOly",
};

export default function AdminEventsPage() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-space-grotesk text-neutral-900 tracking-tight">
          Event Management
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-work-sans leading-relaxed">
          Manage, approve, monitor, and organize all private events from one centralized dashboard.
        </p>
      </div>

      {/* Metrics & Event Cards */}
      <AllEvents />
    </div>
  );
}
