"use client";

import { resetCreateEvent } from "@/features/event/store/createEvent.slice";
import { RootState } from "@/redux/store";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Share2,
  ShieldCheck,
  UserPlus
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IGuest {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  table: string;
  status: "Confirmed" | "Invited" | "Pending";
}

export const StepGuestList: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const packageSelection = useSelector(
    (state: RootState) => state.createEvent?.packageSelection
  );
  const eventDetails = useSelector(
    (state: RootState) => state.createEvent?.eventDetails
  );
  const eventSettings = useSelector(
    (state: RootState) => state.createEvent?.eventSettings
  );

  const [copiedLink, setCopiedLink] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [guests, setGuests] = useState<IGuest[]>([
    {
      id: "1",
      name: "Alexander Vance",
      email: "alexander.vance@example.com",
      ticketType: "VIP Access",
      table: "Table 01",
      status: "Confirmed",
    },
    {
      id: "2",
      name: "Sophia Montenegro",
      email: "sophia.m@example.com",
      ticketType: "General Admission",
      table: "Table 02",
      status: "Invited",
    },
  ]);

  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${typeof window !== "undefined" ? window.location.origin : ""}/invitation/preview`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newGuestEmail.trim()) return;

    setGuests((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newGuestName.trim(),
        email: newGuestEmail.trim(),
        ticketType: "General Admission",
        table: "Table 03",
        status: "Invited",
      },
    ]);

    setNewGuestName("");
    setNewGuestEmail("");
    setShowAddModal(false);
  };

  const handleFinishEvent = () => {
    setIsFinishing(true);
    setTimeout(() => {
      dispatch(resetCreateEvent());
      router.push("/host/events");
    }, 1200);
  };

  const capacity =
    eventSettings?.venueGuestCapacity ||
    packageSelection?.guestRange ||
    "Up to 200";

  return (
    <div className="w-full space-y-6 font-work-sans">
      {/* Payment Confirmation Banner */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5 sm:mt-0">
            <CheckCircle2 className="size-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-space-grotesk text-emerald-950">
                Payment Confirmed & Verified
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-full">
                <ShieldCheck className="size-3" />
                Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
              Your tier{" "}
              <span className="font-semibold text-emerald-950">
                {packageSelection?.packageName || "Standard"} (
                {packageSelection?.price || "$149"})
              </span>{" "}
              is now activated for{" "}
              <span className="font-medium text-emerald-950">
                {eventDetails?.eventName || "Your Event"}
              </span>
              . You can now invite and manage your guest list.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white text-neutral-800 border border-emerald-300 rounded-lg shadow-2xs hover:bg-emerald-50/50 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
        >
          {copiedLink ? (
            <>
              <Check className="size-3.5 text-emerald-600" />
              <span>Invite Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="size-3.5 text-emerald-700" />
              <span>Share RSVP Link</span>
            </>
          )}
        </button>
      </div>

      {/* Event Details Summary Card */}
      <div className="rounded-xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C39B4C]">
              Step 5 of 5
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900">
              Guest List & Attendee Management
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium bg-[#C39B4C] hover:bg-[#b08b3e] text-white rounded-lg transition-all cursor-pointer shadow-2xs"
            >
              <UserPlus className="size-4" />
              <span>Add Guest</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
          <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-100">
            <span className="text-xs text-neutral-500">Venue Capacity</span>
            <p className="text-lg font-bold font-space-grotesk text-neutral-900 mt-0.5">
              {capacity}
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-100">
            <span className="text-xs text-neutral-500">Roster Total</span>
            <p className="text-lg font-bold font-space-grotesk text-neutral-900 mt-0.5">
              {guests.length}
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-100">
            <span className="text-xs text-neutral-500">Confirmed</span>
            <p className="text-lg font-bold font-space-grotesk text-emerald-600 mt-0.5">
              {guests.filter((g) => g.status === "Confirmed").length}
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-100">
            <span className="text-xs text-neutral-500">Invited / Pending</span>
            <p className="text-lg font-bold font-space-grotesk text-amber-600 mt-0.5">
              {guests.filter((g) => g.status !== "Confirmed").length}
            </p>
          </div>
        </div>
      </div>

      {/* Guest Table Card */}
      <div className="rounded-xl border border-neutral-200/80 bg-white overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold font-space-grotesk text-neutral-900">
            Guest Roster ({guests.length})
          </h3>
          <span className="text-xs text-neutral-500">
            Tickets will auto-sync with the check-in scanning app
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-neutral-200/80 text-neutral-500 font-medium">
                <th className="py-3 px-4">Guest Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Access Tier</th>
                <th className="py-3 px-4">Seating / Table</th>
                <th className="py-3 px-4">RSVP Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {guests.map((g) => (
                <tr key={g.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-neutral-900">
                    {g.name}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">{g.email}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[11px] font-medium">
                      {g.ticketType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">{g.table}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${g.status === "Confirmed"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                        }`}
                    >
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 font-work-sans">
            <h3 className="text-lg font-bold font-space-grotesk text-neutral-900">
              Add New Guest
            </h3>
            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  placeholder="e.g. Eleanor Rigby"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#C39B4C]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newGuestEmail}
                  onChange={(e) => setNewGuestEmail(e.target.value)}
                  placeholder="e.g. eleanor@example.com"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#C39B4C]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#C39B4C] hover:bg-[#b08b3e] text-white rounded-lg"
                >
                  Add to List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
        <button
          type="button"
          onClick={() => router.push("/host/events")}
          className="px-5 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs sm:text-sm font-medium transition-all cursor-pointer"
        >
          Save & Exit
        </button>

        <button
          type="button"
          onClick={handleFinishEvent}
          disabled={isFinishing}
          className="px-7 py-2.5 rounded-lg bg-[#0FA958] hover:bg-[#0c8e4a] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
        >
          {isFinishing ? (
            <>
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Publishing Event...</span>
            </>
          ) : (
            <>
              <span>Complete & Publish Event</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepGuestList;
