import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Events Management - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Events Management" role="Admin" />;
}
