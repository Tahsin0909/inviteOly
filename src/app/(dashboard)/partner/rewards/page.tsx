import { Metadata } from "next";
import { PartnerReward } from "@/features/reward";

export const metadata: Metadata = {
  title: "Partner Rewards - InviteOnly",
  description: "Track rewards earned from your referred events and view upcoming payouts",
};

export default function Page() {
  return <PartnerReward />;
}

