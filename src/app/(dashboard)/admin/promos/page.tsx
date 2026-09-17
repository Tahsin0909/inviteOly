import { Metadata } from "next";
import { AllCodes } from "@/features/promotional-codes/components/AllCodes";

export const metadata: Metadata = {
  title: "Promotional Codes - InviteOnly",
  description: "Create and manage discount and promotional codes.",
};

export default function AdminPromosPage() {
  return (
    <div className="w-full">
      <AllCodes />
    </div>
  );
}
