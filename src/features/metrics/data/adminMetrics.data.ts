import {
  IAdminMetrics,
  IRecentRegisteredUser,
  IRevenueBreakdown,
} from "../metrics.interface";

export const staticAdminMetrics: IAdminMetrics = {
  welcomeName: "Shaima",
  welcomeSubtitle:
    "Monitor, manage, and oversee your entire platform from one place.",
  cards: [
    {
      id: "total-partner",
      title: "Total Partner",
      value: "2,214",
      growthRate: "+12%",
      iconType: "totalPartner",
      colorVariant: "gold",
    },
    {
      id: "total-host",
      title: "Total Host",
      value: "2,486",
      growthRate: "+12%",
      iconType: "totalHost",
      colorVariant: "gold",
    },
    {
      id: "new-registered-partner",
      title: "New Registered Partner",
      value: "2,214",
      growthRate: "+12%",
      iconType: "newRegisteredPartner",
      colorVariant: "gold",
    },
    {
      id: "new-registered-host",
      title: "New Registered Host",
      value: "2,214",
      growthRate: "+12%",
      iconType: "newRegisteredHost",
      colorVariant: "gold",
    },
  ],
};

export const staticRevenueBreakdown: IRevenueBreakdown = {
  totalRevenue: "$18,420",
  timeframe: "Last 30 Days",
  selectedMonth: "Jun",
  selectedMonthAmount: "$8879.09",
  data: [
    { month: "Jan", amount: 2800, formattedAmount: "$2,800" },
    { month: "Feb", amount: 8000, formattedAmount: "$8,000" },
    { month: "Mar", amount: 4200, formattedAmount: "$4,200" },
    { month: "Apr", amount: 17200, formattedAmount: "$17,200" },
    { month: "May", amount: 22800, formattedAmount: "$22,800" },
    {
      month: "Jun",
      amount: 32000,
      formattedAmount: "$8,879.09",
      tooltipText: "This month: $8879.09",
      isSelected: true,
    },
    { month: "Jul", amount: 15900, formattedAmount: "$15,900" },
    { month: "Aug", amount: 22100, formattedAmount: "$22,100" },
    { month: "Sep", amount: 12000, formattedAmount: "$12,000" },
    { month: "Oct", amount: 9800, formattedAmount: "$9,800" },
    { month: "Nov", amount: 20000, formattedAmount: "$20,000" },
    { month: "Dec", amount: 32500, formattedAmount: "$32,500" },
  ],
};

export const staticRecentRegisteredUsers: IRecentRegisteredUser[] = [
  {
    id: "user-1",
    name: "Marcus Thorne",
    role: "Partner",
  },
  {
    id: "user-2",
    name: "Sarah Jenkins",
    role: "Host",
  },
  {
    id: "user-3",
    name: "David Chen",
    role: "Partner",
  },
  {
    id: "user-4",
    name: "Elena Rodriguez",
    role: "Partner",
  },
  {
    id: "user-5",
    name: "Elena Rodriguez",
    role: "Host",
  },
];

