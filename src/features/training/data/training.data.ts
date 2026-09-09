import { IFAQItem, ITrainingModule } from "../training.interface";

// 1. Partner Training Modules
export const partnerTrainingModules: ITrainingModule[] = [
  {
    id: "getting-started",
    title: "Getting Started with InviteOly",
    steps: [
      {
        number: 1,
        title: "What InviteOly Is & How It Works",
        paragraphs: [
          "InviteOly is a guest management and QR ticketing service for private, invite-only events.",
          "For Hosts: Hosts choose a package, set up their event, manage tickets and guests through their Host Dashboard, and monitor guest check-in on event day.",
          "For Partners: Partners can offer InviteOly to their clients as a premium guest-management service, invite clients to book, monitor events taking place at their venue, and earn Partner Rewards on qualifying referred bookings.",
        ],
      },
      {
        number: 2,
        title: "Understanding the Partner/Venue Dashboard",
        paragraphs: [
          "Your Partner Dashboard is your central place to manage your InviteOly partnership. You can view upcoming events, referred bookings, Partner Rewards, training resources, marketing materials, and other partnership information.",
        ],
      },
      {
        number: 3,
        title: "How Partner bookings work",
        paragraphs: [
          "When you introduce a client to InviteOly, use the Marketing section of your dashboard to access materials and information that explain the service, packages, benefits, and booking process.",
          "Use Invite a Host to refer your client. Once the Host completes their booking and payment, the event will appear in your Partner Dashboard and qualifying bookings will count toward your Partner Rewards.",
        ],
      },
      {
        number: 4,
        title: "How direct bookings at your venue appear in your dashboard",
        paragraphs: [
          "A Host may select your venue when booking InviteOly without being directly referred by you. These events will still appear in your Partner Dashboard so you can see and prepare for InviteOly events taking place at your venue.",
          "Direct bookings that were not referred by you do not qualify for Partner Rewards.",
        ],
      },
      {
        number: 5,
        title: "Partner responsibilities vs. Host responsibilities",
        responsibilities: {
          partner: [
            "Provide door staff to scan tickets using the InviteOly Scan App.",
            "Make sure staff review InviteOly's easy-to-follow entry and scanning guidelines.",
            "Follow the Host's event entry requirements.",
            "Provide a professional and welcoming guest-entry experience.",
          ],
          host: [
            "Purchase the InviteOly service and complete event setup.",
            "Provide accurate event, guest, and ticket information.",
            "Set ticket types, RSVP requirements, and event entry rules.",
            "Manage and send guest tickets through the Host Dashboard.",
          ],
        },
      },
    ],
  },
  {
    id: "creating-managing-events",
    title: "Creating & Managing Events",
    steps: [
      {
        number: 1,
        title: "How to invite a Host to use InviteOly",
        paragraphs: [
          "From your Partner Dashboard, select Invite a Host and enter the requested client and event information. The Host will receive an invitation to complete their InviteOly booking. Bookings successfully referred by your Partner account may qualify for Partner Rewards.",
        ],
      },
      {
        number: 2,
        title: "Viewing event details and capacity",
        paragraphs: [
          "Go to Events in your Partner Dashboard to see upcoming InviteOly events taking place at your venue, including both Partner-referred and direct bookings.",
        ],
      },
      {
        number: 3,
        title: "Understanding Standard vs. Premium events",
        paragraphs: [
          "Standard: Uses secure QR-code tickets without individual guest names printed on each ticket.",
          "Premium: Includes personalized guest-name tickets, RSVP management, and additional guest and ticket management features.",
          "The selected package determines which features will be available to the Host for that event.",
        ],
      },
      {
        number: 4,
        title: "Monitoring guest check-ins and live capacity",
        paragraphs: [
          "During the event, your dashboard allows you to monitor guest check-ins in real time, including how many guests have entered and the remaining event capacity. This helps your team stay informed throughout guest arrival.",
        ],
      },
      {
        number: 5,
        title: "Finding the event Scanner Login Code",
        paragraphs: [
          "Each event has its own Scanner Login Code available in the event details. Provide this code to the staff assigned to scan tickets. Staff will use the code to access the correct event through the InviteOly Scan App and begin scanning guest tickets.",
        ],
      },
    ],
  },
  {
    id: "guest-ticket-management",
    title: "Guest & Ticket Management",
    steps: [
      {
        number: 1,
        title: "Understanding QR-code tickets",
        paragraphs: [
          "Each InviteOly ticket has a unique QR code used for event entry. Door staff scan the QR code with the InviteOly Scan App to verify the ticket and check the guest in.",
        ],
      },
      {
        number: 2,
        title: "Standard vs. Premium tickets",
        paragraphs: [
          "Standard Tickets: Tickets are not personalized with individual guest names and may appear as Guest 001, Guest 002, etc. They will may include multiple ticket types.",
          "Premium Tickets: Each ticket is personalized with the guest's name and ticket type and can include seating & RSVP functionality for a more personalized guest experience.",
        ],
      },
      {
        number: 3,
        title: "RSVP status for Premium events",
        paragraphs: [
          "For Premium events, guests must Accept or Decline their invitation by the Host's RSVP deadline. Accepted invitations unlock the guest's ticket, while declined invitations are voided. Partners can view RSVP information to help understand the expected attendance for the event.",
        ],
      },
      {
        number: 4,
        title: "How voided tickets are handled",
        paragraphs: [
          "A voided ticket is no longer valid for entry. If staff attempt to scan a voided ticket, the Scanner App should clearly show that the ticket cannot be accepted. Staff should not admit the guest unless authorized by the Host or designated event contact.",
        ],
      },
    ],
  },
  {
    id: "partner-rewards",
    title: "Partner Rewards",
    steps: [
      {
        number: 1,
        title: "How the 10% Partner Reward works",
        paragraphs: [
          "Partners earn a 10% Partner Reward on qualifying InviteOly bookings they directly refer. The reward is based on the eligible amount paid to InviteOly for the booking.",
        ],
      },
      {
        number: 2,
        title: "Which bookings qualify for rewards",
        paragraphs: [
          "A booking qualifies when the Partner invites/refers the Host through InviteOly and the Host successfully completes and pays for the booking.",
          "Events booked directly by a Host at your venue without your referral do not qualify for Partner Rewards.",
        ],
      },
      {
        number: 3,
        title: "Pending vs. approved rewards",
        paragraphs: [
          "Pending: The reward has been recorded but is not yet eligible for payout.",
          "Approved: The booking has met InviteOly's requirements and the reward has been approved for the next applicable payout.",
        ],
      },
      {
        number: 4,
        title: "When rewards are paid",
        paragraphs: [
          "Partner rewards are reviewed and approved monthly. Once approved, the reward will be paid according to InviteOly's monthly Partner payout schedule.",
        ],
      },
      {
        number: 5,
        title: "Viewing reward and payout history",
        paragraphs: [
          "Go to Partner Rewards in your dashboard to view qualifying events, pending and approved rewards, amounts earned, and previous payouts.",
        ],
      },
      {
        number: 6,
        title: "What happens when an event is cancelled or refunded",
        paragraphs: [
          "Rewards are only earned on successful qualifying bookings. If a booking is cancelled or otherwise becomes ineligible, the associated reward will not count.",
        ],
      },
    ],
  },
  {
    id: "event-day-responsibilities",
    title: "Event-Day Partner Responsibilities",
    numberedList: [
      "Providing & assigning door staff who will be responsible for scanning guest tickets and managing entry.",
      "Providing scanning devices — Each scanning device can be any smartphone with a working camera and the InviteOly Scan App downloaded.",
      "Providing a backup scanning device in case the primary device experiences technical or battery issues.",
      "Providing a portable power bank/charger to keep scanning devices powered throughout guest entry.",
      "Making sure assigned staff have downloaded and are ready to use the InviteOly Scan App.",
      "Providing staff with the event’s Scanner Login Code.",
      "Confirming staff understand the Host’s entry requirements before guest arrival.",
      "Monitoring live guest check-in and event capacity.",
      "Handling guest entry issues professionally and courteously.",
    ],
  },
];

