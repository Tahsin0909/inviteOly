export type TMarketingType =
  | "Brochure"
  | "How It Works"
  | "Premium Info"
  | "Social Media"
  | "Guidelines"
  | "Banner";

export type TMarketingAudience = "Partner" | "Host" | "Both";

export type TMarketingStatus = "Published" | "Draft";

export interface IMarketing {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileType?: string;
  fileUrl?: string;
  type: TMarketingType | string;
  audience: TMarketingAudience;
  status: TMarketingStatus;
  updatedDate: string;
  description: string;
  imageUrl?: string;
  downloadCount?: number;
}

export interface IMarketingStats {
  totalMaterials: number;
  partnerMaterials: number;
  hostMaterials: number;
}
