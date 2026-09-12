import { IHostPendingPaymentEvent, IPaymentInvoice } from "../payment.interface";

export const initialHostPendingPayments: IHostPendingPaymentEvent[] = [
  {
    id: "pay-event-1",
    eventName: "Summer Gala 2026",
    packageType: "Costume",
    eventDate: "Aug 2, 2026",
    eventTime: "7:00 PM - 11:00 PM",
    eventType: "Privet Event",
    hostName: "Liam Martinez",
    hostEmail: "example@gmail.com",
    hostPhone: "+1234567890",
    venueContact: "+1234567890",
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
  {
    id: "pay-event-2",
    eventName: "Autumn Grand Gala 2026",
    packageType: "Costume",
    eventDate: "Sep 15, 2026",
    eventTime: "6:00 PM - 10:30 PM",
    eventType: "Privet Event",
    hostName: "Marcus Vance",
    hostEmail: "marcus.vance@example.com",
    hostPhone: "+1987654321",
    venueContact: "+1987654321",
    totalGuest: 350,
    checkIn: 0,
    remaining: 0,
    status: "Pending",
    invoiceId: "INV-2026-9140",
    amount: 599,
    currency: "USD",
    receiptUrl: null,
    createdAt: "2026-08-10T11:00:00Z",
  },
];

export const getHostPendingPaymentById = (id: string): IHostPendingPaymentEvent => {
  const found = initialHostPendingPayments.find((item) => item.id === id);
  return found || initialHostPendingPayments[0];
};

export const samplePaymentInvoice: IPaymentInvoice = {
  invoiceId: "INV-2026-8821",
  eventId: "pay-event-1",
  eventName: "Summer Gala 2026",
  hostName: "Liam Martinez",
  hostEmail: "example@gmail.com",
  hostPhone: "+1234567890",
  date: "Aug 2, 2026",
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
