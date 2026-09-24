import { Metadata } from "next";
import { HostUploadReceiptView } from "@/features/payment/components/pricingCard/host-payment";

export const metadata: Metadata = {
  title: "Submit Payment Invoice - InviteOly",
  description: "Upload and submit your payment receipt for event confirmation",
};

export default function HostPaymentSubmitPage() {
  return <HostUploadReceiptView />;
}

