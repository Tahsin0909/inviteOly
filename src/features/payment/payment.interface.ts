export type TPricingTierKey =
  | "small"
  | "medium"
  | "large"
  | "intimate"
  | "signature"
  | "grand"
  | "custom";

export type TPricingIconType = "standard" | "premium" | "costume";

export type TButtonVariant = "outline" | "solid";

export interface IPricingPlan {
  id: string;
  name: string;
  iconType: TPricingIconType;
  description: string;
  price: string | null;
  guestRange: string;
  features: string[];
  buttonText: string;
  buttonVariant: TButtonVariant;
  isPopular?: boolean;
  ribbonText?: string;
}

export interface IPricingTab {
  id: TPricingTierKey;
  label: string;
  sublabel: string;
}

export interface IPricingTier {
  id: TPricingTierKey;
  tab: IPricingTab;
  plans: IPricingPlan[];
}

export interface IPayment {
  id: string;
  amount?: number;
  currency?: string;
  status?: string;
  createdAt?: string;
}

export type THostPaymentStatus =
  | "Pending"
  | "Under Review"
  | "Confirmed"
  | "Rejected";

export interface IHostPendingPaymentEvent {
  id: string;
  eventName: string;
  packageType: string;
  eventDate: string;
  eventTime: string;
  eventType?: string;
  hostName: string;
  hostEmail?: string;
  hostPhone?: string;
  venueContact?: string;
  totalGuest: number;
  checkIn: number;
  remaining: number;
  status: THostPaymentStatus;
  receiptUrl?: string | null;
  invoiceId?: string;
  amount?: number;
  currency?: string;
  createdAt?: string;
}

export interface IUploadPaymentProofPayload {
  eventId: string;
  file?: File | string | null;
  receiptName?: string;
  notes?: string;
}

export interface ISubmitInvoicePayload {
  invoiceId: string;
  eventId: string;
  transactionReference: string;
  paymentMethod: "Bank Transfer" | "Stripe" | "Manual Wire";
  amount: number;
  receiptFile?: File | string | null;
  receiptName?: string;
  notes?: string;
}

export interface IPaymentInvoice {
  invoiceId: string;
  eventId: string;
  eventName: string;
  hostName: string;
  hostEmail: string;
  hostPhone: string;
  date: string;
  amount: number;
  currency: string;
  packageType: string;
  status: "Pending" | "Paid";
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string;
    swiftCode?: string;
    referenceNumber: string;
  };
}
