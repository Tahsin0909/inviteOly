import { AdminUserDetails } from "@/features/user/components/admin/AdminUserDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "User Profile - InviteOly",
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminUserDetailsPage({ params }: PageProps) {
    const { id } = await params;

    return <AdminUserDetails userId={id} />;
}

