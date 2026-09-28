"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import {
    selectEventForInvoice,
    closeInvoiceModal,
} from "../../../store/payment.slice";
import HostPendingPaymentCard from "./HostPendingPaymentCard";
import HostInvoiceModal from "./HostInvoiceModal";
import { Plus } from "lucide-react";

export const HostPayment: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const paymentState = useSelector((state: RootState) => state.payment);
    const pendingPayments = paymentState?.pendingPayments || [];
    const selectedEventForInvoice = paymentState?.selectedEventForInvoice || null;

    const handleCreateNewEvent = () => {
        router.push("/host/events");
    };

    const handleUploadReceipt = (eventId: string) => {
        router.push(`/host/payment-pending/${eventId}`);
    };

    return (
        <div className="w-full space-y-6 font-work-sans pb-16">
            {/* Header with Title, Subtitle, and Create New Event button matching media_1789203657029.png */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
                        Payment Pending
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-1">
                        Your payment is currently being processed. We&apos;ll update your
                        payment status once it&apos;s confirmed.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreateNewEvent}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#C39B4C] hover:bg-[#b08b3e] active:scale-[0.98] text-white text-xs sm:text-sm font-medium rounded-lg shadow-2xs transition-all cursor-pointer self-start sm:self-auto font-work-sans"
                >
                    <Plus className="h-4 w-4" />
                    Create New Event
                </button>
            </div>

            {/* Cards Grid matching media_1789203657029.png */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {pendingPayments.map((event) => (
                    <HostPendingPaymentCard
                        key={event.id}
                        event={event}
                        onUploadReceiptClick={(item) => handleUploadReceipt(item.id)}
                        onViewInvoiceClick={(item) => dispatch(selectEventForInvoice(item))}
                    />
                ))}
            </div>

            {/* Bank Transfer Invoice Modal */}
            <HostInvoiceModal
                event={selectedEventForInvoice}
                onClose={() => dispatch(closeInvoiceModal())}
            />
        </div>
    );
};

export default HostPayment;
