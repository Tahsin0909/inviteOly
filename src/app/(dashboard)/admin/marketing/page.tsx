import { Metadata } from "next";
import { AllMarketing } from "@/features/marketing";

export const metadata: Metadata = {
  title: "Marketing - InviteOly",
};

export default function Page() {
  return (
    <div className="w-full">
      <AllMarketing />
    </div>
  );
}
