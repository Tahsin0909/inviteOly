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
    id: "custom",
    tab: {
      id: "custom",
      label: "custom quote",
      sublabel: "Up To 600+",
    },
    plans: [
      {
        id: "custom-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "Custom",
        guestRange: "600+ Guests",
        features: [
          "Secure QR-Code Tickets For A Premium Guest Entry Experience",
          "Easy-To-Use Host Dashboard To Manage And Send Tickets From",
          "Downloadable PDF Guest List",
          "Assign Unnamed Tickets To Guests Directly From Your Dashboard For Easy, Accurate Tracking.",
          "Easy-To-Use Scanning App For Fast, Secure Ticket Verification At Entry.",
          "Dedicated Customer Support",
        ],
        buttonText: "Request Custom Quote",
        buttonVariant: "outline",
        isPopular: false,
      },
      {
        id: "custom-premium",
        name: "Premium",
        iconType: "premium",
        isPopular: true,
        ribbonText: "Most Popular",
        description:
          "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
        price: "Custom",
        guestRange: "600+ Guests",
        features: [
          "Everything Included In The Standard Package",
          "Each Ticket Is Personalized With The Individual Guest's Name.",
          "RSVP-To-Unlock Ticketing: Guests Simply Confirm \u201CYes\u201D To Reveal Their Personalized Ticket",
          "Tickets Remain Hidden Until Attendance Is Confirmed",
          "Declined Invitations Are Automatically Voided",
          "Elevated, Premium Guest Experience From Invitation To Check-In",
          "Automatically Email Tickets To Guests",
        ],
        buttonText: "Request Custom Quote",
        buttonVariant: "solid",
      },
    ],
  },
];

export const PRICING_TIERS: IPricingTier[] = [
  ...INVITE_PRICING_TIERS,
  {
    id: "small",
    tab: {
      id: "small",
      label: "Small",
      sublabel: "Up To 400",
    },
    plans: INVITE_PRICING_TIERS[1].plans,
  },
  {
    id: "medium",
    tab: {
      id: "medium",
      label: "Medium",
      sublabel: "401-800",
    },
    plans: INVITE_PRICING_TIERS[2].plans,
  },
  {
    id: "large",
    tab: {
      id: "large",
      label: "Large",
      sublabel: "801+",
    },
    plans: INVITE_PRICING_TIERS[3].plans,
  },
];
