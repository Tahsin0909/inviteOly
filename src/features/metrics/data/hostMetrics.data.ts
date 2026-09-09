import { IHostMetrics } from "../metrics.interface";

export const staticHostMetrics: IHostMetrics = {
  welcomeName: "Alexander",
  welcomeSubtitle:
    "Here is a live overview of your hosted events and guest activity across your luxury portfolio.",
  activeEvent: 1,
  activeEventName: "Marcus Thorne",
  totalGuests: 560,
  rsvpConfirmed: 360,
  ticketsDistributed: 480,
  checkInCount: 270,
  cards: [
    {
      id: "active-event",
      title: "Active Event",
      value: "1",
      subText: "Marcus Thorne",
      iconType: "activeEvent",
      colorVariant: "gold",
    },
    {
      id: "total-guest",
      title: "Total Guest",
      value: "560",
      iconType: "totalGuest",
      colorVariant: "gold",
    },
    {
      id: "rsvp-confirmed",
      title: "RSVP Confirmed",
      value: "360",
      iconType: "rsvpConfirmed",
      colorVariant: "gold",
    },
    {
      id: "ticket-distribute",
      title: "Ticket Distribute",
      value: "480",
      totalValue: "560",
      iconType: "ticketDistribute",
      colorVariant: "gold",
    },
    {
      id: "check-in",
      title: "Check in",
      value: "270",
      totalValue: "560",
      iconType: "checkIn",
      colorVariant: "gold",
    },
  ],
};

