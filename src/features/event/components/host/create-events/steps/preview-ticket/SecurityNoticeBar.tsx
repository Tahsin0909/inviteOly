"use client";

import React from "react";
import {
  ShieldCheck,
  Smartphone,
  Lock,
  IdCard,
  DoorOpen,
} from "lucide-react";

export const SecurityNoticeBar: React.FC = () => {
  return (
    <div className="bg-[#FCFCFA] dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-3.5 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 font-work-sans">
      <div className="flex flex-col items-center gap-1.5 px-1">
        <ShieldCheck className="size-4 text-neutral-900 dark:text-neutral-200" />
        <span className="leading-snug">QR codes can only be scanned once</span>
      </div>

      <div className="flex flex-col items-center gap-1.5 px-1 border-l border-neutral-200/60 dark:border-neutral-800 sm:border-l-0">
        <Smartphone className="size-4 text-neutral-900 dark:text-neutral-200" />
        <span className="leading-snug">Save to Apple Wallet or Google Wallet</span>
      </div>

      <div className="flex flex-col items-center gap-1.5 px-1 col-span-2 sm:col-span-1 border-t sm:border-t-0 border-neutral-200/60 dark:border-neutral-800 pt-2 sm:pt-0">
        <Lock className="size-4 text-neutral-900 dark:text-neutral-200" />
        <span className="leading-snug">Do not share your QR code</span>
      </div>

      <div className="flex flex-col items-center gap-1.5 px-1 border-t sm:border-t-0 border-neutral-200/60 dark:border-neutral-800 pt-2 sm:pt-0">
        <IdCard className="size-4 text-neutral-900 dark:text-neutral-200" />
        <span className="leading-snug">Government ID may be required</span>
      </div>

      <div className="flex flex-col items-center gap-1.5 px-1 border-t sm:border-t-0 border-neutral-200/60 dark:border-neutral-800 pt-2 sm:pt-0">
        <DoorOpen className="size-4 text-neutral-900 dark:text-neutral-200" />
        <span className="leading-snug">Entry subject to organizer approval</span>
      </div>
    </div>
  );
};

export default SecurityNoticeBar;

