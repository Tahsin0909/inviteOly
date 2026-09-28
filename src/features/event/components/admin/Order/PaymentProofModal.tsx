"use client";

import { MapPin, Phone, Printer, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { defaultEventOrderInvoice } from "../../../data/adminEventOrders.data";
import { IEventOrderItem } from "../../../event.interface";

interface PaymentProofModalProps {
  order: IEventOrderItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (orderId: string) => void;
}

export const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
  order,
  isOpen,
  onClose,
  onApprove,
}) => {
  if (!isOpen || !order) return null;

  const invoice = order.invoice || defaultEventOrderInvoice;

  const handlePrint = () => {
    window.print();
  };

  const handleApprove = () => {
    onApprove(order.id);
    toast.success(`Event order "${order.title}" approved successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 size-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Modal Top Bar: Logo & Print Icon */}
        <div className="flex items-center justify-between pr-10">
          <span className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Invite<span className="text-[#B89047]">Oly</span>
          </span>

          <button
            type="button"
            onClick={handlePrint}
            title="Print Invoice"
            className="size-9 rounded-full bg-[#FAF5EB] dark:bg-primary/10 border border-[#B89047]/30 text-[#B89047] flex items-center justify-center hover:bg-[#FAF5EB]/80 dark:hover:bg-primary/20 cursor-pointer transition-colors shadow-2xs"
          >
            <Printer className="size-4" />
          </button>
        </div>

        {/* Inner Invoice Sheet */}
        <div className="mt-5 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 bg-white dark:bg-neutral-950/60 shadow-2xs">
          {/* Top Row: ISSUED TO & INVOICE */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-wider text-neutral-900 dark:text-white uppercase font-work-sans">
                ISSUED TO
              </p>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 font-work-sans mt-1 space-y-0.5">
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">{invoice.issuedTo.name}</p>
                <p>{invoice.issuedTo.phone}</p>
                <p className="max-w-[200px] leading-relaxed">{invoice.issuedTo.address}</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] tracking-wider font-space-grotesk uppercase leading-none">
                INVOICE
              </h2>
              <div className="text-xs text-neutral-700 dark:text-neutral-300 font-work-sans mt-2 space-y-0.5">
                <p>
                  <span className="font-medium text-neutral-500 dark:text-neutral-400">No : </span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{invoice.invoiceNumber}</span>
                </p>
                <p>
                  <span className="font-medium text-neutral-500 dark:text-neutral-400">Date : </span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{invoice.date}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Table of Items */}
          <div className="mt-6">
            <div className="grid grid-cols-12 bg-[#E0F2FE]/70 dark:bg-sky-950/40 rounded-md py-2 px-3 text-[10.5px] font-bold text-neutral-800 dark:text-sky-300 tracking-wider uppercase font-work-sans select-none">
              <span className="col-span-1">NO</span>
              <span className="col-span-5">DESCRIPTION</span>
              <span className="col-span-2 text-center">QTY</span>
              <span className="col-span-2 text-right">PRICE</span>
              <span className="col-span-2 text-right">SUBTOTAL</span>
            </div>

            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {invoice.items.map((item) => (
                <div
                  key={item.no}
                  className="grid grid-cols-12 py-3 px-3 text-xs text-neutral-700 dark:text-neutral-300 font-work-sans items-center"
                >
                  <span className="col-span-1 font-medium">{item.no}</span>
                  <span className="col-span-5 font-medium text-neutral-900 dark:text-white">{item.description}</span>
                  <span className="col-span-2 text-center text-neutral-600 dark:text-neutral-400">{item.qty}</span>
                  <span className="col-span-2 text-right text-neutral-600 dark:text-neutral-400">${item.price}</span>
                  <span className="col-span-2 text-right font-semibold text-neutral-900 dark:text-white">${item.subtotal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grand Total & Paid Badge */}
          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col items-end gap-2.5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-900 dark:text-white tracking-wider font-work-sans">
                GRAND TOTAL
              </span>
              <div className="bg-[#E0F2FE]/60 dark:bg-sky-950/40 px-4 py-1.5 rounded-sm font-bold text-neutral-900 dark:text-sky-200 text-sm font-space-grotesk">
                ${invoice.grandTotal}
              </div>
            </div>

            {invoice.isPaid && (
              <span className="bg-[#38BDF8] text-white px-5 py-1 rounded-sm text-xs font-semibold font-work-sans shadow-2xs">
                Paid
              </span>
            )}
          </div>

          {/* Footer Information */}
          <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10.5px] font-bold tracking-wider text-neutral-900 dark:text-white uppercase font-work-sans">
                PAYMENT INFORMATION
              </p>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 font-work-sans mt-1 space-y-0.5">
                <p>
                  <span className="text-neutral-500">Name : </span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{invoice.paymentInfo.name}</span>
                </p>
                <p>
                  <span className="text-neutral-500">Bank Account No : </span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{invoice.paymentInfo.bankAccountNo}</span>
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10.5px] font-bold tracking-wider text-neutral-900 dark:text-white uppercase font-work-sans">
                {invoice.businessInfo.name}
              </p>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 font-work-sans mt-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="size-4 rounded-full bg-[#38BDF8] text-white flex items-center justify-center shrink-0">
                    <Phone className="size-2.5" />
                  </div>
                  <span>{invoice.businessInfo.phone}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <div className="size-4 rounded-full bg-[#38BDF8] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="size-2.5" />
                  </div>
                  <span className="leading-tight">{invoice.businessInfo.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Button: Approve Event Ticket */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleApprove}
            className="bg-[#B89047] hover:bg-[#A37E36] text-white font-medium px-8 py-3 rounded-xl transition-colors cursor-pointer text-xs sm:text-sm font-work-sans shadow-sm"
          >
            Approve Event Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentProofModal;
