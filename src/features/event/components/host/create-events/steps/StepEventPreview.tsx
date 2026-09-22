"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setCurrentStep,
  updatePreviewGuest,
  deletePreviewGuest,
  resetCreateEvent,
  defaultPreviewGuests,
} from "@/features/event/store/createEvent.slice";
import { IEventPreviewGuest } from "@/features/event/event.interface";
import {
  Calendar as CalendarIcon,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
} from "lucide-react";
import { formatTo12Hour } from "@/lib/utils";

export const StepEventPreview: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux data
  const eventDetails = useSelector(
    (state: RootState) => state.createEvent?.eventDetails
  );
  const eventSettings = useSelector(
    (state: RootState) => state.createEvent?.eventSettings
  );
  const rawPreviewGuests = useSelector(
    (state: RootState) => state.createEvent?.previewGuests
  );

  const guests: IEventPreviewGuest[] = rawPreviewGuests && rawPreviewGuests.length > 0
    ? rawPreviewGuests
    : defaultPreviewGuests;

  // Edit Guest Modal State
  const [editingGuest, setEditingGuest] = useState<IEventPreviewGuest | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTicketType, setEditTicketType] = useState("");
  const [editTable, setEditTable] = useState("");

  // Final confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Field fallbacks matching mockup
  const hostName = eventDetails?.hostName || "John Doe";
  const hostType = eventDetails?.hostType || "Individual";
  const email = eventDetails?.email || "john.doe@example.com";
  const phone = eventDetails?.phone || "+(000)000-0000";
  const companyName = eventDetails?.companyName || "---";

  const eventName = eventDetails?.eventName || "John Doe";
  const eventType = eventDetails?.eventType || "Wedding";
  const eventDescription =
    eventDetails?.eventDescription ||
    "Lorem ipsum dolor sit amet consectetur. Purus sem egestas suspendisse sit tristique libero massa imperdiet laoreet. Nunc iaculis pharetra enim integer feugiat. Arcu lectus consectetur vitae etiam urna urna congue ut metus. Orci montes mus a magnis lobortis quis faucibus eget. Morbi faucibus pulvinar tristique quis lectus. Sem nisl mauris tristique mauris lorem. Ut adipiscing vivarra varius justo sit.";

  const eventDate = eventDetails?.eventDate || "mm/dd/yyyy";
  const endDate = eventDetails?.endDate || "mm/dd/yyyy";
  const startTime = formatTo12Hour(eventDetails?.startTime) || "--:-- --";
  const endTime = formatTo12Hour(eventDetails?.endTime) || "--:-- --";

  const venue = eventSettings?.venue || "Select venue";
  const room = eventSettings?.room || "N/A";
  const address = eventSettings?.address || "";
  const state = eventSettings?.state || eventSettings?.venueState || "Dhaka Division";
  const city = eventSettings?.city || "Dhaka";
  const postalCode = eventSettings?.postalCode || "1219";

  const handleEditClick = (guest: IEventPreviewGuest) => {
    setEditingGuest(guest);
    setEditName(guest.name);
    setEditEmail(guest.email);
    setEditTicketType(guest.ticketType);
    setEditTable(guest.table);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuest) return;

    dispatch(
      updatePreviewGuest({
        id: editingGuest.id,
        name: editName.trim() || editingGuest.name,
        email: editEmail.trim() || editingGuest.email,
        ticketType: editTicketType.trim() || editingGuest.ticketType,
        table: editTable.trim() || editingGuest.table,
      })
    );

    setEditingGuest(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deletePreviewGuest(id));
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleFinalRedirect = () => {
    dispatch(resetCreateEvent());
    router.push("/host/events");
  };

  return (
    <div className="w-full space-y-8 font-work-sans py-2 max-w-5xl mx-auto">
      {/* 1. Host or Client Information */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
          Host or Client Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Host or Client Name
            </label>
            <input
              type="text"
              readOnly
              value={hostName}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 select-all focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Host Type
            </label>
            <input
              type="text"
              readOnly
              value={hostType}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 select-all focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Email Address
            </label>
            <input
              type="text"
              readOnly
              value={email}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 select-all focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              readOnly
              value={phone}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 select-all focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              readOnly
              value={companyName}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 select-all focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* 2. Basic Event Information */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
          Basic Event Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Event Name
            </label>
            <input
              type="text"
              readOnly
              value={eventName}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 select-all focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Event Type
            </label>
            <input
              type="text"
              readOnly
              value={eventType}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 select-all focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Event Description
            </label>
            <textarea
              readOnly
              rows={4}
              value={eventDescription}
              className="w-full p-3.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-700 leading-relaxed resize-none focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* 3. Event Date and Time */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
          Event Date and Time
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Event Date
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={eventDate}
                className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-600 focus:outline-none"
              />
              <CalendarIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              End Date
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={endDate}
                className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-600 focus:outline-none"
              />
              <CalendarIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Start Time*
            </label>
            <input
              type="text"
              readOnly
              value={startTime}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              End Time*
            </label>
            <input
              type="text"
              readOnly
              value={endTime}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-600 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* 4. Venue and Location */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
          Venue and Location
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Venue
            </label>
            <input
              type="text"
              readOnly
              value={venue}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Room
            </label>
            <input
              type="text"
              readOnly
              value={room}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Full Address
            </label>
            <input
              type="text"
              readOnly
              value={address}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              City
            </label>
            <input
              type="text"
              readOnly
              value={city}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              State
            </label>
            <input
              type="text"
              readOnly
              value={state}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Postal Code
            </label>
            <input
              type="text"
              readOnly
              value={postalCode}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200/90 rounded-lg text-neutral-800 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* 5. Guest List Table */}
      <section className="space-y-4">
        <div className="overflow-x-auto rounded-xl border border-neutral-200/90 bg-white shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-neutral-50/90 border-b border-neutral-200/90 text-neutral-700 font-semibold">
                <th className="py-3 px-4 font-semibold">Guest Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Ticket Type</th>
                <th className="py-3 px-4 font-semibold">Table</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {guests.map((g) => (
                <tr key={g.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 whitespace-nowrap">
                    {g.name}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                    {g.email}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 whitespace-nowrap">
                    {g.ticketType}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 italic whitespace-nowrap">
                    {g.table}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditClick(g)}
                        title="Edit guest"
                        className="text-neutral-400 hover:text-neutral-700 transition-colors p-1"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(g.id)}
                        title="Delete guest"
                        className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Bottom Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
        <button
          type="button"
          onClick={() => dispatch(setCurrentStep(5))}
          className="px-6 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs sm:text-sm font-medium transition-all cursor-pointer"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="px-7 py-2.5 rounded-lg bg-[#B89047] hover:bg-[#a17e38] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Confirming...</span>
            </>
          ) : (
            <span>Confirm</span>
          )}
        </button>
      </div>

      {/* Edit Guest Modal */}
      {editingGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 font-work-sans relative animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setEditingGuest(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <X className="size-4" />
            </button>

            <h3 className="text-base font-bold font-space-grotesk text-neutral-900">
              Edit Guest Details
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Guest Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-[#B89047]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-[#B89047]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Ticket Type
                  </label>
                  <input
                    type="text"
                    value={editTicketType}
                    onChange={(e) => setEditTicketType(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-[#B89047]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Table
                  </label>
                  <input
                    type="text"
                    value={editTable}
                    onChange={(e) => setEditTable(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-[#B89047]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingGuest(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium bg-[#B89047] hover:bg-[#a17e38] text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Publication Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 font-work-sans text-center relative animate-in zoom-in-95">
            <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="size-8 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-xl font-bold font-space-grotesk text-neutral-900">
                Event Created Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Your event &ldquo;{eventName}&rdquo; has been finalized. Your digital tickets and guest list are now active.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleFinalRedirect}
                className="w-full py-2.5 text-xs sm:text-sm font-semibold bg-[#B89047] hover:bg-[#a17e38] text-white rounded-lg transition-all cursor-pointer shadow-xs"
              >
                Go to Events Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepEventPreview;
