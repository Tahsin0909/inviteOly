import { Metadata } from "next";
import { HostPayment } from "@/features/payment/components/pricingCard/host-payment";

export const metadata: Metadata = {
  title: "Payment Pending - InviteOnly",
  description: "Track your pending event payments and upload proof of payment",
};

export default function Page() {
  return <HostPayment />;
}
