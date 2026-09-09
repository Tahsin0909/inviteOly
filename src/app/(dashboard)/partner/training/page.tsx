import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Training - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Training" role="Partner" />;
}
