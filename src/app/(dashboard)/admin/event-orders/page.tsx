import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Event Orders - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Event Orders" role="Admin" />;
}
