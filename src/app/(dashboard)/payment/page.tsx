import React, { Suspense } from "react";
import { Payment } from "@/features/payment/components/Payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Payment - InviteOly",
};

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="size-8 rounded-full border-2 border-[#C39B4C]/20 border-t-[#C39B4C] animate-spin" />
        </div>
      }
    >
      <Payment />
    </Suspense>
  );
}

