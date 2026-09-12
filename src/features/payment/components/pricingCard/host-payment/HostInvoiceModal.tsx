"use client";

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { IHostPendingPaymentEvent } from "../../../payment.interface";
import { samplePaymentInvoice } from "../../../data/hostPayment.data";
import { submitInvoice } from "../../../store/payment.slice";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Download,
  FileCheck,
  FileText,
  Landmark,
  Send,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface HostInvoiceModalProps {
  event: IHostPendingPaymentEvent | null;
  onClose: () => void;
}

export const HostInvoiceModal: React.FC<HostInvoiceModalProps> = ({
  event,
  onClose,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitMode, setIsSubmitMode] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"Bank Transfer" | "Stripe">("Bank Transfer");
  const [transactionRef, setTransactionRef] = useState<string>("REF-SG26-8821");
  const [notes, setNotes] = useState<string>("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!event) return null;

  const invoice = {
    ...samplePaymentInvoice,
    eventId: event.id,
    eventName: event.eventName,
    hostName: event.hostName,
    hostEmail: event.hostEmail || "example@email.com",
    hostPhone: event.hostPhone || "+1256598326",
    date: event.eventDate,
    amount: event.amount || 499,
  };

  const handleDownload = () => {
    toast.success(`Downloading invoice ${invoice.invoiceId}...`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      setReceiptFile(file);
      toast.success(`Attached receipt: ${file.name}`);
    }
  };

  const handleSubmitInvoice = (e: React.FormEvent) => {
    e.preventDefault();

    if (!transactionRef.trim()) {
      toast.error("Please enter a transaction reference number");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(
        submitInvoice({
          invoiceId: invoice.invoiceId,
          eventId: event.id,
          paymentMethod,
          transactionReference: transactionRef.trim(),
          amount: invoice.amount,
          receiptName: receiptFile?.name || "receipt.pdf",
          notes: notes.trim(),
        })
      );

      toast.success(
        `Invoice ${invoice.invoiceId} submitted successfully! Your payment proof is under review.`
      );
      setIsSubmitting(false);
      setIsSubmitMode(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-work-sans">
      <div
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-100 p-6 sm:p-7 z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-[#C39B4C]/10 text-[#C39B4C] flex items-center justify-center">
              {isSubmitMode ? <Send className="size-5" /> : <FileText className="size-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold font-space-grotesk text-neutral-900">
                {isSubmitMode ? "Submit Payment Invoice" : "Payment Invoice"}
              </h3>
              <p className="text-xs text-neutral-500">
                Invoice ID: {invoice.invoiceId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* View Mode: Submit Form vs Invoice View */}
        {isSubmitMode ? (
          /* ========================================================================= */
          /* SUBMIT INVOICE FORM */
          /* ========================================================================= */
          <form onSubmit={handleSubmitInvoice} className="space-y-4 pt-4 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-neutral-400 block text-[11px]">Event</span>
                <span className="font-semibold text-neutral-900">{invoice.eventName}</span>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 block text-[11px]">Amount</span>
                <span className="font-bold text-[#C39B4C] text-sm">${invoice.amount}.00</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Payment Method Used
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("Bank Transfer")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${paymentMethod === "Bank Transfer"
                    ? "border-[#C39B4C] bg-[#FFFBF0] text-[#C39B4C] font-semibold shadow-2xs"
                    : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                >
                  <Landmark className="size-4" />
                  <span>Bank Transfer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Stripe")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${paymentMethod === "Stripe"
                    ? "border-[#C39B4C] bg-[#FFFBF0] text-[#C39B4C] font-semibold shadow-2xs"
                    : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                >
                  <CreditCard className="size-4" />
                  <span>Stripe</span>
                </button>
              </div>
            </div>

            {/* Transaction Reference */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Transaction / Wire Reference #
              </label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="e.g. REF-SG26-8821 or Wire Ref #"
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] bg-white font-mono"
              />
            </div>

            {/* Receipt File Upload */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Attach Payment Receipt / Slip
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-neutral-200 hover:border-[#C39B4C]/60 rounded-xl p-4 text-center cursor-pointer transition-colors bg-neutral-50/50 hover:bg-neutral-50"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf,image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {receiptFile ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-600">
                    <FileCheck className="size-5" />
                    <span className="font-semibold text-neutral-800">{receiptFile.name}</span>
                    <span className="text-[11px] text-neutral-400">
                      ({(receiptFile.size / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-neutral-500">
                    <Upload className="size-5 text-[#C39B4C]" />
                    <span className="font-medium text-neutral-700">Click to upload transfer receipt</span>
                    <span className="text-[11px] text-neutral-400">PDF, JPG, PNG (Max 5MB)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Notes or Remarks (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional details about your payment..."
                className="w-full px-3.5 py-2 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] bg-white resize-none"
              />
            </div>

            {/* Submit Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setIsSubmitMode(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back to Invoice</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] text-white text-xs font-semibold rounded-lg shadow-2xs cursor-pointer transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="size-4" />
                <span>{isSubmitting ? "Submitting..." : "Confirm & Submit Invoice"}</span>
              </button>
            </div>
          </form>
        ) : (
          /* ========================================================================= */
          /* INVOICE DETAILS VIEW */
          /* ========================================================================= */
          <>
            <div className="space-y-4 pt-4 text-xs text-neutral-600">
              {/* Status & Date */}
              <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-xl">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Date</span>
                  <span className="font-semibold text-neutral-800">
                    {invoice.date}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-400 block text-[11px]">Status</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706]">
                    {invoice.status}
                  </span>
                </div>
              </div>

              {/* Event & Host Info */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-xl">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Event</span>
                  <span className="font-semibold text-neutral-900 text-sm">
                    {invoice.eventName}
                  </span>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">
                    {invoice.packageType}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Host</span>
                  <span className="font-semibold text-neutral-900 text-sm">
                    {invoice.hostName}
                  </span>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">
                    {invoice.hostEmail}
                  </span>
                </div>
              </div>

              {/* Bank Transfer Details */}
              <div className="p-4 bg-amber-50/60 border border-[#C39B4C]/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-[#C39B4C] font-semibold text-xs mb-1">
                  <Landmark className="size-4" />
                  <span>Official Bank Transfer Instructions</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-neutral-400 block">Bank Name:</span>
                    <span className="font-medium text-neutral-800">
                      {invoice.bankDetails.bankName}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Account Name:</span>
                    <span className="font-medium text-neutral-800">
                      {invoice.bankDetails.accountName}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Account Number:</span>
                    <span className="font-mono font-medium text-neutral-800">
                      {invoice.bankDetails.accountNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Routing Number:</span>
                    <span className="font-mono font-medium text-neutral-800">
                      {invoice.bankDetails.routingNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">SWIFT / BIC:</span>
                    <span className="font-mono font-medium text-neutral-800">
                      {invoice.bankDetails.swiftCode}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Reference ID:</span>
                    <span className="font-mono font-bold text-[#C39B4C]">
                      {invoice.bankDetails.referenceNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount Due */}
              <div className="flex justify-between items-center p-3 bg-neutral-900 text-white rounded-xl">
                <div>
                  <span className="text-neutral-400 text-xs">Total Amount Due</span>
                  <p className="text-xs text-neutral-400">
                    Includes all taxes & package licenses
                  </p>
                </div>
                <span className="text-2xl font-bold font-space-grotesk text-[#C39B4C]">
                  ${invoice.amount}.00
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-5 border-t border-neutral-100 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold rounded-lg shadow-2xs cursor-pointer transition-all"
                >
                  <Download className="size-3.5" />
                  <span>Download</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    router.push(`/host/payment-pending/${event.id}`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#C39B4C]/60 text-[#C39B4C] hover:bg-[#FFFBF0] text-xs font-semibold rounded-lg shadow-2xs cursor-pointer transition-all"
                >
                  <Upload className="size-3.5" />
                  <span>Upload Receipt</span>
                </button>

                {/* Submit Invoice Action Button */}
                <button
                  type="button"
                  onClick={() => setIsSubmitMode(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] text-white text-xs font-semibold rounded-lg shadow-2xs cursor-pointer transition-all"
                >
                  <Send className="size-3.5" />
                  <span>Submit Invoice</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HostInvoiceModal;
