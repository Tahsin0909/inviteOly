"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveView } from "../store/hostandpartner.slice";
import { Calendar, Plus, User } from "lucide-react";

export const HostInviteList: React.FC = () => {
  const dispatch = useDispatch();
  const { invites } = useSelector((state: RootState) => state.hostandpartner);

  return (
    <div className="w-full space-y-6 font-work-sans pb-16">
      {/* ========================================================================= */}
      {/* 1. Header with Invite a Host Button */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Invite a Host
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-1 max-w-2xl leading-relaxed">
            Submit a new event request by providing the event details. Once
            approved, you&apos;ll be able to manage tickets, guests, and live
            event activities from your dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(setActiveView("invite-form"))}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.99] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          <span>Invite a Host</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. Invitations Grid */}
      {/* ========================================================================= */}
      {invites.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900/80 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-12 text-center shadow-xs">
          <div className="size-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#C39B4C] flex items-center justify-center mx-auto mb-4">
            <User className="size-6" />
          </div>
          <h3 className="text-base font-bold font-space-grotesk text-neutral-900 dark:text-white mb-1">
            No host invitations yet
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mb-5">
            Get started by inviting a host, specifying event details,
            and sending them an invitation.
          </p>
          <button
            type="button"
            onClick={() => dispatch(setActiveView("invite-form"))}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Invite a Host</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {invites.map((invite) => (
            <div
              key={invite.id}
              className="bg-white dark:bg-neutral-900/80 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Status Badge */}
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FEF3C7] dark:bg-amber-950/50 text-[#D97706] dark:text-amber-400">
                    {invite.status || "Pending Confirmation"}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-bold text-neutral-900 dark:text-white text-lg font-space-grotesk tracking-tight mb-4">
                  {invite.eventName}
                </h3>

                <div className="border-t border-neutral-100 dark:border-neutral-800 my-4" />

                {/* Event Date Row */}
                <div className="flex items-center text-xs text-neutral-600 dark:text-neutral-300 font-medium font-work-sans mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
                    <span>{invite.eventDate}</span>
                  </div>
                </div>

                {/* Host Row */}
                <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-200 font-medium font-work-sans">
                  <User className="size-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
                  <span>{invite.hostName}</span>
                </div>
              </div>

              {/* Total Guest Section */}
              <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium font-work-sans">
                  Total Guest
                </span>
                <p className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white mt-0.5">
                  {invite.totalGuest || 230}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostInviteList;