// 2. Event Staff / Scanner Training Modules
export const eventStaffTrainingModules: ITrainingModule[] = [
  {
    id: "before-the-event",
    title: "Before the Event",
    numberedList: [
      "Download the InviteOly Scan App",
      "Enter the Scanner Login Code provided by the Partner",
      "Confirm the correct event is displayed",
      "Review the event's entry requirements",
      "Review age, ID, dress code, ticket notes, or other Host requirements when applicable",
    ],
  },
  {
    id: "how-to-scan-tickets",
    title: "How to Scan Tickets",
    numberedList: [
      "Open the scanner",
      "Ask the guest to display their QR code",
      "Scan the QR code",
      "Wait for the ticket result",
      "Admit the guest when the ticket is valid",
      "Never manually admit a guest when the app shows a ticket problem without following the event's entry procedure",
    ],
  },
  {
    id: "understanding-scan-results",
    title: "Understanding Scan Results",
    introText: "Staff should know what each result means:",
    numberedList: [
      "Checked In — Guest may enter.",
      "Duplicate Ticket — Ticket has already been scanned. Verify before allowing entry.",
      "Void Ticket — Ticket is no longer valid.",
    ],
  },
  {
    id: "inviteoly-scanning-procedure",
    title: "InviteOly Scanning & Entry Procedure",
    bulletPoints: [
      "Be welcoming and professional. Smile, stay attentive, and greet guests as they approach the entrance.",
      "Prepare guests before they reach you. Clearly and politely say: “Please have your tickets ready to be scanned.”",
      "Scan one ticket at a time. Once a ticket scans successfully, allow that guest to enter immediately before scanning the next ticket.",
      "For groups using one phone: Scan the first ticket → allow one guest to enter → scan the next ticket → allow the next guest to enter. Continue until everyone in the group has entered.",
      "Do not scan the entire group before allowing entry. Each successful scan should correspond with one person entering. This helps maintain an accurate live guest count.",
      {
        text: "Acknowledge each guest as they enter. Smile and use a friendly welcome such as:",
        subBullets: [
          '"Welcome in!"',
          '"Enjoy the event!"',
          '"Have a wonderful time!"',
        ],
      },
      "Keep the line moving. Be friendly but efficient so guests experience a smooth, organized entrance.",
      "Stay vocal and visible. When a line forms, continue reminding approaching guests: “Please have your tickets open and ready to be scanned.”",
      "Never make guests feel rushed or unwelcome. The goal is a warm, organized, and professional arrival experience while maintaining accurate entry control.",
    ],
  },
  {
    id: "common-event-day-situations",
    title: "Common Event-Day Situations",
    situations: [
      {
        title: "Guest cannot find their ticket:",
        description:
          "Ask the guest to check the email or message where their ticket was originally sent. Or manually look up their name on the guest list in the scanner app and confirm with a valid form of ID.",
      },
      {
        title: "QR code will not scan:",
        description:
          "Increase screen brightness, clean the camera lens, and try again.",
      },
      {
        title: "Ticket says Already Checked In:",
        description:
          "Do not automatically admit the guest. Follow the event's entry procedure.",
      },
      {
        title: "Guest does not meet entry requirements:",
        description:
          "Politely decline entry and explain that the guest must meet the Host's stated requirements. If the guest asks for help or believes there is an error, direct them to contact the Host or authorized event contact. Staff should not create, change, or make exceptions to the Host's policies.",
      },
      {
        title: "Scanner becomes low battery:",
        description:
          "Always have a backup scanner ready or a power bank to charger your scanner on site.",
      },
      {
        title: "Scanner loses internet connection:",
        description:
          "Use the back up scanner & follow the InviteOly scanner troubleshooting instructions.",
      },
    ],
  },
];

