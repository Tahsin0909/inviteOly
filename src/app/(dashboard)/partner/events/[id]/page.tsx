import { EventDetails } from "@/features/event/components/partner/EventDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details - InviteOnly",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PartnerEventDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <EventDetails eventId={id} />
    </div>
  );
}

