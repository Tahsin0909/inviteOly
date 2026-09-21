import React from "react";
import type { Metadata } from "next";
import { ALL_FAQS } from "@/lib/data/faq.data";
import FaqClient from "./components/FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | InviteOnly",
  description:
    "Find answers to common questions about InviteOnly's guest management, secure QR ticketing, RSVP workflow, and door scanning.",
  keywords: [
    "InviteOnly FAQ",
    "guest management questions",
    "QR ticketing FAQ",
    "RSVP deadline help",
    "event check-in scanning",
    "private event ticketing",
  ],
};

export default function FaqPage() {
  // Schema.org FAQPage structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
      {/* JSON-LD Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <FaqClient />
      </div>
    </main>
  );
}
