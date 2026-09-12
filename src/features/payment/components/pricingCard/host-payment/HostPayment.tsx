"use client";

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import {
    setViewMode,
    selectEventForReceipt,
    selectEventForInvoice,
    closeInvoiceModal,
    uploadPaymentProof,
} from "../../../store/payment.slice";
import { updateHostEventStatus } from "@/features/event/store/event.slice";
import HostPendingPaymentCard from "./HostPendingPaymentCard";
import HostInvoiceModal from "./HostInvoiceModal";
import {
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    FileCheck,
    X,
    ArrowLeft,
    Plus,
    CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

// Ticket icon matching Privet Event in reference screenshot
const TicketIcon = () => (
    <svg
        className="h-4 w-4 text-neutral-400 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
    </svg>
);

// Upload icon matching the circular arrow in reference screenshot
const UploadArrowIcon = () => (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF3E7] text-[#C39B4C] mb-3">
        <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 16V4" />
            <path d="m6 10 6-6 6 6" />
            <path d="M4 20h16" />
        </svg>
    </div>
);

export const HostPayment: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const paymentState = useSelector((state: RootState) => state.payment);
    const pendingPayments = paymentState?.pendingPayments || [];
    const selectedEventForReceipt =
        paymentState?.selectedEventForReceipt || pendingPayments[0] || null;
    const selectedEventForInvoice = paymentState?.selectedEventForInvoice || null;
    const viewMode = paymentState?.viewMode || "list";

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleCreateNewEvent = () => {
        router.push("/host/events");
    };

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        const isPdfOrImage =
            file.type === "application/pdf" ||
            file.type.startsWith("image/") ||
            file.name.endsWith(".pdf");

        if (!isPdfOrImage) {
            toast.error("Please upload a PDF document or image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB limit");
            return;
        }

        setSelectedFile(file);
        toast.success(`Selected file: ${file.name}`);
    };

    const handleSubmitProof = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Please select or drop a payment receipt file first");
            return;
        }

        if (!selectedEventForReceipt) return;

        setIsSubmitting(true);

        setTimeout(() => {
            // 1. Update payment state
            dispatch(
                uploadPaymentProof({
                    eventId: selectedEventForReceipt.id,
                    receiptName: selectedFile.name,
                    file: selectedFile.name,
                })
            );

            // 2. Also update event slice if matching event exists
            dispatch(
                updateHostEventStatus({
                    title: selectedEventForReceipt.eventName,
                    status: "Draft",
                })
            );

            toast.success(
                "Payment proof submitted successfully! Your receipt is now under review."
            );
            setIsSubmitting(false);
            setSelectedFile(null);
        }, 600);
    };

    return (
        <div className="w-full space-y-6 font-work-sans pb-16">
            {/* Top Navigation Switcher between Overview and Upload Receipt Screen */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200/80 bg-white px-4 py-2 text-xs text-gray-600 shadow-2xs">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">Payment Screen:</span>
                    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
                        <button
                            type="button"
                            onClick={() => dispatch(setViewMode("list"))}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${viewMode === "list"
                                    ? "bg-white text-gray-900 shadow-xs"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Overview (Image 1)
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (pendingPayments.length > 0 && !paymentState.selectedEventForReceipt) {
                                    dispatch(selectEventForReceipt(pendingPayments[0]));
                                } else {
                                    dispatch(setViewMode("upload-receipt"));
                                }
                            }}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${viewMode === "upload-receipt"
                                    ? "bg-white text-gray-900 shadow-xs"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Upload Receipt (Image 2)
                        </button>
                    </div>
                </div>

                {viewMode === "upload-receipt" && (
                    <button
                        type="button"
                        onClick={() => dispatch(setViewMode("list"))}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#C39B4C] transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Overview
                    </button>
                )}
            </div>

            {/* View 1: Screen 1 matching media_1789203657029.png */}
            {viewMode === "list" ? (
                <div className="space-y-6">
                    {/* Header with Title, Subtitle, and Create New Event button */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                                Payment Pending
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
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
                                onUploadReceiptClick={(item) =>
                                    dispatch(selectEventForReceipt(item))
                                }
                                onViewInvoiceClick={(item) =>
                                    dispatch(selectEventForInvoice(item))
                                }
                            />
                        ))}
                    </div>
                </div>
            ) : (
                /* View 2: Screen 2 matching media_1789203662927.png */
                selectedEventForReceipt && (
                    <div className="space-y-6">
                        {/* Header: Title and Subtitle without button */}
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                                Payment Pending
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
                                Your payment is currently being processed. We&apos;ll update your
                                payment status once it&apos;s confirmed.
                            </p>
                        </div>

                        {/* Event Details Card matching media_1789203662927.png */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-100 p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-4">
                            {/* Pending Badge */}
                            <div>
                                <span
                                    className={`inline-block px-3 py-0.5 rounded-md text-xs font-medium ${selectedEventForReceipt.status === "Pending"
                                            ? "bg-[#FFF4E5] text-[#D97706]"
                                            : selectedEventForReceipt.status === "Under Review"
                                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        }`}
                                >
                                    {selectedEventForReceipt.status}
                                </span>
                            </div>

                            {/* Event Title */}
                            <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                                {selectedEventForReceipt.eventName}
                            </h2>

                            {/* Meta Row 1: Calendar, Clock, Event Type */}
                            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-neutral-400 shrink-0" />
                                    <span>{selectedEventForReceipt.eventDate}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-neutral-400 shrink-0" />
                                    <span>{selectedEventForReceipt.eventTime}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <TicketIcon />
                                    <span>
                                        {selectedEventForReceipt.eventType || "Privet Event"}
                                    </span>
                                </div>
                            </div>

                            {/* Meta Row 2: Host, Email, Phone, Venue Contact */}
                            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-600 pt-0.5">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-neutral-400 shrink-0" />
                                    <span>{selectedEventForReceipt.hostName}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-neutral-400 shrink-0" />
                                    <span>
                                        {selectedEventForReceipt.hostEmail || "example@email.com"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-neutral-400 shrink-0" />
                                    <span>
                                        {selectedEventForReceipt.hostPhone || "+1256598326"}
                                    </span>
                                </div>

                                <div className="text-neutral-500">
                                    Venue Contact:{" "}
                                    <span className="text-neutral-700 font-medium">
                                        {selectedEventForReceipt.venueContact || "+1256598326"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Under Review Notice if submitted */}
                        {selectedEventForReceipt.status === "Under Review" && (
                            <div className="flex items-center justify-between rounded-xl bg-blue-50/80 border border-blue-200/80 p-4 text-xs sm:text-sm text-blue-900">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                                    <span>
                                        <strong>Payment receipt submitted.</strong> Our
                                        administrative team is currently verifying the wire transfer.
                                    </span>
                                </div>
                                <span className="text-xs font-semibold text-blue-700">
                                    Under Review
                                </span>
                            </div>
                        )}

                        {/* Upload Payment Receipt Section matching media_1789203662927.png */}
                        <form onSubmit={handleSubmitProof} className="space-y-4 pt-1">
                            <h3 className="text-sm sm:text-base font-bold text-neutral-900 font-work-sans">
                                Upload Payment Receipt
                            </h3>

                            {/* Drag & Drop Area */}
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleFileDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`w-full min-h-[220px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all bg-white ${isDragging
                                        ? "border-[#C39B4C] bg-[#FAF5EB]/50 scale-[0.99]"
                                        : selectedFile
                                            ? "border-emerald-400 bg-emerald-50/20"
                                            : "border-neutral-200 hover:border-[#C39B4C]/60 hover:bg-neutral-50/40"
                                    }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,application/pdf,image/*"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />

                                {selectedFile ? (
                                    <div className="flex flex-col items-center gap-2 animate-in fade-in">
                                        <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                            <FileCheck className="h-6 w-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-neutral-900">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-xs text-neutral-400">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFile(null);
                                            }}
                                            className="mt-2 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                            <span>Remove file</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <UploadArrowIcon />
                                        <p className="text-sm font-bold text-neutral-800">
                                            Drag &amp; drop Payment Receipt
                                        </p>
                                        <p className="text-xs text-neutral-400 mt-1">
                                            or click to browser
                                        </p>
                                        <p className="text-xs text-neutral-400 mt-1">
                                            Accepted formats: PDF (Max 5MB)
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Submit Payment Proof Button at bottom right */}
                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !selectedFile}
                                    className="rounded-lg bg-[#C39B4C] px-6 py-2.5 text-xs sm:text-sm font-medium text-white shadow-xs hover:bg-[#b08b3e] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer font-work-sans"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Payment Proof"}
                                </button>
                            </div>
                        </form>
                    </div>
                )
            )}

            {/* Bank Transfer Invoice Modal */}
            <HostInvoiceModal
                event={selectedEventForInvoice}
                onClose={() => dispatch(closeInvoiceModal())}
            />
        </div>
    );
};

export default HostPayment;
