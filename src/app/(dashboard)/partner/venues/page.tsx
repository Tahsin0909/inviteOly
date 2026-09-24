import { Metadata } from "next";
import { PartnerVenueManagement } from "@/features/venue";

export const metadata: Metadata = {
  title: "Venue Management - InviteOly",
  description: "Manage venues, locations, spaces, and parking for Partner events.",
};

export default function Page() {
  return <PartnerVenueManagement />;
}
