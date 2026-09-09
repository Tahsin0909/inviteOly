import { IMarketing, IMarketingStats } from "../marketing.interface";

export const initialMarketingStats: IMarketingStats = {
  totalMaterials: 86,
  partnerMaterials: 30,
  hostMaterials: 150,
};

export const initialMarketingMaterials: IMarketing[] = [
  {
    id: "mkt-1",
    title: "Partner Welcome Brochure",
    fileName: "partner-welcome-brochure.pdf",
    fileSize: "2.4 MB",
    fileType: "application/pdf",
    type: "Brochure",
    audience: "Both",
    status: "Published",
    updatedDate: "Oct 12, 2023",
    description:
      "Comprehensive partner overview guide explaining the benefits of integrating InviteOly for weddings and corporate galas.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mkt-2",
    title: "Partner Welcome Brochure",
    fileName: "partner-welcome-brochure.pdf",
    fileSize: "2.4 MB",
    fileType: "application/pdf",
    type: "How It Works",
    audience: "Host",
    status: "Draft",
    updatedDate: "Oct 12, 2023",
    description:
      "Step-by-step onboarding walkthrough for hosts explaining ticketing tiers, payment processing, and scanner codes.",
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mkt-3",
    title: "Partner Welcome Brochure",
    fileName: "partner-welcome-brochure.pdf",
    fileSize: "2.4 MB",
    fileType: "application/pdf",
    type: "Premium Info",
    audience: "Host",
    status: "Draft",
    updatedDate: "Oct 18, 2023",
    description:
      "Brochure presenting the key features of the Premium package including custom branding, seating charts, and RSVP analytics.",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mkt-4",
    title: "Partner Welcome Brochure",
    fileName: "partner-welcome-brochure.pdf",
    fileSize: "2.4 MB",
    fileType: "application/pdf",
    type: "How It Works",
    audience: "Both",
    status: "Published",
    updatedDate: "Oct 28, 2023",
    description:
      "Infographic and explainer sheet for venue staff and organizers on day-of door scan procedures and backup handling.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mkt-5",
    title: "Partner Welcome Brochure",
    fileName: "partner-welcome-brochure.pdf",
    fileSize: "2.4 MB",
    fileType: "application/pdf",
    type: "Social Media",
    audience: "Partner",
    status: "Published",
    updatedDate: "Oct 12, 2023",
    description:
      "Ready-to-use social media banners, captions, and story templates for partner venues promoting InviteOly services.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mkt-6",
    title: "Partner Welcome Brochure",
    fileName: "partner-welcome-brochure.pdf",
    fileSize: "2.4 MB",
    fileType: "application/pdf",
    type: "Premium Info",
    audience: "Partner",
    status: "Published",
    updatedDate: "Oct 12, 2023",
    description:
      "Partner sales deck outlining the 10% referral revenue share model and customer conversion statistics.",
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mkt-7",
    title: "Partner Welcome Brochure",
    fileName: "partner-welcome-brochure.pdf",
    fileSize: "2.4 MB",
    fileType: "application/pdf",
    type: "Social Media",
    audience: "Host",
    status: "Published",
    updatedDate: "Oct 12, 2023",
    description:
      "Promotional flyer kit designed for hosts to send to attendees via WhatsApp, email, or Instagram invitations.",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
  },
];

// Partner dashboard assets matching Image 3 (media_1788943954115.png)
export const partnerMarketingAssets: IMarketing[] = [
  {
    id: "p-asset-1",
    title: "Marketing Assets",
    fileName: "partner-brand-kit.zip",
    fileSize: "18.4 MB",
    type: "Social Media",
    audience: "Partner",
    status: "Published",
    updatedDate: "Nov 02, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed ullamcorper etiam augue sed urna donec. Ornare consectetur eget neque ac posuere fringilla eu eu morbi.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "p-asset-2",
    title: "Marketing Assets",
    fileName: "venue-promotional-brochures.pdf",
    fileSize: "6.2 MB",
    type: "Brochure",
    audience: "Partner",
    status: "Published",
    updatedDate: "Nov 05, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed ullamcorper etiam augue sed urna donec. Ornare consectetur eget neque ac posuere fringilla eu eu morbi.",
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "p-asset-3",
    title: "Marketing Assets",
    fileName: "guest-ticketing-explainer.pdf",
    fileSize: "4.8 MB",
    type: "How It Works",
    audience: "Both",
    status: "Published",
    updatedDate: "Nov 10, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed ullamcorper etiam augue sed urna donec. Ornare consectetur eget neque ac posuere fringilla eu eu morbi.",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
  },
];

