import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Mail, Globe, MapPin, Building2, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service - InviteOly",
  description: "Terms and conditions governing the use of the InviteOly event management platform.",
};

export default function TermsPage() {
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
            LEGAL AGREEMENT
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-2 tracking-tight">
            Terms of Service
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
                Agreement to Terms
              </h2>
              <p className="text-xs text-neutral-400">
                Please read these terms carefully before accessing or using InviteOly.
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the InviteOly website, Host Dashboard, Partner Dashboard, mobile applications, InviteOly Scan App, QR-code ticketing system, RSVP features, and related services (collectively, the &quot;Services&quot;).
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            By creating an account, purchasing Services, creating or managing an event, accessing a ticket, or otherwise using InviteOly, you agree to these Terms and any additional InviteOly policies applicable to your use of the Services.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-10">
          {/* 1. About InviteOly */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">1.</span> About InviteOly
            </h2>
            <p>
              InviteOly provides technology for guest management, secure QR-code ticketing, RSVP management, and event check-in for private, invite-only events.
            </p>
            <p>
              InviteOly is a technology provider and is not the organizer, host, venue, security provider, or operator of events using the platform unless InviteOly expressly agrees otherwise in writing. Hosts and Partners remain responsible for operating their events and establishing and enforcing their event rules.
            </p>
          </section>

          {/* 2. Private Events */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">2.</span> Private Events
            </h2>
            <p>
              InviteOly is designed for private, invite-only events. Events are not automatically listed or offered for public ticket sales through InviteOly. Hosts control their guest lists and determine who receives tickets. Guests generally do not purchase their InviteOly tickets; the Host or applicable business customer purchases the InviteOly service.
            </p>
          </section>

          {/* 3. Accounts */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">3.</span> Accounts
            </h2>
            <p>
              Users must provide accurate information and protect their login credentials. If you use InviteOly on behalf of a company, venue, organization, or other entity, you represent that you have authority to act on its behalf.
            </p>
          </section>

          {/* 4. Event Creation and Payment */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">4.</span> Event Creation and Payment
            </h2>
            <p>
              Hosts are responsible for providing accurate event information. Where payment is required, an event order becomes active after successful payment confirmation. InviteOly may then generate the tickets included in the purchased package. Hosts should review event and ticket information before distributing tickets.
            </p>
          </section>

          {/* 5. QR-Code Tickets */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">5.</span> QR-Code Tickets
            </h2>
            <p>
              Each InviteOly ticket contains a unique QR code associated with an event and ticket record. Tickets may not be fraudulently duplicated, altered, manipulated, reproduced, or used to circumvent InviteOly&apos;s security systems. A ticket may become invalid if it is voided, expired, previously scanned, fraudulently duplicated, or otherwise invalidated under the event&apos;s settings.
            </p>
          </section>

          {/* 6. Admission */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">6.</span> Admission
            </h2>
            <p>
              An InviteOly ticket does not independently guarantee admission. Hosts, Partners, and their authorized entry personnel retain responsibility for admission decisions. Guests may be required to comply with age restrictions, identification requirements, dress codes, ticket-name verification, re-entry policies, and other requirements established by the Host or Partner.
            </p>
          </section>

          {/* 7. RSVP */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">7.</span> RSVP
            </h2>
            <p>
              Certain packages may include RSVP functionality. Hosts may establish an RSVP deadline. Where required, Guests must accept attendance before their ticket is activated or fully revealed. A ticket may automatically become unavailable, expire, or be voided if the Guest does not respond before the applicable deadline.
            </p>
          </section>

          {/* 8. Ticket Delivery */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">8.</span> Ticket Delivery
            </h2>
            <p>
              Depending on the selected package, Hosts may distribute tickets manually or use available automatic delivery features. InviteOly does not guarantee successful delivery of every email, SMS message, notification, or ticket link because delivery may be affected by incorrect information, spam filters, telecommunications providers, network failures, or circumstances outside InviteOly&apos;s reasonable control.
            </p>
          </section>

          {/* 9. Scanning */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">9.</span> Scanning
            </h2>
            <p>
              InviteOly provides the InviteOly Scan App or related technology for ticket validation. Hosts or Partners are responsible for providing appropriate door personnel and compatible devices unless InviteOly expressly agrees otherwise. Hosts, Partners, and authorized event personnel using InviteOly&apos;s ticket-scanning and entry-management services must follow applicable InviteOly Guest Entry Policies &amp; Procedures.
            </p>
          </section>

          {/* 10. Packages and Features */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">10.</span> Packages and Features
            </h2>
            <p>
              InviteOly may offer different packages, event sizes, features, and prices. The package and price displayed and purchased at checkout apply to that order. InviteOly may modify future packages, prices, or features without changing completed purchases unless otherwise agreed.
            </p>
          </section>

          {/* 11. Payments and Refunds */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">11.</span> Payments and Refunds
            </h2>
            <p>
              Payments are subject to InviteOly&apos;s applicable payment terms and payment-processor requirements. Refunds, cancellations, postponements, and event date changes are governed by the InviteOly Refund &amp; Cancellation Policy.
            </p>
          </section>

          {/* 12. User Responsibilities */}
          <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">12.</span> User Responsibilities
            </h2>
            <p className="text-neutral-400 text-sm">
              All users of the Services agree to uphold the following standards:
            </p>
            <ul className="space-y-2.5 pt-1">
              {[
                "Use InviteOly lawfully and not fraudulently.",
                "Do not interfere with InviteOly systems or security.",
                "Do not create or distribute fraudulent tickets.",
                "Do not gain unauthorized access to another account.",
                "Do not introduce malicious software or impersonate another person or organization.",
                "Do not misuse Guest information.",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-neutral-300">
                  <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 13. Privacy */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">13.</span> Privacy
            </h2>
            <p>
              InviteOly processes personal information in accordance with its{" "}
              <Link href="/privacy" className="text-[#B89047] hover:underline font-medium">
                Privacy Policy
              </Link>
              . Hosts and Partners are responsible for ensuring they are authorized to provide Guest information to InviteOly.
            </p>
          </section>

          {/* 14. Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">14.</span> Intellectual Property
            </h2>
            <p>
              InviteOly retains all applicable rights in its software, dashboards, applications, designs, branding, logos, documentation, and proprietary technology. Use of InviteOly does not transfer ownership of InviteOly intellectual property.
            </p>
          </section>

          {/* 15. Third-Party Services */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">15.</span> Third-Party Services
            </h2>
            <p>
              InviteOly may use third-party providers for payment processing, cloud hosting, email delivery, SMS delivery, analytics, wallet functionality, and other Services. InviteOly is not responsible for outages or failures caused solely by third-party systems outside its reasonable control.
            </p>
          </section>

          {/* 16. Service Availability */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">16.</span> Service Availability
            </h2>
            <p>
              InviteOly does not guarantee that its Services will be continuously available or completely error-free. Temporary interruptions may occur because of maintenance, upgrades, security incidents, network problems, third-party outages, or circumstances beyond InviteOly&apos;s reasonable control.
            </p>
          </section>

          {/* 17. Event Responsibility */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">17.</span> Event Responsibility
            </h2>
            <p>
              InviteOly does not control the physical operation of events. Hosts and Partners are responsible for event safety, security, capacity requirements, Guest conduct, venue conditions, licensing, regulatory compliance, and other event operations. Hosts, Partners, and authorized event personnel using InviteOly&apos;s ticket-scanning and entry-management services must follow applicable InviteOly Guest Entry Policies &amp; Procedures.
            </p>
          </section>

          {/* 18. Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">18.</span> Disclaimer
            </h2>
            <p>
              To the fullest extent permitted by law, InviteOly Services are provided &quot;as is&quot; and &quot;as available.&quot; Nothing in these Terms excludes rights or warranties that cannot legally be excluded.
            </p>
          </section>

          {/* 19. Limitation of Liability */}
          <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">19.</span> Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, InviteOly will not be liable for indirect, incidental, special, exemplary, punitive, or consequential damages arising from use of the Services. InviteOly is not responsible for losses resulting from event cancellation, denied admission, Guest or Host conduct, inaccurate information provided by users, unavailable Guest devices, or third-party service failures outside InviteOly&apos;s reasonable control.
            </p>
            <p>
              To the fullest extent permitted by applicable law, InviteOly&apos;s total aggregate liability arising out of or relating to the Services, these Terms, or the specific event giving rise to a claim will not exceed the total amount actually paid to InviteOly for the InviteOly package or Services associated with that specific event.
            </p>
            <p>
              This limitation applies regardless of the form of the claim, whether based in contract, tort, negligence, statute, or another legal theory, to the extent permitted by applicable law.
            </p>
            <p>
              InviteOly will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits, lost revenue, loss of business opportunities, loss of goodwill, or losses arising from the cancellation, postponement, interruption, or operation of an event, except where such liability cannot legally be excluded or limited.
            </p>
            <p>
              InviteOly is not responsible for losses caused by the acts or omissions of a Host, Partner, venue, Guest, vendor, door attendant, or other third party, or by circumstances outside InviteOly&apos;s reasonable control.
            </p>
            <p className="text-xs text-neutral-400">
              Nothing in this section excludes or limits any liability or legal right that cannot lawfully be excluded or limited under applicable law.
            </p>
          </section>

          {/* 20. Suspension */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">20.</span> Suspension
            </h2>
            <p>
              InviteOly may suspend or terminate access when reasonably necessary because of fraud, nonpayment, security threats, unlawful activity, abuse, or material violations of these Terms.
            </p>
          </section>

          {/* 21. Changes */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">21.</span> Changes
            </h2>
            <p>
              InviteOly may update these Terms as its Services or legal requirements change. The current version will display its effective or last-updated date.
            </p>
          </section>

          {/* 22. Governing Law and Disputes */}
          <section className="space-y-5">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">22.</span> Governing Law and Disputes
            </h2>
            <p>
              These Terms are governed by applicable law, including applicable California law where appropriate.
            </p>

            {/* Informal Dispute Resolution */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
              <h3 className="text-base font-semibold font-space-grotesk text-white">
                Informal Dispute Resolution
              </h3>
              <p className="text-sm text-neutral-300">
                Before initiating formal legal proceedings, InviteOly and the user agree to make a good-faith effort to resolve the dispute informally.
              </p>
              <p className="text-sm text-neutral-300">
                A user should provide written notice describing the dispute, the event or transaction involved, the requested resolution, and sufficient information for InviteOly to identify the applicable account, event, or transaction.
              </p>
              <div className="border-l-2 border-[#B89047] pl-4 py-1 text-xs sm:text-sm text-neutral-300 space-y-1 my-3 bg-neutral-950/60 rounded-r-lg p-3">
                <p className="font-semibold text-white">Dispute notices should be sent to:</p>
                <p>InviteOly</p>
                <p>Email: legal@inviteoly.com</p>
                <p>Mailing Address: San Francisco, CA</p>
              </div>
              <p className="text-sm text-neutral-300">
                InviteOly and the user will have 30 days after receipt of the dispute notice to attempt to resolve the matter informally before either party initiates formal legal proceedings, unless immediate action is reasonably necessary or applicable law provides otherwise.
              </p>
            </div>

            {/* Legal Proceedings */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
              <h3 className="text-base font-semibold font-space-grotesk text-white">
                Legal Proceedings
              </h3>
              <p className="text-sm text-neutral-300">
                Unless applicable law provides otherwise, any lawsuit or court proceeding arising out of or relating to these Terms or the InviteOly Services will be brought in a state or federal court having jurisdiction in San Francisco, California.
              </p>
              <p className="text-sm text-neutral-300">
                Nothing in these Terms prevents either party from bringing an eligible claim in small claims court. Nothing in this section limits any rights or remedies that cannot legally be waived under applicable law.
              </p>
            </div>
          </section>

          {/* 23. Additional Agreements */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">23.</span> Additional Agreements
            </h2>
            <p>
              Depending on the user&apos;s relationship with InviteOly, the Privacy Policy, Host Agreement, Guest Ticket Terms, Refund &amp; Cancellation Policy, Partner Agreement, Cookie Policy, and Electronic Communications/SMS Terms may also apply.
            </p>
          </section>

          {/* 24. Contact */}
          <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
              <span className="text-[#B89047]">24.</span> Contact Information
            </h2>
            <p className="text-sm text-neutral-400">
              For any questions regarding these Terms of Service or to contact InviteOly regarding legal notices, please reach out to us:
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
                  <span className="text-xs text-neutral-400 block font-medium">Support &amp; Legal Email</span>
                  <a href="mailto:support@inviteoly.com" className="text-sm font-semibold text-white hover:text-[#B89047] transition-colors">
                    support@inviteoly.com
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
