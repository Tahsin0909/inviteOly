import { Metadata } from "next";
import { PartnerTraining } from "@/features/training";

export const metadata: Metadata = {
  title: "Partner Training & Resources - InviteOnly",
};

export default function Page() {
  return (
    <div className="w-full">
      <PartnerTraining />
    </div>
  );
}
