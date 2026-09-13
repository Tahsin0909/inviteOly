import { IPricingTier } from "../payment.interface";

export const INVITE_PRICING_TIERS: IPricingTier[] = [
  {
    id: "intimate",
    tab: {
      id: "intimate",
      label: "Intimate",
      sublabel: "Up To 200",
    },
    plans: [
      {
        id: "intimate-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "$149",
        guestRange: "Up To 200",
        features: [
          "Secure QR-Code Tickets For A Premium Guest Entry Experience",
          "Easy-To-Use Host Dashboard To Manage And Send Tickets From",
          "Downloadable PDF Guest List",
          "Assign Unnamed Tickets To Guests Directly From Your Dashboard For Easy, Accurate Tracking.",
          "Easy-To-Use Scanning App For Fast, Secure Ticket Verification At Entry.",
          "Dedicated Customer Support",
        ],
        buttonText: "Choose Standard",
        buttonVariant: "outline",
        isPopular: false,
      },
      {
        id: "intimate-premium",
        name: "Premium",
        iconType: "premium",
        isPopular: true,
        ribbonText: "Most Popular",
        description:
          "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
        price: "$399",
        guestRange: "Up To 200",
        features: [
          "Everything Included In The Standard Package",
          "Each Ticket Is Personalized With The Individual Guest's Name.",
          "RSVP-To-Unlock Ticketing: Guests Simply Confirm “Yes” To Reveal Their Personalized Ticket",
          "Tickets Remain Hidden Until Attendance Is Confirmed",
          "Declined Invitations Are Automatically Voided",
          "Elevated, Premium Guest Experience From Invitation To Check-In",
          "Automatically Email Tickets To Guests",
        ],
        buttonText: "Choose Premium",
        buttonVariant: "solid",
      },
    ],
  },
  {
    id: "signature",
    tab: {
      id: "signature",
      label: "Signature",
      sublabel: "Up To 400",
    },
    plans: [
      {
        id: "signature-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "$299",
        guestRange: "Up To 400",
        features: [
          "Secure QR-Code Tickets For A Premium Guest Entry Experience",
          "Easy-To-Use Host Dashboard To Manage And Send Tickets From",
          "Downloadable PDF Guest List",
          "Assign Unnamed Tickets To Guests Directly From Your Dashboard For Easy, Accurate Tracking.",
          "Easy-To-Use Scanning App For Fast, Secure Ticket Verification At Entry.",
          "Dedicated Customer Support",
        ],
        buttonText: "Choose Standard",
        buttonVariant: "outline",
        isPopular: false,
      },
      {
        id: "signature-premium",
        name: "Premium",
        iconType: "premium",
        isPopular: true,
        ribbonText: "Most Popular",
        description:
          "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
        price: "$449",
        guestRange: "Up To 400",
        features: [
          "Everything Included In The Standard Package",
          "Each Ticket Is Personalized With The Individual Guest's Name.",
          "RSVP-To-Unlock Ticketing: Guests Simply Confirm “Yes” To Reveal Their Personalized Ticket",
          "Tickets Remain Hidden Until Attendance Is Confirmed",
          "Declined Invitations Are Automatically Voided",
          "Elevated, Premium Guest Experience From Invitation To Check-In",
          "Automatically Email Tickets To Guests",
        ],
        buttonText: "Choose Premium",
        buttonVariant: "solid",
      },
    ],
  },
  {
    id: "grand",
    tab: {
      id: "grand",
      label: "Grand",
      sublabel: "Up To 600",
    },
    plans: [
      {
        id: "grand-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "$449",
        guestRange: "Up To 600",
        features: [
          "Secure QR-Code Tickets For A Premium Guest Entry Experience",
          "Easy-To-Use Host Dashboard To Manage And Send Tickets From",
          "Downloadable PDF Guest List",
          "Assign Unnamed Tickets To Guests Directly From Your Dashboard For Easy, Accurate Tracking.",
          "Easy-To-Use Scanning App For Fast, Secure Ticket Verification At Entry.",
          "Dedicated Customer Support",
        ],
        buttonText: "Choose Standard",
        buttonVariant: "outline",
        isPopular: false,
      },
      {
        id: "grand-premium",
        name: "Premium",
        iconType: "premium",
        isPopular: true,
        ribbonText: "Most Popular",
        description:
          "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
        price: "$599",
        guestRange: "Up To 600",
        features: [
          "Everything Included In The Standard Package",
          "Each Ticket Is Personalized With The Individual Guest's Name.",
          "RSVP-To-Unlock Ticketing: Guests Simply Confirm “Yes” To Reveal Their Personalized Ticket",
          "Tickets Remain Hidden Until Attendance Is Confirmed",
          "Declined Invitations Are Automatically Voided",
          "Elevated, Premium Guest Experience From Invitation To Check-In",
          "Automatically Email Tickets To Guests",
        ],
        buttonText: "Choose Premium",
        buttonVariant: "solid",
      },
    ],
  },
  {
    id: "custom",
    tab: {
      id: "custom",
      label: "Custom",
      sublabel: "600+",
    },
    plans: [
      {
        id: "custom-quote",
        name: "Custom",
        iconType: "costume",
        isPopular: true,
        ribbonText: "Bespoke",
        description:
          "Tailored High-Capacity Event Solutions With Dedicated Support, Custom Integrations & VIP Concierge.",
        price: "Custom",
        guestRange: "600+ Guests",
        features: [
          "Everything Included In Standard & Premium",
          "Unlimited Or High-Capacity Guest Allotment (600+ Attendees)",
          "Dedicated Account Manager & VIP Event Concierge",
          "Custom Digital Ticket Pass & Invitation Card Branding",
          "Multi-Gate Scanning App Logistics & Onsite Support",
          "Bespoke RSVP Flow & Custom Data Collection Fields",
          "Direct Invoice Billing & Wire Transfer Payment Terms",
        ],
        buttonText: "Request Custom Quote",
        buttonVariant: "solid",
      },
    ],
  },
];

export const PRICING_TIERS: IPricingTier[] = INVITE_PRICING_TIERS;
