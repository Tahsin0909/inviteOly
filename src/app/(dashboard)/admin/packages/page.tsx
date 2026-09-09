import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Packages & Pricing - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Packages & Pricing" role="Admin" />;
}
