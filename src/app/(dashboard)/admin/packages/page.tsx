import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Packages & Pricing - InviteOly",
};

export default function Page() {
  return (
    <UnderConstruction
      title="Need Server Functionality"
      role="Packages & Pricing"
      description="This module is currently under construction because it requires server functionality and backend API integration. Please check back soon!"
    />
  );
}
