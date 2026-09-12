import { IHostPendingPaymentEvent, IPaymentInvoice } from "../payment.interface";

export const initialHostPendingPayments: IHostPendingPaymentEvent[] = [
  {
    id: "pay-event-1",
    eventName: "Summer Gala 2026",
    packageType: "Costume",
    eventDate: "Aug 3, 2026",
    eventTime: "7:00 PM - 11:00 PM",
    eventType: "Privet Event",
    hostName: "Liam Martinez",
    hostEmail: "example@email.com",
    hostPhone: "+1256598326",
    venueContact: "+1256598326",
    totalGuest: 230,
    checkIn: 0,
    remaining: 0,
    status: "Pending",
    invoiceId: "INV-2026-8821",
    amount: 499,
    currency: "USD",
    receiptUrl: null,
    createdAt: "2026-08-01T10:00:00Z",
  },
];

export const samplePaymentInvoice: IPaymentInvoice = {
  invoiceId: "INV-2026-8821",
  eventId: "pay-event-1",
  eventName: "Summer Gala 2026",
  hostName: "Liam Martinez",
  hostEmail: "example@email.com",
  hostPhone: "+1256598326",
  date: "Aug 3, 2026",
  amount: 499,
  currency: "USD",
  packageType: "Costume Package",
  status: "Pending",
  bankDetails: {
    bankName: "JPMorgan Chase Bank, N.A.",
    accountName: "InviteOly Events Inc.",
    accountNumber: "987654321098",
    routingNumber: "021000021",
    swiftCode: "CHASUS33",
    referenceNumber: "REF-SG26-8821",
  },
};
