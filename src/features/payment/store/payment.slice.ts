import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IHostPendingPaymentEvent,
  IUploadPaymentProofPayload,
  ISubmitInvoicePayload,
} from "../payment.interface";
import { initialHostPendingPayments } from "../data/hostPayment.data";

export interface PaymentState {
  pendingPayments: IHostPendingPaymentEvent[];
  selectedEventForReceipt: IHostPendingPaymentEvent | null;
  selectedEventForInvoice: IHostPendingPaymentEvent | null;
  viewMode: "list" | "upload-receipt";
}

const initialState: PaymentState = {
  pendingPayments: initialHostPendingPayments,
  selectedEventForReceipt: null,
  selectedEventForInvoice: null,
  viewMode: "list",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<"list" | "upload-receipt">) => {
      state.viewMode = action.payload;
    },
    selectEventForReceipt: (
      state,
      action: PayloadAction<IHostPendingPaymentEvent | null>
    ) => {
      state.selectedEventForReceipt = action.payload;
      state.viewMode = action.payload ? "upload-receipt" : "list";
    },
    selectEventForInvoice: (
      state,
      action: PayloadAction<IHostPendingPaymentEvent | null>
    ) => {
      state.selectedEventForInvoice = action.payload;
    },
    closeInvoiceModal: (state) => {
      state.selectedEventForInvoice = null;
    },
    uploadPaymentProof: (
      state,
      action: PayloadAction<IUploadPaymentProofPayload>
    ) => {
      const idx = state.pendingPayments.findIndex(
        (p) => p.id === action.payload.eventId
      );
      if (idx !== -1) {
        state.pendingPayments[idx].status = "Under Review";
        state.pendingPayments[idx].receiptUrl =
          typeof action.payload.file === "string"
            ? action.payload.file
            : "/uploads/receipts/sample-receipt.pdf";
      }
      state.viewMode = "list";
      state.selectedEventForReceipt = null;
    },
    submitInvoice: (state, action: PayloadAction<ISubmitInvoicePayload>) => {
      const idx = state.pendingPayments.findIndex(
        (p) => p.id === action.payload.eventId
      );
      if (idx !== -1) {
        state.pendingPayments[idx].status = "Under Review";
        if (action.payload.receiptName) {
          state.pendingPayments[idx].receiptUrl = `/uploads/receipts/${action.payload.receiptName}`;
        }
      }
      state.selectedEventForInvoice = null;
      state.viewMode = "list";
    },
    confirmPayment: (state, action: PayloadAction<string>) => {
      const idx = state.pendingPayments.findIndex(
        (p) => p.id === action.payload
      );
      if (idx !== -1) {
        state.pendingPayments[idx].status = "Confirmed";
      }
    },
    requestCustomQuote: (
      state,
      action: PayloadAction<{
        eventName: string;
        eventDate?: string;
        eventTime?: string;
        hostName?: string;
        hostEmail?: string;
        hostPhone?: string;
        venueContact?: string;
        totalGuest?: number;
        notes?: string;
      }>
    ) => {
      const newCustomPayment: IHostPendingPaymentEvent = {
        id: `pay-event-${Date.now()}`,
        eventName: action.payload.eventName || "Summer Gala 2026",
        packageType: "Costume",
        eventDate: action.payload.eventDate || "Aug 3, 2026",
        eventTime: action.payload.eventTime || "7:00 PM - 11:00 PM",
        eventType: "Privet Event",
        hostName: action.payload.hostName || "Liam Martinez",
        hostEmail: action.payload.hostEmail || "example@email.com",
        hostPhone: action.payload.hostPhone || "+1256598326",
        venueContact: action.payload.venueContact || "+1256598326",
        totalGuest: action.payload.totalGuest || 230,
        checkIn: 0,
        remaining: 0,
        status: "Pending",
        invoiceId: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: 499,
        currency: "USD",
        receiptUrl: null,
        createdAt: new Date().toISOString(),
      };
      state.pendingPayments.unshift(newCustomPayment);
      state.selectedEventForReceipt = newCustomPayment;
      state.viewMode = "list";
    },
    autoGeneratePackageInvoice: (
      state,
      action: PayloadAction<{
        planId: string;
        planName: string;
        price: string;
        tierLabel?: string;
        eventName?: string;
      }>
    ) => {
      const numericAmount =
        parseInt(action.payload.price.replace(/[^0-9]/g, ""), 10) || 149;
      const newPackagePayment: IHostPendingPaymentEvent = {
        id: `pay-pkg-${Date.now()}`,
        eventName:
          action.payload.eventName || `${action.payload.planName} Event 2026`,
        packageType: action.payload.planName,
        eventDate: "Aug 3, 2026",
        eventTime: "7:00 PM - 11:00 PM",
        eventType: "Privet Event",
        hostName: "Liam Martinez",
        hostEmail: "example@email.com",
        hostPhone: "+1256598326",
        venueContact: "+1256598326",
        totalGuest: 200,
        checkIn: 0,
        remaining: 0,
        status: "Pending",
        invoiceId: `INV-AUTO-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: numericAmount,
        currency: "USD",
        receiptUrl: null,
        createdAt: new Date().toISOString(),
      };
      state.pendingPayments.unshift(newPackagePayment);
      state.selectedEventForReceipt = newPackagePayment;
      state.viewMode = "list";
    },
  },
});

export const {
  setViewMode,
  selectEventForReceipt,
  selectEventForInvoice,
  closeInvoiceModal,
  uploadPaymentProof,
  submitInvoice,
  confirmPayment,
  requestCustomQuote,
  autoGeneratePackageInvoice,
} = paymentSlice.actions;

export const paymentReducer = paymentSlice.reducer;
