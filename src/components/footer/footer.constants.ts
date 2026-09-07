import { IFooter, ISocial } from "./footer.interface";

export const supportSection: IFooter = {
  title: "Support",
  links: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export const productSection: IFooter = {
  title: "Product",
  links: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/faq" },
  ],
};

export const partnersSection: IFooter = {
  title: "For Partners",
  links: [
    { label: "Become a Partner", href: "/partners" },
    { label: "Partner Benefits", href: "/partners/benefits" },
    { label: "Partner Login", href: "/login" },
  ],
};

export const hostsSection: IFooter = {
  title: "For Hosts",
  links: [
    { label: "Create an Event", href: "/create-event" },
    { label: "Guest Management", href: "/guest-management" },
    { label: "Ticketing", href: "/ticketing" },
  ],
};

export const footerSections: IFooter[] = [
  supportSection,
  productSection,
  partnersSection,
  hostsSection,
];

export const bottomLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

// Preserved for backward compatibility
export const policy: IFooter = {
  title: "Policy",
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const social: ISocial[] = [
  {
    name: "Facebook",
    image: "/facebook.svg",
    link: "/",
  },
  {
    name: "Instagram",
    image: "/instagram.svg",
    link: "/",
  },
  {
    name: "Twitter",
    image: "/twitter.svg",
    link: "/",
  },
  {
    name: "LinkedIn",
    image: "/linkedin.svg",
    link: "/",
  },
];
