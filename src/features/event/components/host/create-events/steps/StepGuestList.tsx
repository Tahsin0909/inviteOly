"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setCurrentStep,
  addUploadedGuestList,
  removeUploadedGuestList,
  addManualGuest,
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

export const StepGuestList: React.FC = () => {
  const dispatch = useDispatch();

  const rawUploadedLists = useSelector(
    (state: RootState) => state.createEvent?.uploadedGuestLists
  );

  const guestLists = rawUploadedLists || defaultUploadedGuestLists;

  // Local state for Step 1 selection
  const [selectedTicketType, setSelectedTicketType] = useState<string>("Adult");

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
    // Advance to Step 6 (Preview)
    dispatch(setCurrentStep(6));
  };

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
      />
    </div>
  );
};

export default StepGuestList;
