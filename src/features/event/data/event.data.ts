import {
  IEventCard,
  IPartnerEvent,
  IPartnerEventDetails,
  IPartnerEventsManagementData,
} from "../event.interface";

// 1. Table events on /partner dashboard
export const staticPartnerEvents: IPartnerEvent[] = [
  {
    id: "evt-1",
    eventType: "Marcus Thorne",
    hostName: "Marcus Thorne",
    date: "Oct 12 5:00 PM",
    venueRoom: "Grand Ballroom",
    guests: 560,
    rsvpRate: "92%",
    checkIn: {
      checkedIn: 286,
      total: 560,
      percentage: "51%",
    },
    status: "Live Now",
  },
  {
    id: "evt-2",
    eventType: "Sophia Nguyen",
    hostName: "Sophia Nguyen",
    date: "Oct 28 6:45 PM",
    venueRoom: "Rose Suite",
    guests: 480,
    rsvpRate: "69%",
    checkIn: {
      checkedIn: 331,
      total: 480,
      percentage: "69%",
    },
    status: "Live Now",
  },
  {
    id: "evt-3",
    eventType: "Liam O'Connor",
    hostName: "Liam O'Connor",
    date: "Nov 15 4:00 PM",
    venueRoom: "Sunset Pavilion",
    guests: 530,
    rsvpRate: "74%",
    checkIn: {
      checkedIn: 392,
      total: 530,
      percentage: "74%",
    },
    status: "Scheduled",
  },
  {
    id: "evt-4",
    eventType: "Noah Kim",
    hostName: "Noah Kim",
    date: "Nov 17 11:00 AM",
    venueRoom: "Oceanview Hall",
    guests: 610,
    rsvpRate: "65%",
    checkIn: {
      checkedIn: 397,
      total: 610,
      percentage: "65%",
    },
    status: "Scheduled",
  },
  {
    id: "evt-5",
    eventType: "Liam O'Connor",
    hostName: "Liam O'Connor",
    date: "Nov 15 4:00 PM",
    venueRoom: "Sunset Pavilion",
    guests: 530,
    rsvpRate: "74%",
    checkIn: {
      checkedIn: 392,
      total: 530,
      percentage: "74%",
    },
    status: "Scheduled",
  },
  {
    id: "evt-6",
    eventType: "Sophia Martinez",
    hostName: "Sophia Martinez",
    date: "Nov 18 5:15 PM",
    venueRoom: "Grand Ballroom",
    guests: 750,
    rsvpRate: "80%",
    checkIn: {
      checkedIn: 600,
      total: 750,
      percentage: "80%",
    },
    status: "Scheduled",
  },
  {
    id: "evt-7",
    eventType: "Emma Rodriguez",
    hostName: "Emma Rodriguez",
    date: "Nov 16 2:30 PM",
    venueRoom: "Maple Conference Room",
    guests: 420,
    rsvpRate: "88%",
    checkIn: {
      checkedIn: 370,
      total: 420,
      percentage: "88%",
    },
    status: "Confirmed",
  },
  {
    id: "evt-8",
    eventType: "Ethan Brown",
    hostName: "Ethan Brown",
    date: "Nov 19 9:45 AM",
    venueRoom: "Crystal Hall",
    guests: 480,
    rsvpRate: "90%",
    checkIn: {
      checkedIn: 432,
      total: 480,
      percentage: "90%",
    },
    status: "Confirmed",
  },
];

// 2. Event Cards for Current Events view
export const staticCurrentEventCards: IEventCard[] = [
  {
    id: "cur-1",
    title: "Summer Gala 2026",
    status: "Active",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    guestLabel: "Guests",
    guests: 230,
    checkedIn: 135,
    remaining: 135,
    progressPercentage: 47,
    progressVariant: "green",
  },
  {
    id: "cur-2",
    title: "Summer Gala 2026",
    status: "Active",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    guestLabel: "Guests",
    guests: 230,
    checkedIn: 135,
    remaining: 135,
    progressPercentage: 47,
    progressVariant: "orange",
  },
  {
    id: "cur-3",
    title: "Tech Summit 2026",
    status: "Scheduled",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    guestLabel: "Guests",
    guests: 230,
    checkedIn: 0,
    remaining: 230,
    progressPercentage: 0,
    progressVariant: "gray",
  },
];

// 3. Event Cards for Past Events view
export const staticPastEventCards: IEventCard[] = [
  {
    id: "past-1",
    title: "Summer Gala 2026",
    status: "Active",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    guestLabel: "Guests",
    guests: 230,
    checkedIn: 135,
    remaining: 135,
    progressPercentage: 47,
    progressVariant: "green",
  },
  {
    id: "past-2",
    title: "Summer Gala 2026",
    status: "Active",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    guestLabel: "Total Guest",
    guests: 230,
    checkedIn: 30,
    remaining: 135,
    progressPercentage: 47,
    progressVariant: "orange",
  },
  {
    id: "past-3",
    title: "Tech Summit 2026",
    status: "Scheduled",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    guestLabel: "Total Guest",
    guests: 230,
    checkedIn: 0,
    remaining: 230,
    progressPercentage: 0,
    progressVariant: "gray",
  },
];

