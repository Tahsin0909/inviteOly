import React from "react";
import Link from "next/link";
import { ArrowLeft, Handshake, Mail, Globe, MapPin, Building2, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "Partner Agreement - InviteOly",
    description: "Terms and conditions governing participation in the InviteOly Partner Program.",
};

export default function PartnerAgreementPage() {
    return (
        <main className="min-h-screen bg-neutral-50/60 dark:bg-[#0F0F0F] text-neutral-900 dark:text-white pt-24 pb-20 font-work-sans transition-colors duration-200">
            <div className="container mx-auto">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-[#B89047] dark:hover:text-[#B89047] transition-colors mb-8 group"
                >
                    <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to Home
                </Link>

                {/* Header */}
                <div className="border-b border-neutral-200/80 dark:border-neutral-800 pb-8 mb-10">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
                        PARTNER PROGRAM
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-neutral-900 dark:text-white mt-2 tracking-tight">
                        InviteOly Partner Agreement
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                        Effective Date: October 10, 2026 · Last Updated: October 10, 2026
                    </p>
                </div>

                {/* Introduction Banner */}
                <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 mb-10 space-y-4 shadow-xs dark:shadow-none">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center shrink-0">
                            <Handshake className="size-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
                                Program Participation
                            </h2>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Partner network standards, benefits, and operational guidelines.
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        This Partner Agreement governs participation in the InviteOly Partner Program. By enrolling as an InviteOly Partner or accessing Partner features, you agree to these terms.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-10">
                    {/* 1. Partner Relationship */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">1.</span> Partner Relationship
                        </h2>
                        <p>
                            An approved Partner may introduce InviteOly Services to its clients and access Partner features made available by InviteOly. Participation does not create an employment relationship, franchise, agency, joint venture, or legal partnership between the Partner and InviteOly.
                        </p>
                    </section>

                    {/* 2. Partner Benefits */}
                    <section className="bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs dark:shadow-none">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">2.</span> Partner Benefits
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Participating partners in good standing receive access to:
                        </p>
                        <ul className="space-y-2.5 pt-1">
                            {[
                                "Access to a dedicated Partner Dashboard.",
                                "Partner pricing and exclusive discounts for eligible InviteOly packages.",
                                "Partner Rewards on qualifying referred bookings.",
                                "Live event and capacity monitoring.",
                                "Comprehensive door assistant training and client marketing materials.",
                                "Opportunities for InviteOly website and social-media exposure.",
                            ].map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-neutral-700 dark:text-neutral-300">
                                    <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-1" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 3. Partner Rewards */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">3.</span> Partner Rewards
                        </h2>
                        <p>
                            Eligible Partners may earn 10% Partner Rewards on qualifying paid bookings credited to that Partner. Rewards are calculated on the qualifying InviteOly purchase amount as defined by the Partner program, excluding refunded, reversed, fraudulent, disputed, or otherwise ineligible transactions.
                        </p>
                    </section>

                    {/* 4. Partner Pricing */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">4.</span> Partner Pricing
                        </h2>
                        <p>
                            Eligible clients booking through a Partner may receive Partner pricing or discounts offered by InviteOly. Current pricing displayed by InviteOly at the time of booking controls.
                        </p>
                    </section>

                    {/* 5. Client Relationships */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">5.</span> Client Relationships
                        </h2>
                        <p>
                            Partners should accurately represent InviteOly&apos;s Services and may not make unauthorized warranties, guarantees, pricing commitments, or refund promises on InviteOly&apos;s behalf.
                        </p>
                    </section>

                    {/* 6. Event-Day Responsibilities */}
                    <section className="bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs dark:shadow-none">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">6.</span> Event-Day Responsibilities
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Partners and their designated entry attendants must fulfill the following duties:
                        </p>
                        <ul className="space-y-2.5 pt-1">
                            {[
                                "Assure appropriate entry staff are assigned.",
                                "Ensure staff have access to the InviteOly Scan App.",
                                "Provide compatible scanning devices and a reasonable backup device.",
                                "Maintain adequate device power, including a power bank or charging solution.",
                                "Provide authorized staff with the event's Scanner Login Code.",
                                "Ensure staff understand the Host's entry requirements.",
                                "Monitor Guest check-ins and capacity where applicable.",
                                "Handle ordinary entry issues at the event.",
                            ].map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-neutral-700 dark:text-neutral-300">
                                    <ShieldCheck className="size-4 text-[#B89047] shrink-0 mt-1" />
                                    <span>{resp}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 7. Guest Information */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">7.</span> Guest Information
                        </h2>
                        <p>
                            Partners may access Guest information only where necessary for legitimate event-management responsibilities. Guest information may not be sold, improperly disclosed, or used for unrelated purposes without appropriate authorization.
                        </p>
                    </section>

                    {/* 8. Marketing */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">8.</span> Marketing
                        </h2>
                        <p>
                            Partners may use InviteOly-approved marketing materials to explain InviteOly Services to prospective clients. InviteOly trademarks, logos, screenshots, or materials may not be altered in a misleading manner.
                        </p>
                    </section>

                    {/* 9. Partner Status */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">9.</span> Partner Status
                        </h2>
                        <p>
                            InviteOly may periodically review Partner status, including approximately every six months where applicable. Factors may include active InviteOly usage, client experience, adherence to Partner responsibilities, and continued participation.
                        </p>
                    </section>

                    {/* 10. No Exclusivity */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">10.</span> No Exclusivity
                        </h2>
                        <p>
                            Unless InviteOly and the Partner agree otherwise in writing, participation is non-exclusive.
                        </p>
                    </section>

                    {/* 11. Partner Conduct */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">11.</span> Partner Conduct
                        </h2>
                        <p>
                            Fraud, misuse of Guest information, reward manipulation, misleading advertising, security violations, or repeated failure to satisfy Partner responsibilities may result in suspension or termination.
                        </p>
                    </section>

                    {/* 12. Independent Businesses */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">12.</span> Independent Businesses
                        </h2>
                        <p>
                            The Partner operates its own independent business. InviteOly is not responsible for the Partner&apos;s venue operations, employees, contractors, taxes, licensing, insurance, security, or other business obligations.
                        </p>
                    </section>

                    {/* 13. Termination */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">13.</span> Termination
                        </h2>
                        <p>
                            Either party may discontinue participation subject to outstanding obligations. InviteOly may immediately suspend or terminate participation for fraud, unlawful activity, serious security concerns, or material violations.
                        </p>
                    </section>

                    {/* 14. Company Information */}
                    <section className="bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs dark:shadow-none">
                        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                            <span className="text-[#B89047]">14.</span> Company &amp; Partner Support Information
                        </h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            For inquiries regarding the Partner Program or to submit notices under this agreement, please reach out to:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80">
                                <Building2 className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Legal Business Name</span>
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">InviteOly Inc.</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80">
                                <Mail className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Partner Contact Email</span>
                                    <a href="mailto:partners@inviteoly.com" className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-[#B89047] transition-colors">
                                        partners@inviteoly.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80">
                                <MapPin className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Business Address</span>
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">San Francisco, California</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80">
                                <Globe className="size-5 text-[#B89047] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Official Website</span>
                                    <Link href="https://www.inviteoly.com" className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-[#B89047] transition-colors">
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