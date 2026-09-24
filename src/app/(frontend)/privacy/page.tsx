import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Mail, Globe, MapPin, Building2, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - InviteOly",
  description: "Learn how InviteOly collects, uses, and safeguards personal data and guest lists.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
      <div className="container mx-auto ">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#B89047] transition-colors mb-8 group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-neutral-800 pb-8 mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            PRIVACY &amp; DATA PROTECTION
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-2 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Effective Date: October 10, 2026 · Last Updated: October 10, 2026
          </p>
        </div>

        {/* Introduction Banner */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center shrink-0">
              <Shield className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-space-grotesk text-white">
                Our Privacy Commitment
              </h2>
              <p className="text-xs text-neutral-400">
                Transparent data practices for Hosts, Guests, and Partners.
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            InviteOly respects the privacy of Hosts, Guests, Partners, and other users of our Services. This Privacy Policy describes the types of information InviteOly may collect, why we collect it, how we use it, and the choices available to users.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-10">
          {/* 1. Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">1.</span> Information We Collect
            </h2>
            <p>
              Depending on how you interact with InviteOly, we may collect account information such as name, email address, phone number, account credentials, and business or Partner information; event information; Guest information supplied for event management; transaction information; and technical information such as IP address, browser/device type, operating system, app activity, login information, pages or features accessed, and diagnostic/security information.
            </p>
            <p>
              Guest information may include Guest name, email address, ticket assignment, ticket type, table or seat information, RSVP status, check-in status, and other information reasonably necessary to manage an event.
            </p>
          </section>

          {/* 2. How We Receive Guest Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">2.</span> How We Receive Guest Information
            </h2>
            <p>
              Guest information may be provided directly by Guests or by Hosts and Partners who use InviteOly to manage their events. Hosts and Partners are responsible for ensuring they are authorized to provide Guest information to InviteOly.
            </p>
          </section>

          {/* 3. How We Use Information */}
          <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">3.</span> How We Use Information
            </h2>
            <p className="text-neutral-400 text-sm">
              We use personal and event information to operate and enhance our platform:
            </p>
            <ul className="space-y-2.5 pt-1">
              {[
                "Create and manage accounts and events.",
                "Generate, manage, and deliver tickets.",
                "Manage RSVPs and QR-code validation.",
                "Facilitate event check-in.",
                "Display necessary Guest information to authorized Hosts and entry personnel.",
                "Process purchases and provide customer support.",
                "Prevent fraud, secure systems, and troubleshoot technical problems.",
                "Improve Services, comply with legal obligations, and communicate important service changes.",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-neutral-300">
                  <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Sharing of Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">4.</span> Sharing of Information
            </h2>
            <p>
              InviteOly does not sell Guest lists as part of its ordinary Services. We may disclose information to service providers that help operate InviteOly, such as cloud hosting, payment processing, email delivery, SMS delivery, analytics, security, technical infrastructure, and customer support providers.
            </p>
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-xs text-neutral-400 space-y-1">
              <p className="font-semibold text-neutral-300">Third-Party Service Categories:</p>
              <p>• Payment Processing: Secure PCI-compliant processors</p>
              <p>• Cloud Infrastructure &amp; Hosting: Enterprise cloud hosting providers</p>
              <p>• Communications: Transactional email and SMS delivery gateways</p>
              <p>• Analytics &amp; Security: System telemetry and diagnostic monitoring tools</p>
            </div>
          </section>

          {/* 5. Guest Information and Hosts */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">5.</span> Guest Information and Hosts
            </h2>
            <p>
              Hosts may view information concerning Guests associated with their events. Authorized event personnel may be able to view information necessary for ticket validation or identity verification. InviteOly is not responsible for independent use of Guest information by a Host or Venue outside the InviteOly platform.
            </p>
          </section>

          {/* 6. Payment Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">6.</span> Payment Information
            </h2>
            <p>
              Payments may be processed through third-party payment processors. InviteOly should not store complete credit or debit card numbers when payment information is handled directly by the applicable processor.
            </p>
          </section>

          {/* 7. Cookies and Similar Technologies */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">7.</span> Cookies and Similar Technologies
            </h2>
            <p>
              InviteOly may use cookies and similar technologies for authentication, security, preferences, performance, analytics, and other disclosed purposes. More information is provided in the Cookie Policy.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">8.</span> Data Retention
            </h2>
            <p>
              InviteOly retains information for as long as reasonably necessary to provide Services, maintain business records, prevent fraud, resolve disputes, and satisfy legal obligations. Specific retention schedules apply to Host accounts, guest lists, ticket/scan verification records, transaction histories, and system logs in accordance with operational requirements.
            </p>
          </section>

          {/* 9. Security */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">9.</span> Security
            </h2>
            <p>
              InviteOly uses reasonable administrative, technical, and organizational safeguards designed to protect information. No internet-based service or electronic storage system can guarantee absolute security.
            </p>
          </section>

          {/* 10. Children's Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">10.</span> Children&apos;s Information
            </h2>
            <p>
              InviteOly is an event-management service and may issue tickets for events attended by children. InviteOly is not intended for children to independently create commercial Host or Partner accounts. Hosts should avoid providing unnecessary personal information concerning minors.
            </p>
          </section>

          {/* 11. Privacy Rights */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">11.</span> Privacy Rights
            </h2>
            <p>
              Depending on where you live and which privacy laws apply, you may have rights concerning your personal information, including possible rights to request access, correction, or deletion. Privacy requests may be submitted to{" "}
              <a href="mailto:privacy@inviteoly.com" className="text-[#B89047] hover:underline font-medium">
                privacy@inviteoly.com
              </a>.
            </p>
          </section>

          {/* 12. California Residents */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">12.</span> California Residents
            </h2>
            <p>
              California residents may have additional privacy rights under applicable California privacy laws (such as the California Consumer Privacy Act / CCPA). The precise rights available depend on the laws applicable to InviteOly and the nature of the processing.
            </p>
          </section>

          {/* 13. Browser Privacy Signals */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">13.</span> Browser Privacy Signals
            </h2>
            <p>
              InviteOly monitors and responds to recognized automated browser privacy signals, such as Global Privacy Control (GPC), where required by applicable laws. We do not sell personal data or engage in targeted third-party behavioral advertising tracking.
            </p>
          </section>

          {/* 14. Third-Party Links */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">14.</span> Third-Party Links
            </h2>
            <p>
              InviteOly may contain links to third-party websites or services. Their privacy practices are governed by their own policies.
            </p>
          </section>

          {/* 15. Changes */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">15.</span> Changes to This Privacy Policy
            </h2>
            <p>
              InviteOly may update this Privacy Policy as its Services, technology, or legal obligations change. The current version will display its effective or last-updated date.
            </p>
          </section>

          {/* 16. Contact */}
          <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">16.</span> Contact Information
            </h2>
            <p className="text-sm text-neutral-400">
              For any questions regarding this Privacy Policy or to exercise your privacy rights, please contact our team:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <Building2 className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Legal Business Name</span>
                  <span className="text-sm font-semibold text-white">InviteOly Inc.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <Mail className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Privacy Email</span>
                  <a href="mailto:privacy@inviteoly.com" className="text-sm font-semibold text-white hover:text-[#B89047] transition-colors">
                    privacy@inviteoly.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <MapPin className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Business Address</span>
                  <span className="text-sm font-semibold text-white">San Francisco, California</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <Globe className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Official Website</span>
                  <Link href="https://www.inviteoly.com" className="text-sm font-semibold text-white hover:text-[#B89047] transition-colors">
                    www.inviteoly.com
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
