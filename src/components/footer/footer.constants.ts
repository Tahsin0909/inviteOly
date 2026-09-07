import { IFooter, ISocial } from "./footer.interface";

export const Join: IFooter = {
  title: "Join",
  links: [
    { label: "Upgrade", href: "/upgrade" },
    { label: "Subscribe", href: "/subscribe" },
    { label: "Sponsor Us", href: "/sponsor" },
    { label: "Contact us", href: "/contact" },
  ],
};

export const Home: IFooter = {
  title: "Home",
  links: [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms & use", href: "/terms" },
  ],
};

export const Explore: IFooter = {
  title: "Explore",
  links: [
    { label: "Newsletters", href: "/newsletters" },
    { label: "Premium", href: "/premium" },
  ],
};

export const policy: IFooter = {
  title: "Policy",
  links: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions ", href: "/terms-conditions " },
  ],
};

export const footerSections = [Join, Home, Explore];

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
    name: "Tik Tok",
    image: "/tiktok.svg",
    link: "/",
  },
  {
    name: "Youtube",
    image: "/youtube.svg",
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
  {
    name: "Threads",
    image: "/threads.svg",
    link: "/",
  },
];
