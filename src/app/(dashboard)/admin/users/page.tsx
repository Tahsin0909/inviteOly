import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "User Management - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="User Management" role="Admin" />;
}
