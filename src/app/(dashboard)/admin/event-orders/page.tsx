import { EventOrders } from "@/features/event/components/admin/Order/EventOrders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Orders - InviteOly",
};

export default function AdminEventOrdersPage() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-space-grotesk text-neutral-900 tracking-tight">
          Event Orders
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-work-sans leading-relaxed">
          Track customer orders, ticket details, and payment status in one place.
        </p>
      </div>

      {/* Event Orders Grid & Modals */}
      <EventOrders />
    </div>
  );
}