// 3. FAQs for Partners (15 Items exactly from screenshot)
export const partnerFaqs: IFAQItem[] = [
  {
    id: "faq-1",
    question: "What is InviteOly?",
    answer:
      "InviteOly is a guest management and QR ticketing service designed for private, invite-only events such as weddings, receptions, private parties, and corporate events.",
  },
  {
    id: "faq-2",
    question: "Is InviteOly selling tickets to my event?",
    answer:
      "No. InviteOly does not sell admission to your event. You purchase the guest management service and provide tickets to your invited guests.",
  },
  {
    id: "faq-3",
    question: "How do guests receive their tickets?",
    answer:
      "Depending on your package, tickets can be copied and sent directly to guests or automatically sent by email.",
  },
  {
    id: "faq-4",
    question: "What is the difference between Standard and Premium?",
    answer:
      "Standard provides secure QR-code tickets without individual guest names on the tickets. Premium provides personalized tickets with each guest's name, plus RSVP management and additional guest-management features.",
  },
  {
    id: "faq-5",
    question: "Do my guests need to create an InviteOly account?",
    answer:
      "No. Guests can access their ticket through their unique ticket link without creating an account.",
  },
  {
    id: "faq-6",
    question: "How does Premium RSVP work?",
    answer:
      "Guests receive their invitation and select Accept or Decline. Accepting unlocks their ticket, while declining voids the ticket.",
  },
  {
    id: "faq-7",
    question: "Can I see who has accepted or declined?",
    answer:
      "Yes. Premium Hosts can monitor RSVP responses from their Host Dashboard.",
  },
  {
    id: "faq-8",
    question: "Can I make changes to a ticket?",
    answer:
      "Ticket details can be edited while the ticket is still editable. Once a ticket is Locked & Finalized, it can no longer be edited.",
  },
  {
    id: "faq-9",
    question: "Can I include table or seat information?",
    answer:
      "Yes. Premium tickets can include available table/seat information for the guest.",
  },
  {
    id: "faq-10",
    question: "How are guests checked in?",
    answer:
      "Door staff use the InviteOly Scan App to scan each guest's unique QR code and check them in.",
  },
  {
    id: "faq-11",
    question: "Can a ticket be used more than once?",
    answer:
      "The system tracks ticket scans so staff can identify tickets that have already been scanned.",
  },
  {
    id: "faq-12",
    question: "Can I see how many guests have arrived?",
    answer:
      "Yes. InviteOly provides live check-in and capacity information during the event.",
  },
  {
    id: "faq-13",
    question: "Who provides the staff to scan tickets?",
    answer:
      "For Partner venue bookings, the Partner provides staff to scan tickets and follow the Host's entry requirements using the InviteOly Scan App.",
  },
  {
    id: "faq-14",
    question: "What happens if I need to void a guest's ticket?",
    answer:
      "The Host can void an eligible ticket from the dashboard. Once voided, the ticket is no longer valid for entry.",
  },
  {
    id: "faq-15",
    question: "Where can I get help?",
    answer:
      "InviteOly support is available if you need assistance with your booking, tickets, dashboard, or event setup.",
  },
];
