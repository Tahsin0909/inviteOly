export type TRewardStatus = "Pending" | "Approved" | "Paid" | "Rejected";
export type TPayoutStatus = "Paid" | "Payout" | "Processing" | "Failed";
export type TPayoutMethod = "Bank Transfer" | "PayPal" | "Stripe";

export interface IRewardStats {
  totalRewards: number;
  pendingRewards: number;
  paidRewards: number;
  rewardsPayout?: number;
  commissionRate?: number;
}

export interface IPendingRewardItem {
  id: string;
  partnerName?: string;
  partnerEmail?: string;
  eventName: string;
  orderId: string;
  date: string;
  ticketRevenue: string | number;
  rate: string | number;
  reward: string | number;
  status: TRewardStatus;
  hostName?: string;
}

export interface IPayoutHistoryItem {
  id: string;
  payoutId: string;
  partnerName?: string;
  partnerEmail?: string;
  date: string;
  referenceId: string;
  method: TPayoutMethod;
  reward: string | number;
  status: TPayoutStatus;
}

export interface IRequestPayoutPayload {
  amount: number;
  method: TPayoutMethod;
  accountDetails: string;
  notes?: string;
}

export interface IUpdateCommissionPayload {
  commissionRate: number;
}

export interface IReward {
  id: string;
  partnerId?: string;
  hostId?: string;
  amount: number;
  status: TRewardStatus;
}

