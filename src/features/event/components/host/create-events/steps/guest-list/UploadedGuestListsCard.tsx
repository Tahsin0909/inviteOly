"use client";

import React, { useState } from "react";
import { IUploadedGuestList, IGuestManualEntry } from "@/features/event/event.interface";
import { Check, Trash2, ChevronDown } from "lucide-react";
import { TICKET_TYPES } from "./SelectTicketTypeCard";

interface UploadedGuestListsCardProps {
  guestLists: IUploadedGuestList[];
  onDeleteList: (id: string) => void;
  onAddManualGuest: (entry: IGuestManualEntry) => void;
}

export const UploadedGuestListsCard: React.FC<UploadedGuestListsCardProps> = ({
  guestLists,
  onDeleteList,
  onAddManualGuest,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>("2"); // Default to Child (id "2") to match mockup

  // Form states
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [table, setTable] = useState("");
  const [formError, setFormError] = useState("");

  const getInitialBadgeColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("adult")) return "bg-[#0FA958]";
    if (t.includes("child")) return "bg-[#10B981]";
    if (t.includes("vip")) return "bg-[#B89047]";
    if (t.includes("staff")) return "bg-[#0284C7]";
    if (t.includes("vendor")) return "bg-[#F59E0B]";
    return "bg-[#8B5CF6]";
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!guestName.trim()) {
      setFormError("Please enter the guest's name.");
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes("@")) {
      setFormError("Please enter a valid guest email address.");
      return;
    }
    if (!ticketType) {
      setFormError("Please select a ticket type.");
      return;
    }

    onAddManualGuest({
      name: guestName.trim(),
      email: guestEmail.trim(),
      ticketType,
      table: table.trim() || undefined,
    });

    // Reset form fields
    setGuestName("");
    setGuestEmail("");
    setTicketType("");
    setTable("");
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-5 sm:p-6 shadow-2xs font-work-sans space-y-4">
      {/* Card Header */}
      <h3 className="text-sm sm:text-base font-semibold font-space-grotesk text-neutral-900 dark:text-white">
        Uploaded Guest Lists
      </h3>

      {/* Guest Lists Items */}
      <div className="space-y-1.5">
        {guestLists.map((item) => {
          const isHighlighted = hoveredId === item.id;
          const initial = item.ticketType.charAt(0).toUpperCase();
          const badgeBg = getInitialBadgeColor(item.ticketType);

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              className={`flex items-center justify-between p-2.5 sm:px-3.5 rounded-xl transition-all ${isHighlighted
                ? "bg-neutral-100/90 dark:bg-neutral-800/90 shadow-2xs"
                : "bg-white dark:bg-neutral-900/40 hover:bg-neutral-50/70 dark:hover:bg-neutral-800/50"
                }`}
            >
              {/* Left: Avatar initial + Name + Guest count */}
              <div className="flex items-center gap-3">
                <div
                  className={`size-7 sm:size-8 rounded-full ${badgeBg} text-white font-bold text-xs flex items-center justify-center shadow-2xs shrink-0 font-space-grotesk`}
                >
                  {initial}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
                    {item.ticketType}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {item.guestsCount} guests
                  </p>
                </div>
              </div>

              {/* Right: Trash delete button when highlighted, or Green checkmark */}
              <div>
                {isHighlighted ? (
                  <button
                    type="button"
                    title={`Delete ${item.ticketType} list`}
                    onClick={() => onDeleteList(item.id)}
                    className="size-7 sm:size-8 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-950/40 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Trash2 className="size-4 stroke-[2]" />
                  </button>
                ) : (
                  <div className="size-5 sm:size-6 rounded-full bg-[#0FA958] text-white flex items-center justify-center shadow-2xs">
                    <Check className="size-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {guestLists.length === 0 && (
          <div className="py-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
            No guest lists uploaded yet. Select a ticket type and upload a CSV file.
          </div>
        )}
      </div>

      {/* Add Guest link / toggle */}
      {!showAddForm ? (
        <div className="pt-2 text-center sm:text-right">
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="text-xs sm:text-sm font-semibold text-[#B89047] hover:text-[#9c7733] dark:hover:text-[#d4ab59] hover:underline transition-all cursor-pointer inline-block"
          >
            Add Guest
          </button>
        </div>
      ) : (
        /* Manual Guest Entry Form matching image 2 */
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleManualSubmit} className="space-y-3">
            {/* Guest Name */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Guest Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g,Marcus Thorne"
                className="w-full text-xs sm:text-sm px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/30 transition-all placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
              />
            </div>

            {/* Guest Email */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Guest Email
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full text-xs sm:text-sm px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/30 transition-all placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
              />
            </div>

            {/* Ticket Type */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Ticket Type
              </label>
              <div className="relative">
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/30 transition-all appearance-none bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-200 cursor-pointer"
                >
                  <option value="" disabled className="dark:bg-neutral-900">
                    Select Ticket Type
                  </option>
                  {TICKET_TYPES.map((t) => (
                    <option key={t} value={t} className="dark:bg-neutral-900">
                      {t}
                    </option>
                  ))}
                  <option value="Staff" className="dark:bg-neutral-900">Staff</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
              </div>
            </div>

            {/* Table */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Table
              </label>
              <input
                type="text"
                value={table}
                onChange={(e) => setTable(e.target.value)}
                placeholder="e.g,A1"
                className="w-full text-xs sm:text-sm px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/30 transition-all placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
              />
            </div>

            {/* Form Error */}
            {formError && (
              <p className="text-red-500 dark:text-red-400 text-[11px]">{formError}</p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setFormError("");
                }}
                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs sm:text-sm font-semibold bg-[#B89047] hover:bg-[#a17e38] text-white rounded-lg transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadedGuestListsCard;

