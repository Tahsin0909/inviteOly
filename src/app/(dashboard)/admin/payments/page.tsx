import { Metadata } from "next";
import { AdminPayment } from "@/features/payment/components/AdminPayment";

export const metadata: Metadata = {
  title: "Payments Management - InviteOly",
  description: "Track and manage all payment transactions in one place.",
};

export default function AdminPaymentsPage() {
  return (
    <div className="w-full">
      <AdminPayment />
    </div>
  );
}
