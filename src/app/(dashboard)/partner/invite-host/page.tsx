import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Invite a Host - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Invite a Host" role="Partner" />;
}
