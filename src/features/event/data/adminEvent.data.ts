import {
  IAdminEventCard,
  IAdminEventDetails,
  IAdminEventGuest,
  IAdminEventMetrics,
  IAdminEventsResponseData,
} from "../event.interface";

export const staticAdminEventMetrics: IAdminEventMetrics = {
  totalEvents: 2486,
  activeEvents: 10,
  completedEvents: 420,
};

export const staticAdminEvents: IAdminEventCard[] = [
  {
    id: "evt-admin-1",
    title: "Spring Fling Festival",
    tier: "Standard",
    date: "Apr 22, 2026",
    time: "3:00 PM - 9:00 PM",
    hostName: "Ethan Patel",
    venue: "Meadowview Gardens, San Francisco",
    totalGuests: 175,
    status: "Active",
  },
  {
    id: "evt-admin-2",
    title: "Winter Wonderland Ball",
    tier: "Premium",
    date: "Dec 12, 2026",
    time: "8:00 PM - 12:00 AM",
    hostName: "Sophia Kim",
    venue: "Crystal Palace, New York",
    totalGuests: 310,
    status: "Active",
  },
  {
    id: "evt-admin-3",
    title: "Summer Gala 2026",
    tier: "Premium",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    venue: "Royal Convention Hall, Dhaka",
    totalGuests: 230,
    status: "Active",
  },
  {
    id: "evt-admin-4",
    title: "Autumn Harvest Feast",
    tier: "Premium",
    date: "Oct 14, 2026",
    time: "5:00 PM - 10:00 PM",
    hostName: "Olivia Nguyen",
    venue: "Golden Fields Vineyard, Napa Valley",
    totalGuests: 195,
    status: "Active",
  },
  {
    id: "evt-admin-5",
    title: "Winter Wonderland Ball",
    tier: "Standard",
    date: "Dec 12, 2026",
    time: "8:00 PM - 12:00 AM",
    hostName: "Sophia Kim",
    venue: "Crystal Palace, New York",
    totalGuests: 310,
    status: "Active",
  },
  {
    id: "evt-admin-6",
    title: "Summer Gala 2026",
    tier: "Standard",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    venue: "Royal Convention Hall, Dhaka",
    totalGuests: 230,
    status: "Active",
  },
  {
    id: "evt-admin-7",
    title: "Midnight Masquerade",
    tier: "Premium",
    date: "Nov 20, 2026",
    time: "9:00 PM - 2:00 AM",
    hostName: "Noah Johnson",
    venue: "The Grand Ballroom, Chicago",
    totalGuests: 280,
    status: "Active",
  },
  {
    id: "evt-admin-8",
    title: "Winter Wonderland Ball",
    tier: "Premium",
    date: "Dec 12, 2026",
    time: "8:00 PM - 12:00 AM",
    hostName: "Sophia Kim",
    venue: "Crystal Palace, New York",
    totalGuests: 310,
    status: "Active",
  },
  {
    id: "evt-admin-9",
    title: "Summer Gala 2026",
    tier: "Standard",
    date: "Aug 3, 2026",
    time: "7:00 PM - 11:00 PM",
    hostName: "Liam Martinez",
    venue: "Royal Convention Hall, Dhaka",
    totalGuests: 230,
    status: "Active",
  },
];

export const staticAdminEventsData: IAdminEventsResponseData = {
  metrics: staticAdminEventMetrics,
  events: staticAdminEvents,
};

