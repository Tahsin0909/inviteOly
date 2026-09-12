import { Metadata } from "next";
import { InviteAHost } from "@/features/hostandpartner";

export const metadata: Metadata = {
  title: "Invite a Host - InviteOnly",
  description:
    "Invite a host to create and manage their event by selecting a subscription package, venue, and date.",
};

export default function Page() {
  return <InviteAHost />;
}
