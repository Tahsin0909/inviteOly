import { Metadata } from "next";
import { AllPartner } from "@/features/user/components/admin/AllPartner";

export const metadata: Metadata = {
  title: "Partners Management - InviteOly",
  description:
    "Manage partner accounts, venue relationships, referrals, activity, and partner status.",
};

export default function AdminPartnersPage() {
  return (
    <div className="w-full">
      <AllPartner />
    </div>
  );
}
