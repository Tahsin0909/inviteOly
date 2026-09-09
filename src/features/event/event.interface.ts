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