// 4. Partner Events Management Aggregated Data
export const staticPartnerEventsManagementData: IPartnerEventsManagementData = {
  dateFormatted: "06 Aug, 2026",
  currentMetrics: {
    todaysEvents: 3,
    upcomingEvents: 2,
    totalGuests: 560,
  },
  pastMetrics: {
    completedEvents: 10,
    totalGuests: 560,
  },
  currentEvents: staticCurrentEventCards,
  pastEvents: staticPastEventCards,
};

// 5. Detailed Event Records for the EventDetails page
export const staticEventDetailsMap: Record<string, IPartnerEventDetails> = {
  // Active Event Details (Matching Screenshot media_1788936119591.png)
  "cur-1": {
    id: "cur-1",
    title: "Summer Gala 2026",
    status: "Active",
    hostName: "Liam Martinez",
    hostEmail: "example@email.com",
    hostPhone: "+1256556326",
    eventTypePrivacy: "Private Event",
    roomName: "Liam Martinez",
    scannerAppCode: "IO-8842-X",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    metrics: {
      guestsTotal: 560,
      rsvpConfirmed: 360,
      ticketsDistributed: 480,
      ticketsTotal: 560,
      checkedIn: 270,
    },
    chart: {
      title: "Guest Attendance",
      percentage: "74.1%",
      segments: [
        { label: "Guest Responses", count: 360, color: "#D1D5DB" },
        { label: "Checked In", count: 180, color: "#16A34A" },
      ],
    },
  },
  "cur-2": {
    id: "cur-2",
    title: "Summer Gala 2026",
    status: "Active",
    hostName: "Liam Martinez",
    hostEmail: "example@email.com",
    hostPhone: "+1256556326",
    eventTypePrivacy: "Private Event",
    roomName: "Rose Ballroom",
    scannerAppCode: "IO-9130-Y",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    metrics: {
      guestsTotal: 560,
      rsvpConfirmed: 360,
      ticketsDistributed: 480,
      ticketsTotal: 560,
      checkedIn: 270,
    },
    chart: {
      title: "Guest Attendance",
      percentage: "74.1%",
      segments: [
        { label: "Guest Responses", count: 360, color: "#D1D5DB" },
        { label: "Checked In", count: 180, color: "#16A34A" },
      ],
    },
  },
  // Scheduled Event Details (Matching Screenshot media_1788936126996.png)
  "cur-3": {
    id: "cur-3",
    title: "Summer Gala 2026",
    status: "Scheduled",
    hostName: "Liam Martinez",
    hostEmail: "example@email.com",
    hostPhone: "+1256556326",
    eventTypePrivacy: "Private Event",
    roomName: "Liam Martinez",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    metrics: {
      guestsTotal: 560,
      rsvpConfirmed: 360,
      ticketsDistributed: 480,
      ticketsTotal: 560,
      availableTickets: 80,
    },
    chart: {
      title: "RSVP Metrics",
      percentage: "74.1%",
      segments: [
        { label: "Confirmed", count: 360, color: "#16A34A" },
        { label: "Pending", count: 180, color: "#F59E0B" },
        { label: "Declined", count: 20, color: "#DC2626" },
      ],
    },
  },
  // Mapping table events: evt-1
  "evt-1": {
    id: "evt-1",
    title: "Marcus Thorne Gala",
    status: "Active",
    hostName: "Marcus Thorne",
    hostEmail: "marcus.thorne@luxuryevents.com",
    hostPhone: "+1 (555) 382-9901",
    eventTypePrivacy: "Private Event",
    roomName: "Grand Ballroom",
    scannerAppCode: "IO-4412-M",
    date: "Oct 12, 2026",
    time: "5:00 PM - 10:00 PM",
    metrics: {
      guestsTotal: 560,
      rsvpConfirmed: 360,
      ticketsDistributed: 480,
      ticketsTotal: 560,
      checkedIn: 286,
    },
    chart: {
      title: "Guest Attendance",
      percentage: "74.1%",
      segments: [
        { label: "Guest Responses", count: 360, color: "#D1D5DB" },
        { label: "Checked In", count: 286, color: "#16A34A" },
      ],
    },
  },
  "evt-2": {
    id: "evt-2",
    title: "Sophia Nguyen Soiree",
    status: "Active",
    hostName: "Sophia Nguyen",
    hostEmail: "sophia.nguyen@example.com",
    hostPhone: "+1 (555) 720-4491",
    eventTypePrivacy: "Private Event",
    roomName: "Rose Suite",
    scannerAppCode: "IO-5521-S",
    date: "Oct 28, 2026",
    time: "6:45 PM - 11:30 PM",
    metrics: {
      guestsTotal: 480,
      rsvpConfirmed: 331,
      ticketsDistributed: 480,
      ticketsTotal: 480,
      checkedIn: 331,
    },
    chart: {
      title: "Guest Attendance",
      percentage: "69.0%",
      segments: [
        { label: "Guest Responses", count: 331, color: "#D1D5DB" },
        { label: "Checked In", count: 331, color: "#16A34A" },
      ],
    },
  },
  "evt-3": {
    id: "evt-3",
    title: "Liam O'Connor Celebration",
    status: "Scheduled",
    hostName: "Liam O'Connor",
    hostEmail: "liam.oconnor@example.com",
    hostPhone: "+1 (555) 890-1234",
    eventTypePrivacy: "Private Event",
    roomName: "Sunset Pavilion",
    date: "Nov 15, 2026",
    time: "4:00 PM - 9:00 PM",
    metrics: {
      guestsTotal: 530,
      rsvpConfirmed: 392,
      ticketsDistributed: 480,
      ticketsTotal: 530,
      availableTickets: 50,
    },
    chart: {
      title: "RSVP Metrics",
      percentage: "74.0%",
      segments: [
        { label: "Confirmed", count: 392, color: "#16A34A" },
        { label: "Pending", count: 118, color: "#F59E0B" },
        { label: "Declined", count: 20, color: "#DC2626" },
      ],
    },
  },
};

