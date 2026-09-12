import { Metadata } from "next";
import RefereedCreateEvents from "@/features/event/components/host/refered-create-events/RefereedCreateEvents";

export const metadata: Metadata = {
    title: "Create Event (Referred Host) - InviteOnly",
    description: "Create your event as a referred host partner",
};

export default function Page() {
    return <RefereedCreateEvents />;
}