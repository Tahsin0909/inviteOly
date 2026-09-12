"use client";

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { IHostPendingPaymentEvent } from "../../../payment.interface";
import { uploadPaymentProof } from "../../../store/payment.slice";
import { updateHostEventStatus } from "@/features/event/store/event.slice";
import { getHostPendingPaymentById, initialHostPendingPayments } from "../../../data/hostPayment.data";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileCheck,
  X,
  ArrowLeft,
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
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF3E7] text-[#C39B4C] mb-3 shadow-2xs">
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

interface HostUploadReceiptViewProps {
  eventId?: string;
  event?: IHostPendingPaymentEvent;
  onBack?: () => void;
}

export const HostUploadReceiptView: React.FC<HostUploadReceiptViewProps> = ({
  eventId,
  event: propEvent,
  onBack,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Retrieve event from Redux or fallback to mock
  const pendingPayments = useSelector(
    (state: RootState) => state.payment?.pendingPayments || []
  );

  const currentEvent: IHostPendingPaymentEvent =
    propEvent ||
    pendingPayments.find((e) => e.id === eventId) ||
    (eventId ? getHostPendingPaymentById(eventId) : null) ||
    pendingPayments[0] ||
    initialHostPendingPayments[0];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/host/payment-pending");
    }
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
    const isAllowed =
      file.type === "application/pdf" ||
      file.type.startsWith("image/") ||
      file.name.endsWith(".pdf") ||
      file.name.endsWith(".csv") ||
      file.type === "text/csv";

    if (!isAllowed) {
      toast.error("Please upload a PDF, image, or CSV document");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }

    toast.success(`Selected file: ${file.name}`);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select or drop a payment receipt file first");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Update payment status in Redux
      dispatch(
        uploadPaymentProof({
          eventId: currentEvent.id,
          receiptName: selectedFile.name,
          file: selectedFile.name,
        })
      );

      // 2. Also update event status in event slice if matching
      dispatch(
        updateHostEventStatus({
          title: currentEvent.eventName,
          status: "Draft",
        })
      );

      toast.success(
        "Payment proof submitted successfully! Your receipt is now under review."
      );
      setIsSubmitting(false);
      setSelectedFile(null);
      setFilePreview(null);
    }, 600);
  };

  return (
    <div className="w-full space-y-6 font-work-sans pb-16">
      {/* Top Back Navigation Link */}
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Payment Pending</span>
      </button>

      {/* Page Header: Title and Subtitle matching media_1789205148981.png */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
          Payment Pending
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
          Your payment is currently being processed. We&apos;ll update your payment status once it&apos;s confirmed.
        </p>
      </div>

      {/* Event Details Card matching media_1789205148981.png */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-100 p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-4">
        {/* Pending Badge */}
        <div>
          <span
            className={`inline-block px-3 py-0.5 rounded-md text-xs font-medium ${currentEvent.status === "Pending"
              ? "bg-[#FFF4E5] text-[#D97706]"
              : currentEvent.status === "Under Review"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
          >
            {currentEvent.status}
          </span>
        </div>

        {/* Event Title */}
        <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
          {currentEvent.eventName}
        </h2>

        {/* Meta Row 1: Calendar, Clock, Event Type */}
        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-neutral-400 shrink-0" />
            <span>{currentEvent.eventDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-neutral-400 shrink-0" />
            <span>{currentEvent.eventTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <TicketIcon />
            <span>{currentEvent.eventType || "Privet Event"}</span>
          </div>
        </div>

        {/* Meta Row 2: Host, Email, Phone, Venue Contact */}
        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-600 pt-0.5">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-neutral-400 shrink-0" />
            <span>{currentEvent.hostName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-neutral-400 shrink-0" />
            <span>{currentEvent.hostEmail || "example@gmail.com"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-neutral-400 shrink-0" />
            <span>{currentEvent.hostPhone || "+1234567890"}</span>
          </div>

          <div className="text-neutral-500">
            Venue Contact:{" "}
            <span className="text-neutral-700 font-medium">
              {currentEvent.venueContact || "+1234567890"}
            </span>
          </div>
        </div>
      </div>

      {/* Under Review Notice if submitted */}
      {currentEvent.status === "Under Review" && (
        <div className="flex items-center justify-between rounded-xl bg-blue-50/80 border border-blue-200/80 p-4 text-xs sm:text-sm text-blue-900 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
            <span>
              <strong>Payment receipt submitted.</strong> Our administrative team is currently verifying the wire transfer.
            </span>
          </div>
          <span className="text-xs font-semibold text-blue-700">Under Review</span>
        </div>
      )}

      {/* Upload Payment Receipt Section matching media_1789205148981.png */}
      <form onSubmit={handleSubmitProof} className="space-y-4 pt-1">
        <h3 className="text-sm sm:text-base font-bold text-neutral-900 font-work-sans">
          Upload Payment Receipt
        </h3>

        {/* Drag & Drop Area matching media_1789205148981.png */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full min-h-[220px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all bg-[#FCFBF8] ${isDragging
            ? "border-[#C39B4C] bg-[#FAF5EB]/70 scale-[0.99]"
            : selectedFile
              ? "border-emerald-400 bg-emerald-50/30"
              : "border-neutral-200 hover:border-[#C39B4C]/60 hover:bg-neutral-50/60"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf,image/*,.csv"
            className="hidden"
            onChange={handleFileSelect}
          />

          {selectedFile ? (
            <div className="flex flex-col items-center gap-2.5 animate-in fade-in">
              {filePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={filePreview}
                  alt="Receipt Preview"
                  className="h-20 w-auto max-w-[200px] object-contain rounded-lg border border-neutral-200 shadow-xs mb-1"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs">
                  <FileCheck className="h-6 w-6" />
                </div>
              )}
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
                  setFilePreview(null);
                }}
                className="mt-1 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Remove file</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadArrowIcon />
              <p className="text-sm font-bold text-neutral-800 font-work-sans">
                Drag &amp; drop the receipt file here
              </p>
              <p className="text-xs text-neutral-400 mt-1 font-work-sans">
                or browse file
              </p>
              <p className="text-xs text-neutral-400 mt-1 font-work-sans">
                Acceptable formats: PDF, Image, CSV...
              </p>
            </div>
          )}
        </div>

        {/* Submit Payment Proof Button at bottom right matching media_1789205148981.png */}
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
  );
};

export default HostUploadReceiptView;
