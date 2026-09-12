"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { requestCustomQuote } from "../../store/payment.slice";
import { X, Sparkles, Send } from "lucide-react";
import { toast } from "sonner";

interface RequestCustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

export const RequestCustomQuoteModal: React.FC<
  RequestCustomQuoteModalProps
> = ({ isOpen, onClose, planName = "Custom Quote" }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [eventName, setEventName] = useState("Summer Gala 2026");
  const [guestCount, setGuestCount] = useState(650);
  const [eventDate, setEventDate] = useState("Aug 3, 2026");
  const [eventTime, setEventTime] = useState("7:00 PM - 11:00 PM");
  const [hostName, setHostName] = useState("Liam Martinez");
  const [hostEmail, setHostEmail] = useState("example@email.com");
  const [hostPhone, setHostPhone] = useState("+1256598326");
  const [notes, setNotes] = useState(
    "Large ballroom celebration requiring custom attendee check-in gates and VIP guest list allocation."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) {
      toast.error("Please enter an event name");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(
        requestCustomQuote({
          eventName: eventName.trim(),
          eventDate,
          eventTime,
          hostName,
          hostEmail,
          hostPhone,
          venueContact: "+1256598326",
          totalGuest: Number(guestCount) || 600,
          notes: notes.trim(),
        })
      );

      toast.success(
        "Custom event request submitted to Admin! An invoice has been generated for your review in Payment Pending."
      );

      setIsSubmitting(false);
      onClose();
      router.push("/host/payment-pending");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200 font-work-sans">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF9EE] text-[#C39B4C] shadow-2xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-space-grotesk tracking-tight">
              Request Custom Quote ({planName})
            </h3>
            <p className="mt-1 text-xs text-gray-500 font-work-sans leading-relaxed">
              For large scale events (600+ guests) and bespoke requirements, our
              administrative team will review your specifications and issue a
              tailored invoice.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Summer Gala 2026"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-[#C39B4C] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Estimated Guests
              </label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                min={200}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-[#C39B4C] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Event Date
              </label>
              <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-[#C39B4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Event Time
              </label>
              <input
                type="text"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-[#C39B4C] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Host Name
              </label>
              <input
                type="text"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-[#C39B4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={hostEmail}
                onChange={(e) => setHostEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-[#C39B4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={hostPhone}
                onChange={(e) => setHostPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-[#C39B4C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Custom Requirements &amp; Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Provide special notes for administrative invoice review..."
              className="w-full rounded-lg border border-gray-200 p-2.5 text-xs text-gray-900 focus:border-[#C39B4C] focus:outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#C39B4C] px-5 py-2 text-xs font-medium text-white hover:bg-[#b08b3e] shadow-2xs transition-colors cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>
                {isSubmitting ? "Submitting..." : "Send Request to Admin"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestCustomQuoteModal;

