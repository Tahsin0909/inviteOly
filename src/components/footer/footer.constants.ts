import { IFooter, ISocial } from "./footer.interface";

export const supportSection: IFooter = {
  title: "Support",
  links: [
    // { label: "Help Center", href: "/help" },
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
    { label: "Partner Agreement", href: "/partners-agreement" },
    { label: "Partner Login", href: "/login" },
  ],
};

export const hostsSection: IFooter = {
  title: "For Hosts",
  links: [
    { label: "Create an Event", href: "/create-event" },
    { label: "Host Agreement", href: "/host-agreement" },
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

export const getRoleBasedFooterSections = (
  role: string | null | undefined,
  isAuthenticated: boolean
): IFooter[] => {
  if (!isAuthenticated || !role) {
    return [supportSection, productSection, partnersSection, hostsSection];
  }

  const normalizedRole = role.toUpperCase();

  if (normalizedRole === "HOST") {
    const dynamicHostSection: IFooter = {
      title: "For Hosts",
      links: [
        { label: "Create an Event", href: "/host/create-event" },
        { label: "Host Agreement", href: "/host-agreement" },
        { label: "Payment Status", href: "/host/payment-pending" },
        { label: "Event Packages", href: "/#pricing" },
      ],
    };

    const dynamicPartnerSection: IFooter = {
      title: "For Partners",
      links: [
        { label: "Partner Agreement", href: "/partners-agreement" },
        { label: "Partner Benefits", href: "/partners/benefits" },
      ],
    };

    return [supportSection, productSection, dynamicPartnerSection, dynamicHostSection];
  }

  if (normalizedRole === "PARTNER") {
    const dynamicPartnerSection: IFooter = {
      title: "For Partners",
      links: [
        { label: "Partner Dashboard", href: "/partner" },
        { label: "My Venues", href: "/partner/venues" },
        { label: "Invite Hosts", href: "/partner/invite-host" },
        { label: "Partner Rewards", href: "/partner/rewards" },
      ],
    };

    const dynamicHostSection: IFooter = {
      title: "Event Tools",
      links: [
        { label: "Referred Events", href: "/partner/events" },
        { label: "Marketing Kit", href: "/partner/marketing" },
        { label: "Partner Training", href: "/partner/training" },
      ],
    };

    return [supportSection, productSection, dynamicPartnerSection, dynamicHostSection];
  }

  if (normalizedRole === "ADMIN") {
    const dynamicAdminEvents: IFooter = {
      title: "Event Operations",
      links: [
        { label: "All Events", href: "/admin/events" },
        { label: "Event Orders", href: "/admin/event-orders" },
        { label: "User Management", href: "/admin/users" },
      ],
    };

    const dynamicAdminPartners: IFooter = {
      title: "Partner & Finance",
      links: [
        { label: "Partners Management", href: "/admin/partners" },
        { label: "Payments", href: "/admin/payments" },
        { label: "Promo Codes", href: "/admin/promos" },
      ],
    };

    return [supportSection, productSection, dynamicAdminPartners, dynamicAdminEvents];
  }

  return [supportSection, productSection, partnersSection, hostsSection];
};

export const bottomLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Host Agreement", href: "/host-agreement" },
  { label: "Partner Agreement", href: "/partners-agreement" },
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
