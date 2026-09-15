"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setCurrentStep,
  addUploadedGuestList,
  removeUploadedGuestList,
  addManualGuest,
  resetCreateEvent,
  defaultUploadedGuestLists,
} from "@/features/event/store/createEvent.slice";
import { IGuestManualEntry } from "@/features/event/event.interface";
import {
  GuestListHeader,
  SelectTicketTypeCard,
  UploadGuestListCard,
  UploadedGuestListsCard,
  GuestListFooter,
} from "./guest-list";
import { CheckCircle2, Sparkles, X } from "lucide-react";

export const StepGuestList: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Read event details & package from Redux
  const eventDetails = useSelector(
    (state: RootState) => state.createEvent?.eventDetails
  );
  const eventSettings = useSelector(
    (state: RootState) => state.createEvent?.eventSettings
  );
  const packageSelection = useSelector(
    (state: RootState) => state.createEvent?.packageSelection
  );
  const rawUploadedLists = useSelector(
    (state: RootState) => state.createEvent?.uploadedGuestLists
  );

  const guestLists = rawUploadedLists || defaultUploadedGuestLists;

  // Local state for Step 1 selection
  const [selectedTicketType, setSelectedTicketType] = useState<string>("Adult");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Handle CSV file upload
  const handleFileUpload = (
    ticketType: string,
    guestsCount: number,
    fileName: string
  ) => {
    dispatch(
      addUploadedGuestList({
        id: Date.now().toString(),
        ticketType,
        guestsCount,
        fileName,
        status: "ready",
      })
    );
  };

  // Handle deleting a list
  const handleDeleteList = (id: string) => {
    dispatch(removeUploadedGuestList(id));
  };

  // Handle manual guest addition
  const handleAddManualGuest = (entry: IGuestManualEntry) => {
    dispatch(addManualGuest(entry));
  };

  // Bottom footer handlers
  const handleCancel = () => {
    // Return to Step 4 (Preview Ticket)
    dispatch(setCurrentStep(4));
  };

  const handleOpenConfirm = () => {
    setShowConfirmModal(true);
  };

  const handleFinalPublish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      dispatch(resetCreateEvent());
      router.push("/host/events");
    }, 1200);
  };

  const totalGuests = guestLists.reduce(
    (sum, item) => sum + (item.guestsCount || 0),
    0
  );

  return (
    <div className="w-full space-y-6 font-work-sans py-2">
      {/* Top Header Component */}
      <GuestListHeader />

      {/* Main 2-Column Responsive Layout matching mockups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Step 1 (Select Ticket Type) & Step 2 (Upload CSV) (~62% on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <SelectTicketTypeCard
            selectedTicketType={selectedTicketType}
            onSelectTicketType={(type) => setSelectedTicketType(type)}
          />

          <UploadGuestListCard
            selectedTicketType={selectedTicketType}
            onFileUpload={handleFileUpload}
          />
        </div>

        {/* Right Column: Uploaded Guest Lists Card with Expandable Manual Entry (~38% on desktop) */}
        <div className="lg:col-span-5">
          <UploadedGuestListsCard
            guestLists={guestLists}
            onDeleteList={handleDeleteList}
            onAddManualGuest={handleAddManualGuest}
          />
        </div>
      </div>

      {/* Bottom Footer Actions (Cancel / Preview & Confirm) */}
      <GuestListFooter
        onCancel={handleCancel}
        onSubmit={handleOpenConfirm}
        isSubmitting={isSubmitting}
      />

      {/* Confirmation & Summary Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 font-work-sans relative animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-[#FBF4E8] flex items-center justify-center text-[#B89047] shrink-0 border border-[#B89047]/20">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-space-grotesk text-neutral-900">
                  Ready to Publish Event?
                </h3>
                <p className="text-xs text-neutral-500">
                  Review your event details before final publication
                </p>
              </div>
            </div>

            {/* Summary Details */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2.5">
                <span className="text-neutral-500">Event Name</span>
                <span className="font-semibold text-neutral-900">
                  {eventDetails?.eventName || "Luxury Event Celebration"}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2.5">
                <span className="text-neutral-500">Selected Package</span>
                <span className="font-semibold text-[#B89047]">
                  {packageSelection?.packageName || "Standard Package"} (
                  {packageSelection?.price || "$149"})
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2.5">
                <span className="text-neutral-500">Venue &amp; Location</span>
                <span className="font-medium text-neutral-800 text-right max-w-[220px] truncate">
                  {eventSettings?.venue || "Grand Plaza Ballroom"},{" "}
                  {eventSettings?.city || "New York"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Total Uploaded Guests</span>
                <span className="font-bold text-emerald-600 font-space-grotesk text-sm">
                  {totalGuests} guests ({guestLists.length} ticket tiers)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              >
                Go Back &amp; Edit
              </button>
              <button
                type="button"
                onClick={handleFinalPublish}
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold bg-[#B89047] hover:bg-[#a17e38] text-white rounded-lg transition-all cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Publishing Event...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" />
                    <span>Confirm &amp; Publish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepGuestList;
