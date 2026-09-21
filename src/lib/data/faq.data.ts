export interface FaqItem {
  id: string;
  category: string;
  categoryTitle: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "about-privacy-tickets",
    title: "ABOUT, PRIVACY & TICKETS",
    items: [
      {
        id: "apt-1",
        category: "about-privacy-tickets",
        categoryTitle: "ABOUT, PRIVACY & TICKETS",
        question: "What is InviteOly?",
        answer:
          "InviteOly is a guest management and secure QR ticketing platform for private, invite-only events. Hosts manage guest tickets, control entry, and monitor check-ins from their own dashboard.",
      },
      {
        id: "apt-2",
        category: "about-privacy-tickets",
        categoryTitle: "ABOUT, PRIVACY & TICKETS",
        question: "Will my event be listed or publicized online?",
        answer:
          "No. InviteOly does not publicly list, advertise, or open your event for public ticket sales. You manage tickets and guest information privately through your Host Dashboard.",
      },
      {
        id: "apt-3",
        category: "about-privacy-tickets",
        categoryTitle: "ABOUT, PRIVACY & TICKETS",
        question: "Do guests have to pay for their tickets?",
        answer:
          "No. Your guests never purchase tickets or pay InviteOly. The Host pays for the InviteOly service.",
      },
      {
        id: "apt-4",
        category: "about-privacy-tickets",
        categoryTitle: "ABOUT, PRIVACY & TICKETS",
        question: "Do guests need to create an InviteOly account?",
        answer:
          "No. Your guests do not create an account, register, download an app, or remember a password to access their ticket.",
      },
      {
        id: "apt-5",
        category: "about-privacy-tickets",
        categoryTitle: "ABOUT, PRIVACY & TICKETS",
        question: "How do guests receive their tickets?",
        answer:
          "You can copy and send each private ticket link yourself. Premium also allows InviteOly to automatically email personalized tickets.",
      },
    ],
  },
  {
    id: "security-packages-rsvp",
    title: "SECURITY, PACKAGES & RSVP",
    items: [
      {
        id: "spr-1",
        category: "security-packages-rsvp",
        categoryTitle: "SECURITY, PACKAGES & RSVP",
        question: "Are the tickets secure?",
        answer:
          "Yes. Every ticket has a unique QR code. After staff scan a valid ticket, its status updates to prevent duplicate entry.",
      },
      {
        id: "spr-2",
        category: "security-packages-rsvp",
        categoryTitle: "SECURITY, PACKAGES & RSVP",
        question: "What is the difference between Standard and Premium?",
        answer:
          "Standard offers secure QR tickets and organized entry through a simple dashboard. Premium adds personalized tickets, RSVP management, automatic email delivery, optional table or seat details, and expanded tracking.",
      },
      {
        id: "spr-3",
        category: "security-packages-rsvp",
        categoryTitle: "SECURITY, PACKAGES & RSVP",
        question: "Are guest names shown on Standard tickets?",
        answer:
          "No. Standard tickets use labels such as Guest 001, Guest 002, and Guest 003. Hosts may privately assign names in the dashboard for tracking and verification.",
      },
      {
        id: "spr-4",
        category: "security-packages-rsvp",
        categoryTitle: "SECURITY, PACKAGES & RSVP",
        question: "How does RSVP work with Premium?",
        answer:
          "Premium can require guests to Accept or Decline before their ticket appears and activates. Guests respond directly from their private ticket page without registering for an account.",
      },
      {
        id: "spr-5",
        category: "security-packages-rsvp",
        categoryTitle: "SECURITY, PACKAGES & RSVP",
        question: "Can I set an RSVP deadline?",
        answer:
          "Yes. Guests who accept before the deadline can access their active ticket. When a guest does not respond by the deadline, InviteOly automatically voids the ticket.",
      },
    ],
  },
  {
    id: "guest-access-event-details",
    title: "GUEST ACCESS & EVENT DETAILS",
    items: [
      {
        id: "gaed-1",
        category: "guest-access-event-details",
        categoryTitle: "GUEST ACCESS & EVENT DETAILS",
        question: "What happens if a guest declines?",
        answer:
          "InviteOly voids the ticket and updates the RSVP status in the Host Dashboard, helping the Host maintain an accurate guest count.",
      },
      {
        id: "gaed-2",
        category: "guest-access-event-details",
        categoryTitle: "GUEST ACCESS & EVENT DETAILS",
        question: "Can door staff verify a name that is not shown on the ticket?",
        answer:
          "Yes. When a Host assigns a name in the dashboard, authorized door staff can view it in the InviteOly Scan App and compare it with the guest's ID when required.",
      },
      {
        id: "gaed-3",
        category: "guest-access-event-details",
        categoryTitle: "GUEST ACCESS & EVENT DETAILS",
        question: "Can guests share one registration link with other people?",
        answer:
          "InviteOly has no open registration link. The Host creates and manages each ticket, keeping control over who receives access to the event.",
      },
      {
        id: "gaed-4",
        category: "guest-access-event-details",
        categoryTitle: "GUEST ACCESS & EVENT DETAILS",
        question: "Can I add different ticket types?",
        answer:
          "Yes. Organize guests as Adult, Child, General Admission, VIP, Vendor, Staff, or another category suited to your event.",
      },
      {
        id: "gaed-5",
        category: "guest-access-event-details",
        categoryTitle: "GUEST ACCESS & EVENT DETAILS",
        question: "Can I add table or seat information?",
        answer:
          "Yes. Premium tickets can display optional table and seat information for weddings, receptions, galas, and other seated events.",
      },
    ],
  },
  {
    id: "scanning-live-entry",
    title: "SCANNING & LIVE ENTRY",
    items: [
      {
        id: "sle-1",
        category: "scanning-live-entry",
        categoryTitle: "SCANNING & LIVE ENTRY",
        question: "Can I add event requirements to the ticket?",
        answer:
          "Yes. Display age restrictions, ID requirements, dress code, entry requirements, and a custom Host's Note directly on the ticket page.",
      },
      {
        id: "sle-2",
        category: "scanning-live-entry",
        categoryTitle: "SCANNING & LIVE ENTRY",
        question: "Can I require guests to show ID?",
        answer:
          "Yes. Hosts can set ID verification requirements. Door staff can use ticket information in the Scan App to help verify guests when required.",
      },
      {
        id: "sle-3",
        category: "scanning-live-entry",
        categoryTitle: "SCANNING & LIVE ENTRY",
        question: "How do we scan tickets at the event?",
        answer:
          "Download the InviteOly Scan App to a compatible smartphone with a camera. Enter the Scanner Login Code from the event dashboard, then begin scanning tickets.",
      },
      {
        id: "sle-4",
        category: "scanning-live-entry",
        categoryTitle: "SCANNING & LIVE ENTRY",
        question: "Do door attendants need their own InviteOly accounts?",
        answer:
          "No. Door attendants access the event scanner with the Scanner Login Code provided by the Host or Partner.",
      },
      {
        id: "sle-5",
        category: "scanning-live-entry",
        categoryTitle: "SCANNING & LIVE ENTRY",
        question: "Do I need special scanning equipment?",
        answer:
          "No. A compatible smartphone with a camera and the InviteOly Scan App can scan tickets.",
      },
    ],
  },
  {
    id: "ticket-management",
    title: "TICKET MANAGEMENT",
    items: [
      {
        id: "tm-1",
        category: "ticket-management",
        categoryTitle: "TICKET MANAGEMENT",
        question: "Can I see how many guests have arrived?",
        answer:
          "Yes. The Host Dashboard provides live entry visibility so you can monitor ticket scans and guest arrivals during the event.",
      },
      {
        id: "tm-2",
        category: "ticket-management",
        categoryTitle: "TICKET MANAGEMENT",
        question: "Can I edit a ticket after creating it?",
        answer:
          "Yes, while the ticket remains editable. Once you Lock & Finalize a ticket, InviteOly secures its information for sending.",
      },
      {
        id: "tm-3",
        category: "ticket-management",
        categoryTitle: "TICKET MANAGEMENT",
        question: "Can I cancel a guest's ticket?",
        answer:
          "Yes. Hosts can void a ticket from the dashboard. A voided ticket no longer grants entry.",
      },
      {
        id: "tm-4",
        category: "ticket-management",
        categoryTitle: "TICKET MANAGEMENT",
        question: "Can guests add their ticket to their phone wallet?",
        answer:
          "Yes. Eligible tickets support Add to Wallet. For Premium events with RSVP, this option appears after the guest accepts and activates the ticket.",
      },
      {
        id: "tm-5",
        category: "ticket-management",
        categoryTitle: "TICKET MANAGEMENT",
        question: "Does InviteOly provide door staff?",
        answer:
          "For direct bookings, the Host provides attendants who scan tickets and enforce entry requirements. For Partner bookings, the InviteOly Partner may provide and coordinate door staff.",
      },
    ],
  },
  {
    id: "events-purpose",
    title: "EVENTS & PURPOSE",
    items: [
      {
        id: "ep-1",
        category: "events-purpose",
        categoryTitle: "EVENTS & PURPOSE",
        question: "What types of events can use InviteOly?",
        answer:
          "InviteOly supports private weddings, engagements, Nikkah or Nekah ceremonies, henna events, receptions, birthdays, private parties, corporate events, dinners, galas, VIP events, and other controlled-entry events.",
      },
      {
        id: "ep-2",
        category: "events-purpose",
        categoryTitle: "EVENTS & PURPOSE",
        question: "Is InviteOly an invitation service?",
        answer:
          "InviteOly focuses on guest management and secure tickets for entry rather than traditional digital invitations. Hosts control who receives a valid ticket and who enters the event.",
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap(
  (category) => category.items
);

