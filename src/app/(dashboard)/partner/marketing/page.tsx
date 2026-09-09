import { Metadata } from "next";
import { PartnerMarketing } from "@/features/marketing";

export const metadata: Metadata = {
  title: "Partner Marketing - InviteOnly",
};

export default function Page() {
  return (
    <div className="w-full">
      <PartnerMarketing />
    </div>
  );
}
