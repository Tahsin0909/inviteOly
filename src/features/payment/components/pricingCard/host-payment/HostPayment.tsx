"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import {
  setViewMode,
  selectEventForReceipt,
  selectEventForInvoice,
  closeInvoiceModal,
} from "../../../store/payment.slice";
import HostPendingPaymentCard from "./HostPendingPaymentCard";
import HostUploadReceiptView from "./HostUploadReceiptView";
import HostInvoiceModal from "./HostInvoiceModal";

export const HostPayment: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const paymentState = useSelector((state: RootState) => state.payment);
  const pendingPayments = paymentState?.pendingPayments || [];
  const selectedEventForReceipt = paymentState?.selectedEventForReceipt || null;
  const selectedEventForInvoice = paymentState?.selectedEventForInvoice || null;
  const viewMode = paymentState?.viewMode || "list";

  const handleCreateNewEvent = () => {
    router.push("/host/events");
  };

  return (
    <div className="w-full space-y-6 font-work-sans pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
            Payment Pending
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
            Your payment is currently being processed. We&apos;ll update your payment
            status once it&apos;s confirmed.
          </p>
        </div>

        {viewMode === "list" && (
          <button
            type="button"
            onClick={handleCreateNewEvent}
            className="px-5 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-2xs transition-all cursor-pointer self-start sm:self-auto"
          >
            Create New Event
          </button>
        )}
      </div>

      {/* Conditional View: Upload Receipt Screen vs Cards Grid */}
      {viewMode === "upload-receipt" && selectedEventForReceipt ? (
        <HostUploadReceiptView
          event={selectedEventForReceipt}
          onBack={() => dispatch(setViewMode("list"))}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {pendingPayments.map((event) => (
            <HostPendingPaymentCard
              key={event.id}
              event={event}
              onUploadReceiptClick={(item) =>
                dispatch(selectEventForReceipt(item))
              }
              onViewInvoiceClick={(item) =>
                dispatch(selectEventForInvoice(item))
              }
            />
          ))}
        </div>
      )}

      {/* Payment Invoice Modal */}
      <HostInvoiceModal
        event={selectedEventForInvoice}
        onClose={() => dispatch(closeInvoiceModal())}
      />
    </div>
  );
};

export default HostPayment;
