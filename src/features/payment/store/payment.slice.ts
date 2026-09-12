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
} = paymentSlice.actions;

export const paymentReducer = paymentSlice.reducer;
