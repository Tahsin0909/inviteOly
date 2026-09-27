import { IHostDashboardEvent, IHostRsvpMetrics } from "../event.interface";

/**
 * Mock data for Host Dashboard Events Table matching screenshot
 */
export const staticHostDashboardEvents: IHostDashboardEvent[] = [
  {
    id: "host-evt-1",
    eventName: "Summer Gala 2026 (Premium • Active)",
    date: "Aug 3, 2026",
    rsvpRate: 74,
    checkIn: {
      checkedIn: 135,
      total: 230,
    },
    status: "Live Now",
  },
  {
    id: "host-evt-2",
    eventName: "Tech Summit 2026 (Standard • Scheduled)",
    date: "Oct 15, 2026",
    rsvpRate: 0,
    checkIn: {
      checkedIn: 0,
      total: 230,
    },
    status: "Scheduled",
  },
  {
    id: "host-evt-3",
    eventName: "Summer Gala 2026 (Standard • Active)",
    date: "Aug 3, 2026",
    rsvpRate: 58,
    checkIn: {
      checkedIn: 135,
      total: 230,
    },
    status: "Live Now",
  },
  {
    id: "host-evt-4",
    eventName: "Annual Charity Gala 2026 (Premium • Scheduled)",
    date: "Nov 20, 2026",
    rsvpRate: 85,
    checkIn: {
      checkedIn: 0,
      total: 180,
    },
    status: "Scheduled",
  },
  {
    id: "host-evt-5",
    eventName: "Midnight Symphony Gala 2026 (Premium • Live)",
    date: "Tonight",
    rsvpRate: 94,
    checkIn: {
      checkedIn: 185,
      total: 250,
    },
    status: "Live Now",
  },
  {
    id: "host-evt-6",
    eventName: "Metro Tech Expo 2026 (Standard • Live)",
    date: "Today",
    rsvpRate: 70,
    checkIn: {
      checkedIn: 210,
      total: 300,
    },
    status: "Live Now",
  },
];

/**
 * Mock data for Host Dashboard RSVP Metrics matching screenshot
 */
export const staticHostRsvpMetrics: IHostRsvpMetrics = {
  totalInvited: 560,
  confirmationRate: "74.1%",
  confirmed: 360,
  pending: 180,
  declined: 20,
  summaryText: "Total invited 560. Current confirmation rate is 74.1%, up from last week's projection.",
  segments: [
    { label: "Confirmed", count: 360, color: "#0FA958" },
    { label: "Pending", count: 180, color: "#E5A000" },
    { label: "Declined", count: 20, color: "#B91C1C" },
  ],
};