// Helper to look up an event's details by ID with dynamic fallback
export const getPartnerEventDetailsById = (id: string): IPartnerEventDetails => {
  if (staticEventDetailsMap[id]) {
    return staticEventDetailsMap[id];
  }

  // Look in table events
  const tableEvt = staticPartnerEvents.find((e) => e.id === id);
  if (tableEvt) {
    const isLive = tableEvt.status === "Live Now";
    return {
      id: tableEvt.id,
      title: `${tableEvt.eventType}`,
      status: isLive ? "Active" : "Scheduled",
      hostName: tableEvt.hostName,
      hostEmail: `${tableEvt.hostName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      hostPhone: "+1 (555) 234-5678",
      eventTypePrivacy: "Private Event",
      roomName: tableEvt.venueRoom,
      scannerAppCode: isLive ? "IO-9912-A" : undefined,
      date: tableEvt.date,
      time: "7:00 PM - 11:00 PM",
      metrics: {
        guestsTotal: tableEvt.guests,
        rsvpConfirmed: Math.round(tableEvt.guests * 0.74),
        ticketsDistributed: Math.round(tableEvt.guests * 0.85),
        ticketsTotal: tableEvt.guests,
        checkedIn: isLive ? tableEvt.checkIn.checkedIn : undefined,
        availableTickets: !isLive ? Math.round(tableEvt.guests * 0.15) : undefined,
      },
      chart: isLive
        ? {
          title: "Guest Attendance",
          percentage: tableEvt.checkIn.percentage,
          segments: [
            { label: "Guest Responses", count: Math.round(tableEvt.guests * 0.74), color: "#D1D5DB" },
            { label: "Checked In", count: tableEvt.checkIn.checkedIn, color: "#16A34A" },
          ],
        }
        : {
          title: "RSVP Metrics",
          percentage: tableEvt.rsvpRate,
          segments: [
            { label: "Confirmed", count: Math.round(tableEvt.guests * 0.74), color: "#16A34A" },
            { label: "Pending", count: Math.round(tableEvt.guests * 0.2), color: "#F59E0B" },
            { label: "Declined", count: Math.round(tableEvt.guests * 0.06), color: "#DC2626" },
          ],
        },
    };
  }

  // Look in current event cards
  const cardEvt =
    staticCurrentEventCards.find((c) => c.id === id) ||
    staticPastEventCards.find((c) => c.id === id);
  if (cardEvt) {
    const isActive = cardEvt.status === "Active";
    return {
      id: cardEvt.id,
      title: cardEvt.title,
      status: cardEvt.status,
      hostName: cardEvt.hostName,
      hostEmail: `${cardEvt.hostName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      hostPhone: "+1256556326",
      eventTypePrivacy: "Private Event",
      roomName: cardEvt.hostName,
      scannerAppCode: isActive ? "IO-8842-X" : undefined,
      date: cardEvt.date,
      time: cardEvt.time,
      metrics: {
        guestsTotal: 560,
        rsvpConfirmed: 360,
        ticketsDistributed: 480,
        ticketsTotal: 560,
        checkedIn: isActive ? 270 : undefined,
        availableTickets: !isActive ? 80 : undefined,
      },
      chart: isActive
        ? {
          title: "Guest Attendance",
          percentage: "74.1%",
          segments: [
            { label: "Guest Responses", count: 360, color: "#D1D5DB" },
            { label: "Checked In", count: 180, color: "#16A34A" },
          ],
        }
        : {
          title: "RSVP Metrics",
          percentage: "74.1%",
          segments: [
            { label: "Confirmed", count: 360, color: "#16A34A" },
            { label: "Pending", count: 180, color: "#F59E0B" },
            { label: "Declined", count: 20, color: "#DC2626" },
          ],
        },
    };
  }

  // Default fallback to Active Summer Gala 2026
  return staticEventDetailsMap["cur-1"];
};

