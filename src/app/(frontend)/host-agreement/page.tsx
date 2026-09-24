import React from "react";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarCheck,
    Ticket,
    ShieldCheck,
    Building2,
    Mail,
    MapPin,
    Globe,
    CheckCircle2,
    Lock,
    Users,
} from "lucide-react";

export const metadata = {
    title: "Host Agreement - InviteOly",
    description: "Terms and responsibilities governing event hosts and organizers using InviteOly.",
};

export default function HostAgreementPage() {
    return (
        <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
            <div className="container mx-auto">
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
                        EVENT HOSTS &amp; ORGANIZERS
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-2 tracking-tight">
                        InviteOly Host Agreement
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                        Effective Date: October 10, 2026 · Last Updated: October 10, 2026
                    </p>
                </div>

                {/* Introduction Banner */}
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center shrink-0">
                            <CalendarCheck className="size-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold font-space-grotesk text-white">
                                Host Operational Terms
                            </h2>
                            <p className="text-xs text-neutral-400">
                                Responsibilities, ticketing guidelines, and entry standards for private event organizers.
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                        This Host Agreement applies to individuals or organizations purchasing or managing an event through InviteOly (&quot;Host&quot;). By purchasing an InviteOly package or creating an event, the Host agrees to this Agreement and the{" "}
                        <Link href="/terms" className="text-[#B89047] hover:underline underline-offset-4 font-medium">
                            InviteOly Terms of Service
                        </Link>
                        .
                    </p>
                </div>

                {/* Content Sections */}
                <div className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-10">
                    {/* 1. Host Responsibility */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">1.</span> Host Responsibility
                        </h2>
                        <p>
                            The Host is the organizer or authorized representative responsible for the event. InviteOly provides technology and does not assume responsibility for operating the Host&apos;s event.
                        </p>
                    </section>

                    {/* 2. Event Information */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">2.</span> Event Information
                        </h2>
                        <p>
                            The Host is responsible for accurate event names, dates/times, venue information, Guest information, ticket types, age restrictions, identification requirements, dress codes, table/seat information, RSVP deadlines, and other event requirements.
                        </p>
                    </section>

                    {/* 3. Guest Lists */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">3.</span> Guest Lists
                        </h2>
                        <p>
                            The Host may manually enter Guests or upload Guest information and represents that it is authorized to provide the information to InviteOly for event-management purposes.
                        </p>
                    </section>

                    {/* 4. Tickets */}
                    <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center shrink-0">
                                <Lock className="size-4" />
                            </div>
                            <h2 className="text-xl font-bold font-space-grotesk text-white">
                                <span className="text-[#B89047]">4.</span> Tickets &amp; Lock &amp; Finalize
                            </h2>
                        </div>
                        <p>
                            The Host is responsible for reviewing ticket assignments before sending tickets. Where InviteOly provides a Lock &amp; Finalize feature, the Host should verify information before finalizing a ticket. Certain information may no longer be editable after finalization or distribution.
                        </p>
                    </section>

                    {/* 5. Standard Package */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">5.</span> Standard Package
                        </h2>
                        <p>
                            Where the Standard Package is selected, tickets may be identified using Guest numbers such as Guest 001, Guest 002, Guest 003, rather than displaying personalized Guest names. Hosts may assign names within the Host Dashboard for tracking purposes where available. Assigned names may be available to authorized door personnel through the InviteOly Scan App even when the name is not displayed on the Guest&apos;s ticket.
                        </p>
                    </section>

                    {/* 6. Premium Package */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">6.</span> Premium Package
                        </h2>
                        <p>
                            Premium may include personalized Guest tickets, RSVP management, automatic email delivery, and table/seat functionality, depending on the features displayed at purchase. Hosts may establish RSVP deadlines, and unanswered tickets may automatically become unavailable or void after the deadline.
                        </p>
                    </section>

                    {/* Package Overview Comparison Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                            <div className="flex items-center gap-2 text-white font-bold font-space-grotesk">
                                <Ticket className="size-4 text-[#B89047]" /> Standard Package Overview
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-0.5" />
                                    <span>Numbered tickets (e.g., Guest 001, Guest 002)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-0.5" />
                                    <span>Private name assignment in Host Dashboard</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-0.5" />
                                    <span>Name visible to door staff in Scan App upon check-in</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-[#B89047]/30 space-y-3">
                            <div className="flex items-center gap-2 text-white font-bold font-space-grotesk">
                                <Users className="size-4 text-[#B89047]" /> Premium Package Overview
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-0.5" />
                                    <span>Personalized Guest tickets &amp; direct email delivery</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-0.5" />
                                    <span>RSVP management with strict response deadlines</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-0.5" />
                                    <span>Table and seat allocation functionality</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 7. Ticket Distribution */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">7.</span> Ticket Distribution
                        </h2>
                        <p>
                            Hosts are responsible for ensuring tickets reach intended Guests. Automatic delivery does not guarantee receipt because email providers, spam filters, incorrect addresses, and other circumstances may interfere with delivery.
                        </p>
                    </section>

                    {/* 8. Event Entry */}
                    <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center shrink-0">
                                <ShieldCheck className="size-4" />
                            </div>
                            <h2 className="text-xl font-bold font-space-grotesk text-white">
                                <span className="text-[#B89047]">8.</span> Event Entry Responsibilities
                            </h2>
                        </div>
                        <p>
                            Hosts are responsible for determining the event entry requirements that apply to their Guests.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-2">
                                <span className="text-xs font-semibold text-[#B89047] uppercase tracking-wider block font-space-grotesk">
                                    Direct Bookings (Without Partner)
                                </span>
                                <p className="text-xs sm:text-sm text-neutral-300">
                                    The Host is responsible for providing appropriate door attendants and compatible scanning devices unless InviteOly expressly agrees otherwise in writing.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-2">
                                <span className="text-xs font-semibold text-[#B89047] uppercase tracking-wider block font-space-grotesk">
                                    Partner-Referred Bookings
                                </span>
                                <p className="text-xs sm:text-sm text-neutral-300">
                                    For events booked through an InviteOly Partner, the Partner is responsible for providing door attendants and scanning devices unless the Host and Partner have separately agreed that the Host will provide them.
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                            Hosts, Partners, and authorized event personnel using InviteOly&apos;s ticket-scanning and entry-management services must follow applicable InviteOly Guest Entry Policies &amp; Procedures.
                        </p>
                    </section>

                    {/* 9. Identification */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">9.</span> Identification
                        </h2>
                        <p>
                            Where the Host requires identification verification, the Host and its entry personnel are responsible for conducting verification appropriately and lawfully. InviteOly does not make the final decision regarding Guest identity or admission.
                        </p>
                    </section>

                    {/* 10. Payment */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">10.</span> Payment &amp; Chargebacks
                        </h2>
                        <p>
                            The Host agrees to pay the price displayed for the selected package at checkout and may not initiate an improper chargeback merely because the Host later decides not to hold the event or no longer wants the purchased Services. Legitimate billing disputes remain subject to applicable law.
                        </p>
                    </section>

                    {/* 11. Cancellations */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">11.</span> Cancellations
                        </h2>
                        <p>
                            Cancellations, postponements, and date changes are subject to InviteOly&apos;s Refund &amp; Cancellation Policy.
                        </p>
                    </section>

                    {/* 12. Compliance */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">12.</span> Compliance
                        </h2>
                        <p>
                            The Host is responsible for ensuring the event complies with applicable laws, permits, venue requirements, capacity limits, safety requirements, and other regulations.
                        </p>
                    </section>

                    {/* 13. Event Conduct */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">13.</span> Event Conduct
                        </h2>
                        <p>
                            InviteOly is not responsible for Guest conduct, injuries, security incidents, venue disputes, property loss, or other physical-event operations outside InviteOly&apos;s control.
                        </p>
                    </section>

                    {/* 14. Acceptance */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">14.</span> Acceptance
                        </h2>
                        <p>
                            By purchasing or using InviteOly Services as a Host, the Host acknowledges this Agreement and the applicable{" "}
                            <Link href="/terms" className="text-[#B89047] hover:underline underline-offset-4">
                                Terms of Service
                            </Link>
                            ,{" "}
                            <Link href="/privacy" className="text-[#B89047] hover:underline underline-offset-4">
                                Privacy Policy
                            </Link>
                            , and Refund &amp; Cancellation Policy.
                        </p>
                    </section>

                    {/* 15. Company Information */}
                    <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
                        <h2 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                            <span className="text-[#B89047]">15.</span> Company Information
                        </h2>
                        <p className="text-sm text-neutral-400">
                            For any inquiries regarding this Host Agreement or event management services, please contact:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                                <Building2 className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-xs text-neutral-400 block font-medium">InviteOly Legal Entity</span>
                                    <span className="text-sm font-semibold text-white">InviteOly Inc.</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                                <Mail className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-xs text-neutral-400 block font-medium">Contact Email</span>
                                    <a
                                        href="mailto:support@inviteoly.com"
                                        className="text-sm font-semibold text-white hover:text-[#B89047] transition-colors"
                                    >
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
                                    <Link
                                        href="https://www.inviteoly.com"
                                        className="text-sm font-semibold text-white hover:text-[#B89047] transition-colors"
                                    >
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