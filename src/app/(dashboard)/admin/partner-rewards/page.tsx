import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Partner Reward - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Partner Reward" role="Admin" />;
}
