export interface IMetrics {
  id: string;
}

export type PartnerMetricIconType =
  | "events"
  | "guests"
  | "todayEvents"
  | "venue"
  | "rewards";

export interface IPartnerMetricCard {
  id: string;
  title: string;
  value: string | number;
  iconType: PartnerMetricIconType;
  colorVariant?: "gold" | "coral";
}

export interface IPartnerMetrics {
  welcomeName?: string;
  welcomeSubtitle?: string;
  totalEvents: number;
  totalGuests: number;
  todayEvents: number;
  totalVenues: number;
  pendingRewards: number;
  cards: IPartnerMetricCard[];
}

export interface IPartnerMetricsResponse {
  success: boolean;
  message: string;
  data: IPartnerMetrics;
}

export type HostMetricIconType =
  | "activeEvent"
  | "totalGuest"
  | "rsvpConfirmed"
  | "ticketDistribute"
  | "checkIn";

export interface IHostMetricCard {
  id: string;
  title: string;
  value: string | number;
  totalValue?: string | number;
  subText?: string;
  iconType: HostMetricIconType;
  colorVariant?: "gold" | "coral";
}

export interface IHostMetrics {
  welcomeName?: string;
  welcomeSubtitle?: string;
  activeEvent: number;
  activeEventName?: string;
  totalGuests: number;
  rsvpConfirmed: number;
  ticketsDistributed: number;
  checkInCount: number;
  cards: IHostMetricCard[];
}

export interface IHostMetricsResponse {
  success: boolean;
  message: string;
  data: IHostMetrics;
}


