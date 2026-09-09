import { IPartnerMetrics } from "../metrics.interface";

export const staticPartnerMetrics: IPartnerMetrics = {
  welcomeName: "Alexander",
  welcomeSubtitle:
    "Deliver a seamless arrival experience for every host and every guest.",
  totalEvents: 50,
  totalGuests: 1560,
  todayEvents: 3,
  totalVenues: 10,
  pendingRewards: 2400,
  cards: [
    {
      id: "total-event",
      title: "Total Event",
      value: "50",
      iconType: "events",
      colorVariant: "gold",
    },
    {
      id: "total-guests",
      title: "Total Guests",
      value: "1560",
      iconType: "guests",
      colorVariant: "gold",
    },
    {
      id: "today-events",
      title: "Today's Events",
      value: "3",
      iconType: "todayEvents",
      colorVariant: "gold",
    },
    {
      id: "total-venue",
      title: "Total Venue",
      value: "10",
      iconType: "venue",
      colorVariant: "gold",
    },
    {
      id: "pending-rewards",
      title: "Pending Rewards",
      value: "$2400",
      iconType: "rewards",
      colorVariant: "coral",
    },
  ],
};

