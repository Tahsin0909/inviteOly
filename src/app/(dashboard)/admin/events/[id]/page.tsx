import { AdminEventDetails } from "@/features/event/components/admin/AdminEventDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Event Details - InviteOnly",
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminEventDetailsPage({ params }: PageProps) {
    const { id } = await params;

    return <AdminEventDetails eventId={id} />;
}

