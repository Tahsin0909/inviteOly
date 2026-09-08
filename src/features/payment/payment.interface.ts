export type TPricingTierKey = "small" | "medium" | "large";

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
