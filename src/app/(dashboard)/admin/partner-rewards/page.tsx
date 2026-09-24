import { Metadata } from "next";
import { AdminPartnerReward } from "@/features/reward";

export const metadata: Metadata = {
  title: "Partner Reward - InviteOly",
  description: "Manage and track rewards earned by partners",
};

export default function Page() {
  return <AdminPartnerReward />;
}

