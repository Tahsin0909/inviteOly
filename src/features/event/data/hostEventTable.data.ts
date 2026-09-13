import { IHostDashboardEvent, IHostRsvpMetrics } from "../event.interface";

/**
 * Mock data for Host Dashboard Events Table matching screenshot
 */
export const staticHostDashboardEvents: IHostDashboardEvent[] = [
  {
    id: "evt-host-1",
    eventName: "Marcus Thorne",
    date: "Oct 12, 2026",
    rsvpRate: 92,
    checkIn: {
      checkedIn: 286,
      total: 560,
    },
    status: "Live Now",
  },
  {
    id: "evt-host-2",
    eventName: "Nia Johnson",
    date: "Nov 05, 2026",
    rsvpRate: 65,
    checkIn: {
      checkedIn: 289,
      total: 317,
    },
    status: "Scheduled",
  },
  {
    id: "evt-host-3",
    eventName: "Nia Johnson",
    date: "Nov 05, 2026",
    rsvpRate: null,
    checkIn: null,
    status: "Pending",
  },
  {
    id: "evt-host-4",
    eventName: "Nia Johnson",
    date: "Nov 05, 2026",
    rsvpRate: null,
    checkIn: null,
    status: "Pending",
  },
  {
    id: "evt-host-5",
    eventName: "Nia Johnson",
    date: "Nov 05, 2026",
    rsvpRate: null,
    checkIn: null,
    status: "Pending",
  },
  {
    id: "evt-host-6",
    eventName: "Nia Johnson",
    date: "Nov 05, 2026",
    rsvpRate: null,
    checkIn: null,
    status: "Pending",
  },
  {
    id: "evt-host-7",
    eventName: "Nia Johnson",
    date: "Nov 05, 2026",
    rsvpRate: null,
    checkIn: null,
    status: "Pending",
  },
  {
    id: "evt-host-8",
    eventName: "Nia Johnson",
    date: "Nov 05, 2026",
    rsvpRate: null,
    checkIn: null,
    status: "Pending",
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

