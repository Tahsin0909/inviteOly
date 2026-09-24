import { Metadata } from "next";
import { HostEvent } from "@/features/event/components/host/HostEvent";

export const metadata: Metadata = {
  title: "Events Management - InviteOly",
};

export default function Page() {
  return <HostEvent />;
}
