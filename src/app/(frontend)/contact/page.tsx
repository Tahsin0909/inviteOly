"use client";

import { WHATSAPP_SUPPORT_URL } from "@/constants/sidebarMenu";
import {
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Send
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "Host Event Question",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your message has been received! We will reply within 24 hours.");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-neutral-50/60 dark:bg-[#0F0F0F] text-neutral-900 dark:text-white pt-24 pb-20 font-work-sans transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-neutral-900 dark:text-white mt-3 tracking-tight">
            Contact InviteOly
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            Have questions about wedding packages, custom enterprise ticketing, or partnership opportunities? We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-none">
              <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                Direct Contact Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Email Support</span>
                    <a
                      href="mailto:support@InviteOly.com"
                      className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-[#B89047] dark:hover:text-[#B89047] transition-colors"
                    >
                      support@inviteoly.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center shrink-0">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Phone Enquiries</span>
                    <span className="text-sm font-semibold text-neutral-400 dark:text-neutral-500">
                      —
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Instant WhatsApp Concierge</span>
                    <Link
                      href={WHATSAPP_SUPPORT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1ea952] dark:text-[#25D366] hover:underline"
                    >
                      Chat Live on WhatsApp
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center shrink-0">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Hours of Operation</span>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      Monday – Friday: 8am – 8pm PT<br />
                      Weekend Emergency Event Support: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="size-16 rounded-full bg-[#0FA958]/10 text-[#0FA958] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Our team has received your message and will get back to you shortly via email.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        inquiryType: "Host Event Question",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white mb-2">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        First Name <span className="text-[#B89047]">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Jane"
                        className="w-full h-11 px-3.5 rounded-xl bg-neutral-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-[#B89047] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full h-11 px-3.5 rounded-xl bg-neutral-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-[#B89047] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Email Address <span className="text-[#B89047]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        className="w-full h-11 px-3.5 rounded-xl bg-neutral-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-[#B89047] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-11 px-3.5 rounded-xl bg-neutral-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-[#B89047] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full h-11 px-3.5 rounded-xl bg-neutral-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-[#B89047] transition-colors"
                    >
                      <option className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" value="Host Event Question">Host Event Question</option>
                      <option className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" value="Partner & Venue Application">Partner & Venue Application</option>
                      <option className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" value="Billing & Invoicing Support">Billing & Invoicing Support</option>
                      <option className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" value="Custom Enterprise Package">Custom Enterprise Package</option>
                      <option className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" value="Technical or Scanner App Help">Technical or Scanner App Help</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Message <span className="text-[#B89047]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your event date, estimated guest count, or any specific questions..."
                      className="w-full p-3.5 rounded-xl bg-neutral-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-[#B89047] resize-y transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Send className="size-4" />
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

