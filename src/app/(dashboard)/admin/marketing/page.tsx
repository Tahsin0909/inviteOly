import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Marketing - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Marketing" role="Admin" />;
}
