import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Venue Management - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Venue Management" role="Partner" />;
}
