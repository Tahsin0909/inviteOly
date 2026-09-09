import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Payment Pending - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Payment Pending" role="Host" />;
}
