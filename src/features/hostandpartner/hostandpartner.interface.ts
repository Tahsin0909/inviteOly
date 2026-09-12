export type THostInviteStatus =
  | "Pending Confirmation"
  | "Accepted"
  | "Declined"
  | "Expired";

export interface IHostInvite {
  id: string;
  eventName: string;
  hostName: string;
  hostEmail: string;
  hostPhone?: string;
  venueId?: string;
  venueName?: string;
  room?: string;
  eventDate: string;
  endDate?: string;
  eventTime?: string;
  totalGuest?: number | string;
  status: THostInviteStatus;
  packageId: string;
  packageName: string;
  tierId: string;
  tierLabel: string;
  packagePrice: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateHostInvitePayload {
  hostName: string;
  hostEmail: string;
  hostPhone?: string;
  venueId?: string;
  venueName?: string;
  room?: string;
  eventDate: string;
  endDate?: string;
  eventName?: string;
  packageId: string;
  packageName: string;
  tierId: string;
  tierLabel?: string;
  packagePrice?: string | number;
  totalGuest?: number | string;
}

export interface IUpdateHostInvitePayload
  extends Partial<ICreateHostInvitePayload> {
  id: string;
  status?: THostInviteStatus;
}

export interface IHostandpartner {
  id: string;
}
