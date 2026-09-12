import { Metadata } from "next";
import { HostEventDetailsView } from "@/features/event/components/host/HostEventDetailsView";

export const metadata: Metadata = {
  title: "Event Details - InviteOnly",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HostEventDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <HostEventDetailsView eventId={id} />;
}

