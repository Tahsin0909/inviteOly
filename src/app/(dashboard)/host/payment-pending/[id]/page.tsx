import { Metadata } from "next";
import { HostUploadReceiptView } from "@/features/payment/components/pricingCard/host-payment";

export const metadata: Metadata = {
  title: "Submit Payment Invoice - InviteOly",
  description: "Upload and submit your payment receipt for event confirmation",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HostPaymentPendingSubmitPage({ params }: PageProps) {
  const { id } = await params;

  return <HostUploadReceiptView eventId={id} />;
}