// 17 Mock Guests matching mockup screenshot
export const staticAdminEventGuests: IAdminEventGuest[] = [
  { id: "gst-1", name: "Marcus Thorne", email: "example@gmail.com", ticketType: "General Admission", seat: "A1" },
  { id: "gst-2", name: "Dmitri Ivanov", email: "dmitri.ivanov@example.com", ticketType: "General Admission", seat: "A2" },
  { id: "gst-3", name: "Zara Ali", email: "zara.ali@example.com", ticketType: "Child", seat: "A3" },
  { id: "gst-4", name: "Ethan Brooks", email: "ethan.brooks@example.com", ticketType: "VIP", seat: "A4" },
  { id: "gst-5", name: "Raj Patel", email: "raj.patel@example.com", ticketType: "Staff", seat: "A5" },
  { id: "gst-6", name: "Sofia Petrov", email: "sofia.petrov@example.com", ticketType: "Vendor", seat: "A6" },
  { id: "gst-7", name: "Omar El-Sayed", email: "omar.elsayed@example.com", ticketType: "General Admission", seat: "A7" },
  { id: "gst-8", name: "Maya Nguyen", email: "maya.nguyen@example.com", ticketType: "VIP", seat: "A8" },
  { id: "gst-9", name: "Nina Johansson", email: "nina.johansson@example.com", ticketType: "Staff", seat: "A9" },
  { id: "gst-10", name: "Jasper Liu", email: "jasper.liu@example.com", ticketType: "Child", seat: "A10" },
  { id: "gst-11", name: "Lucia Ferrer", email: "lucia.ferrer@example.com", ticketType: "VIP", seat: "A11" },
  { id: "gst-12", name: "Anika Bose", email: "anika.bose@example.com", ticketType: "Staff", seat: "A12" },
  { id: "gst-13", name: "Chloe Martin", email: "chloe.martin@example.com", ticketType: "VIP", seat: "A13" },
  { id: "gst-14", name: "Elena Ramirez", email: "elena.ramirez@example.com", ticketType: "Vendor", seat: "A14" },
  { id: "gst-15", name: "Liam O'Connor", email: "liam.oconnor@example.com", ticketType: "Staff", seat: "A15" },
  { id: "gst-16", name: "Marcus Thorne", email: "example@gmail.com", ticketType: "VIP", seat: "A16" },
  { id: "gst-17", name: "Carlos Mendes", email: "carlos.mendes@example.com", ticketType: "Staff", seat: "A17" },
];

export const staticAdminEventDetails: IAdminEventDetails = {
  id: "evt-admin-1",
  tier: "Premium",
  hostName: "John Doe",
  hostType: "Individual",
  email: "john.doe@example.com",
  phone: "+(000)000-0000",
  companyName: "---",
  eventName: "John Doe",
  eventType: "Wedding",
  eventDescription:
    "Lorem ipsum dolor sit amet consectetur. Purus sem egestas suspendisse sit tristique libero massa imperdiet laoreet. Nunc iaculis pharetra enim integer feugiat. Arcu lectus consectetur vitae etiam urna urna congue ut metus. Orci montes mus a magnis lobortis quis faucibus eget. Morbi faucibus pulvinar tristique quis lectus. Sem nisi mauris tristique mauris lorem. Ut adipiscing viverra varius justo sit.",
  eventDate: "mm / dd / yyyy",
  endDate: "mm / dd / yyyy",
  startTime: "--:-- --",
  endTime: "--:-- --",
  venue: "Select venue",
  room: "Hall A",
  venueState: "Banasree,Dhaka,Bangladesh",
  city: "Banasree,Dhaka,Bangladesh",
  postalCode: "Banasree,Dhaka,Bangladesh",
  venueContact: "+015487456489",
  venueGuestCapacity: "e.g,500",
  estimateGuestCount: "e.g,400",
  guests: staticAdminEventGuests,
};

export const getAdminEventDetailsById = (id: string): IAdminEventDetails => {
  const matchedEvent = staticAdminEvents.find((e) => e.id === id);
  if (!matchedEvent) {
    return {
      ...staticAdminEventDetails,
      id,
    };
  }

  return {
    ...staticAdminEventDetails,
    id: matchedEvent.id,
    tier: matchedEvent.tier,
    hostName: matchedEvent.hostName,
    eventName: matchedEvent.title,
    eventDate: matchedEvent.date,
    endDate: matchedEvent.date,
    startTime: matchedEvent.time.split(" - ")[0] || "3:00 PM",
    endTime: matchedEvent.time.split(" - ")[1] || "9:00 PM",
    venue: matchedEvent.venue.split(",")[0]?.trim() || "Select venue",
    city: matchedEvent.venue.split(",")[1]?.trim() || "San Francisco",
    estimateGuestCount: matchedEvent.totalGuests,
    venueGuestCapacity: matchedEvent.totalGuests + 100,
  };
};
