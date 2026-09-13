export type PartnerEventStatus =
  | "Live Now"
  | "Scheduled"
  | "Pending"
  | "Confirmed";

export interface IPartnerEventCheckIn {
  checkedIn: number;
  total: number;
  percentage: string;
}

export interface IPartnerEvent {
  id: string;
  eventType: string;
  hostName: string;
  date: string;
  venueRoom: string;
  guests: number;
  rsvpRate: string;
  checkIn: IPartnerEventCheckIn;
  status: PartnerEventStatus;
}

export type EventCardStatus = "Active" | "Scheduled" | "Completed" | "Pending";

export interface IEventCard {
  id: string;
  title: string;
  status: EventCardStatus;
  date: string;
  time: string;
  hostName: string;
  guests: number;
  checkedIn: number;
  remaining: number;
  progressPercentage: number;
  progressVariant?: "green" | "orange" | "gray" | "blue";
  guestLabel?: string;
}

export interface IPartnerEventCurrentMetrics {
  todaysEvents: number;
  upcomingEvents: number;
  totalGuests: number;
}

export interface IPartnerEventPastMetrics {
  completedEvents: number;
  totalGuests: number;
}

export interface IPartnerEventsManagementData {
  currentMetrics: IPartnerEventCurrentMetrics;
  pastMetrics: IPartnerEventPastMetrics;
  currentEvents: IEventCard[];
  pastEvents: IEventCard[];
  dateFormatted?: string;
}

export interface IEventChartSegment {
  label: string;
  count: number;
  color: string;
  percentage?: number;
}

export interface IEventDetailsChart {
  title: string; // "Guest Attendance" | "RSVP Metrics"
  percentage: string; // "74.1%"
  segments: IEventChartSegment[];
}

export interface IEventDetailsMetrics {
  guestsTotal: number;
  rsvpConfirmed: number;
  ticketsDistributed: number;
  ticketsTotal: number;
  checkedIn?: number;
  availableTickets?: number;
}

export interface IPartnerEventDetails {
  id: string;
  title: string;
  status: EventCardStatus;
  hostName: string;
  hostEmail: string;
  hostPhone: string;
  eventTypePrivacy: string; // "Private Event"
  roomName: string; // e.g. "Liam Martinez" or "Grand Ballroom"
  scannerAppCode?: string;
  date: string; // "Aug 3, 2026"
  time: string; // "7:00 PM - 11:00 PM"
  metrics: IEventDetailsMetrics;
  chart: IEventDetailsChart;
}

export interface IEvent {
  id: string;
  [key: string]: unknown;
}

// Host Event Types
export type THostEventStatus =
  | "Active"
  | "Scheduled"
  | "Draft"
  | "Upload Payment Receipt";

export type THostEventTier = "Premium" | "Standard" | "Costume";

export type THostTicketStatus = "Editable" | "Locked/ Ready" | "Sent" | "Voided";

export type TRsvpStatus = "--" | "Pending" | "Confirm" | "Decline";

export type TReminderStatus = "--" | "Reminder" | "Follow-up";

export interface IHostEventItem {
  id: string;
  title: string;
  status: THostEventStatus;
  tier?: THostEventTier;
  date: string;
  time: string;
  eventType: string;
  hostName: string;
  hostEmail: string;
  hostPhone: string;
  scannerCode?: string;
  totalGuests: number;
  checkedIn: number;
  remaining: number;
  progressPercentage: number;
}

export interface IHostTicketGuest {
  id: string;
  ticketId: string;
  guestName: string;
  guestEmail?: string;
  table: string;
  rsvpStatus: TRsvpStatus;
  reminderStatus: TReminderStatus;
  ticketType: string;
  ticketLink?: string;
  checkInTime?: string;
  status: THostTicketStatus;
}

export interface IAddGuestPayload {
  guestName: string;
  guestEmail: string;
  ticketType: string;
  table: string;
}

export interface ITicketFilterCounts {
  all: number;
  editable: number;
  locked: number;
  sent: number;
  voided: number;
  rsvpDeadline?: string;
}

// Host Dashboard Table & RSVP Metrics Types
export type HostDashboardEventStatus = "Live Now" | "Scheduled" | "Pending";

export interface IHostDashboardCheckIn {
  checkedIn: number;
  total: number;
}

export interface IHostDashboardEvent {
  id: string;
  eventName: string;
  date: string;
  rsvpRate?: number | null; // e.g. 92, 65, or null/undefined
  checkIn?: IHostDashboardCheckIn | string | null; // e.g. { checkedIn: 286, total: 560 } or "286/560" or "--"
  status: HostDashboardEventStatus;
}

export interface IHostRsvpBreakdownItem {
  label: "Confirmed" | "Pending" | "Declined";
  count: number;
  color: string;
}

export interface IHostRsvpMetrics {
  totalInvited: number;
  confirmationRate: string; // e.g. "74.1%"
  confirmed: number;
  pending: number;
  declined: number;
  summaryText: string;
  segments?: IHostRsvpBreakdownItem[];
}

