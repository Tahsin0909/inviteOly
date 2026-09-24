import { Metadata } from "next";
import PartnerSettings from "@/features/user/components/partner/PartnerSettings";

export const metadata: Metadata = {
  title: "Partner Settings - InviteOly",
};

export default function Page() {
  return (
    <div className="w-full">
      <PartnerSettings />
    </div>
  );
}
