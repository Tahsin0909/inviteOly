export type TPromoDiscountType = "Percentage" | "Fixed";
export type TPromoCodeStatus = "Active" | "Expired";

export interface IPromotionalCode {
  id: string;
  code: string;
  type: TPromoDiscountType;
  value: string;
  validFrom: string;
  validTo: string;
  status: TPromoCodeStatus;
  createdAt?: string;
  usageCount?: number;
}

// Backward-compatible alias
export type IPromotionalCodes = IPromotionalCode;

export interface ICreatePromoCodePayload {
  code: string;
  discountType: TPromoDiscountType;
  discountValue: string;
  validFrom: string;
  validTo: string;
}
