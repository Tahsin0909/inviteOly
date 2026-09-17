import React from "react";
import Link from "next/link";
import { Lock, ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - InviteOnly",
  description: "Learn how InviteOnly collects, protects, and handles personal data and guest lists.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#B89047] transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" /> Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-neutral-800 pb-8 mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            PRIVACY & DATA PROTECTION
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-2 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Last Updated: January 1, 2026 · Global Privacy Standard Compliance
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-neutral-300 text-sm sm:text-base leading-relaxed space-y-8">
          <section className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2.5">
              <Lock className="size-5 text-[#B89047]" />
              1. Our Privacy Commitment
            </h2>
            <p>
              At InviteOnly, privacy is built into the architecture of our platform. We understand that wedding guest lists, VIP gala attendees, and private party details are deeply sensitive. We never sell, monetize, or publicly disclose your guest contact details or attendance records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong className="text-white">Host & Partner Information:</strong> Names, business emails, phone numbers, venue addresses, and billing credentials necessary to provision your event subscription.
              </li>
              <li>
                <strong className="text-white">Guest Information:</strong> Names, email addresses, dietary preferences, or table assignments provided by Hosts solely to issue personalized QR tickets and track RSVPs.
              </li>
              <li>
                <strong className="text-white">Check-in Logs:</strong> Timestamps and scanning terminal IDs recorded when a ticket is validated at the event venue.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white">
              3. How We Use Information
            </h2>
            <p>
              We use collected information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
              <li>Generate and deliver secure, verifiable QR tickets to invited guests.</li>
              <li>Provide Hosts with real-time RSVP counts and door arrival metrics.</li>
              <li>Authenticate authorized scanning personnel using the InviteOly app.</li>
              <li>Process package payments and generate official invoices.</li>
              <li>Provide customer support via WhatsApp or email.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white">
              4. Data Security & Cryptographic Tickets
            </h2>
            <p>
              All communication between your browser, our API servers, and the mobile scanner app is encrypted in transit using TLS 1.3. Ticket tokens are signed with cryptographic keys to prevent forgery or tampering.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white">
              5. Data Retention & Right to Erasure
            </h2>
            <p>
              Hosts may export or permanently delete their guest lists from their dashboard at any time. Following the conclusion of your event, you can request full automated archival or permanent deletion of all associated guest RSVP records.
            </p>
          </section>

          <section className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-2">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2.5">
              <ShieldAlert className="size-5 text-[#B89047]" />
              6. Privacy Officer Contact
            </h2>
            <p className="text-sm text-neutral-400">
              If you have any questions or wish to exercise your data privacy rights, please contact our Data Protection Officer at{" "}
              <a href="mailto:privacy@inviteonly.com" className="text-[#B89047] hover:underline font-medium">
                privacy@inviteonly.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

