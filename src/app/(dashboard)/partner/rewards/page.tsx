import { Metadata } from "next";
import { PartnerReward } from "@/features/reward";

export const metadata: Metadata = {
  title: "Reward - InviteOnly",
  description: "Track your rewards and see what you've earned as a partner",
};

export default function Page() {
  return <PartnerReward />;
}

