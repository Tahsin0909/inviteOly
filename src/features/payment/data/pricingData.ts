import { IPricingTier } from "../payment.interface";

export const PRICING_TIERS: IPricingTier[] = [
  {
    id: "small",
    tab: {
      id: "small",
      label: "Small",
      sublabel: "Up To 400",
    },
    plans: [
      {
        id: "small-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "$299",
        guestRange: "Up To 400 Guests",
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
        id: "small-premium",
        name: "Premium",
        iconType: "premium",
        isPopular: true,
        ribbonText: "Most Popular",
        description:
          "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
        price: "$449",
        guestRange: "Up To 400 Guests",
        features: [
          "Up To 400 Guests",
          "Everything Included In The Standard Package",
          "Each Ticket Is Personalized With The Individual Guest's Name.",
          "RSVP-To-Unlock Ticketing: Guests Simply Confirm \u201CYes\u201D To Reveal Their Personalized Ticket",
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
    id: "medium",
    tab: {
      id: "medium",
      label: "Medium",
      sublabel: "401-800",
    },
    plans: [
      {
        id: "medium-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "$449",
        guestRange: "401-800 Guests",
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
        id: "medium-premium",
        name: "Premium",
        iconType: "premium",
        isPopular: true,
        ribbonText: "Most Popular",
        description:
          "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
        price: "$599",
        guestRange: "401-800 Guests",
        features: [
          "401-800 Guests",
          "Everything Included In The Standard Package",
          "Each Ticket Is Personalized With The Individual Guest's Name.",
          "RSVP-To-Unlock Ticketing: Guests Simply Confirm \u201CYes\u201D To Reveal Their Personalized Ticket",
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
    id: "large",
    tab: {
      id: "large",
      label: "Large",
      sublabel: "801+",
    },
    plans: [
      {
        id: "large-costume",
        name: "Costume",
        iconType: "costume",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: null,
        guestRange: "801+ Guests",
        features: [
          "801+ Guests",
          "Everything Included In The Standard Package",
          "Each Ticket Is Personalized With The Individual Guest's Name.",
          "RSVP-To-Unlock Ticketing: Guests Simply Confirm \u201CYes\u201D To Reveal Their Personalized Ticket",
          "Tickets Remain Hidden Until Attendance Is Confirmed",
          "Declined Invitations Are Automatically Voided",
          "Elevated, Premium Guest Experience From Invitation To Check-In",
          "Automatically Email Tickets To Guests",
        ],
        buttonText: "Choose Costume",
        buttonVariant: "outline",
        isPopular: false,
      },
    ],
  },
];

