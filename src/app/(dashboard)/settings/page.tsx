import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Settings - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Settings" role="Account" />;
}
