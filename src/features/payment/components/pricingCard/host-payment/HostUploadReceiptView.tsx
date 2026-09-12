"use client";

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { IHostPendingPaymentEvent } from "../../../payment.interface";
import { uploadPaymentProof, setViewMode } from "../../../store/payment.slice";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  FileCheck,
  Mail,
  Phone,
  Upload,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface HostUploadReceiptViewProps {
  event: IHostPendingPaymentEvent;
  onBack: () => void;
}

export const HostUploadReceiptView: React.FC<HostUploadReceiptViewProps> = ({
  event,
  onBack,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select or drop a payment receipt file first");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(
        uploadPaymentProof({
          eventId: event.id,
          receiptName: selectedFile.name,
          file: selectedFile.name,
        })
      );

      toast.success(
        "Payment proof submitted successfully! Your receipt is now under review."
      );
      setIsSubmitting(false);
      dispatch(setViewMode("list"));
    }, 600);
  };

  return (
    <div className="w-full space-y-6 font-work-sans">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Payment Pending</span>
      </button>

      {/* 1. Top Event Details Card */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-4">
        {/* Pending Badge */}
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706]">
            {event.status}
          </span>
        </div>

        {/* Event Title */}
        <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
          {event.eventName}
        </h2>

        {/* Meta Info Row 1 (Calendar, Clock, Event Type) */}
        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-neutral-400" />
            <span>{event.eventDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="size-4 text-neutral-400" />
            <span>{event.eventTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-neutral-400" />
            <span>{event.eventType || "Privet Event"}</span>
          </div>
        </div>

        {/* Meta Info Row 2 (Host, Email, Phone, Venue Contact) */}
        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-600 pt-1">
          <div className="flex items-center gap-2">
            <User className="size-4 text-neutral-400" />
            <span>{event.hostName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="size-4 text-neutral-400" />
            <span>{event.hostEmail || "example@email.com"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="size-4 text-neutral-400" />
            <span>{event.hostPhone || "+1256598326"}</span>
          </div>

          <div className="text-neutral-500">
            Venue Contact:{" "}
            <span className="text-neutral-700 font-medium">
              {event.venueContact || "+1256598326"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Upload Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-2">
            Upload Payment Receipt
          </label>

          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full min-h-[200px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all bg-white ${
              isDragging
                ? "border-[#C39B4C] bg-[#FAF5EB]/50 scale-[0.99]"
                : selectedFile
                ? "border-emerald-400 bg-emerald-50/20"
                : "border-neutral-200 hover:border-[#C39B4C]/60 hover:bg-neutral-50/50"
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
                <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FileCheck className="size-6" />
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
                  className="mt-2 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  <X className="size-3.5" />
                  <span>Remove file</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="size-11 rounded-full bg-amber-50 text-[#C39B4C] flex items-center justify-center shadow-2xs border border-amber-200/60">
                  <Upload className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800">
                    Drag &amp; drop Payment Receipt
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    or click to browse
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Accepted Formats: PDF (Max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !selectedFile}
            className="px-6 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit Payment Proof"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HostUploadReceiptView;
