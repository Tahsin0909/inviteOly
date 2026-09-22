import { IPricingTier } from "../payment.interface";

export const INVITE_PRICING_TIERS: IPricingTier[] = [
  {
    id: "intimate",
    tab: {
      id: "intimate",
      label: "Intimate",
      sublabel: "Up To 200 Guests",
    },
    plans: [
      {
        id: "intimate-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "$149",
        guestRange: "Up To 200 Guests",
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
        price: "$349",
        guestRange: "Up To 200 Guests",
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
      sublabel: "Up To 400 Guests",
    },
    plans: [
      {
        id: "signature-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "$249",
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
        id: "signature-premium",
        name: "Premium",
        iconType: "premium",
        isPopular: true,
        ribbonText: "Most Popular",
        description:
          "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
        price: "$449",
        guestRange: "Up To 400 Guests",
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
      sublabel: "Up To 600 Guests",
    },
    plans: [
      {
        id: "grand-standard",
        name: "Standard",
        iconType: "standard",
        description:
          "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
        price: "$349",
        guestRange: "Up To 600 Guests",
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
        price: "$549",
        guestRange: "Up To 600 Guests",
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
      sublabel: "600+ Guests",
    },
    plans: [
      {
        id: "custom-quote",
        name: "Custom Event",
        iconType: "costume",
        isPopular: true,
        ribbonText: "Bespoke",
        description:
          "",
        price: "",
        guestRange: "",
        features: [
          "Planning an event with more than 600 guests or needs that do not fit our standard packages? Contact us to discuss your event, receive a custom quote, and learn how InviteOly may be able to assist with your guest-management and entry needs.",
        ],
        buttonText: "Contact Us for a Custom Quote",
        buttonVariant: "solid",
      },
    ],
  },
];

export const PRICING_TIERS: IPricingTier[] = INVITE_PRICING_TIERS;
