"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setIsAddGuestModalOpen,
  addGuest,
} from "../../store/event.slice";
import { X } from "lucide-react";
import { toast } from "sonner";

export const AddGuestModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.event.isAddGuestModalOpen
  );

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [table, setTable] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(setIsAddGuestModalOpen(false));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error("Please enter a guest name");
      return;
    }

    dispatch(
      addGuest({
        guestName,
        guestEmail,
        ticketType: ticketType || "General Admission",
        table: table || "A1",
      })
    );

    toast.success(`Guest "${guestName}" added successfully!`);
    setGuestName("");
    setGuestEmail("");
    setTicketType("");
    setTable("");
    dispatch(setIsAddGuestModalOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-7">
        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Guest Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5 font-work-sans">
              Guest Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g.Marcus Thorne"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C39B4C] focus:outline-none focus:ring-1 focus:ring-[#C39B4C] transition-all font-work-sans"
            />
          </div>

          {/* Guest Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5 font-work-sans">
              Guest Email
            </label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C39B4C] focus:outline-none focus:ring-1 focus:ring-[#C39B4C] transition-all font-work-sans"
            />
          </div>

          {/* Ticket Type */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5 font-work-sans">
              Ticket Type
            </label>
            <div className="relative">
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C39B4C] focus:outline-none focus:ring-1 focus:ring-[#C39B4C] transition-all font-work-sans"
              >
                <option value="" disabled>
                  Select Ticket Type
                </option>
                <option value="General Admission">General Admission</option>
                <option value="VIP">VIP</option>
                <option value="Staff">Staff</option>
                <option value="Vendor">Vendor</option>
                <option value="Child">Child</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Table */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5 font-work-sans">
              Table
            </label>
            <input
              type="text"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              placeholder="e.g.A1"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C39B4C] focus:outline-none focus:ring-1 focus:ring-[#C39B4C] transition-all font-work-sans"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-lg bg-[#C39B4C] px-8 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-[#b08b3e] focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/50 transition-all font-work-sans cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
