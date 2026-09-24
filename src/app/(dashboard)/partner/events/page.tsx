import { EventManagement } from "@/features/event/components/partner/EventManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events Management - InviteOly",
};

export default function PartnerEventsPage() {
  return (
    <div className="space-y-6">
      <EventManagement />
    </div>
  );
}
