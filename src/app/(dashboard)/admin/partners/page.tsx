import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Partner Management - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Partner Management" role="Admin" />;
}
