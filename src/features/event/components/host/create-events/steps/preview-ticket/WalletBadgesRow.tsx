"use client";

import React from "react";
import { CheckCircle2, Calendar } from "lucide-react";

export const WalletBadgesRow: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs font-work-sans">
      {/* 1. Apple Wallet Badge */}
      <div className="bg-black text-white px-3 py-2 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:bg-neutral-900 transition-colors">
        {/* Apple Logo SVG */}
        <svg
          viewBox="0 0 170 170"
          className="size-4 fill-current shrink-0"
          aria-hidden="true"
        >
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.85-11.75-14.44-6.52-10.45-11.64-21.98-15.34-34.58-3.7-12.61-5.56-24.59-5.56-35.95 0-14.79 3.8-27.13 11.41-37.03 7.6-9.89 17.15-14.93 28.63-15.11 4.57 0 9.78 1.25 15.63 3.75 5.84 2.5 9.7 3.81 11.57 3.93 1.48 0 5.62-1.39 12.43-4.17 6.81-2.77 12.6-3.99 17.38-3.65 13.27.65 24.08 5.62 32.42 14.9-11.53 6.96-17.19 16.48-17 28.56.2 9.47 3.76 17.43 10.68 23.88 6.93 6.45 15.08 10.15 24.47 11.11-2.07 6.31-4.66 13.06-7.78 20.24zM119.22 33.02c0-7.4 2.65-14.32 7.94-20.76 5.3-6.44 11.75-10.63 19.37-12.56.22 1.3.33 2.5.33 3.6 0 7.29-2.72 14.33-8.16 21.12-5.44 6.78-11.94 10.79-19.48 12.02v-3.42z" />
        </svg>
        <div className="text-left leading-tight">
          <span className="text-[8px] text-neutral-400 block font-normal">
            Add to
          </span>
          <span className="text-[11px] font-semibold">Apple Wallet</span>
        </div>
      </div>

      {/* 2. Google Wallet Badge */}
      <div className="bg-[#0B1A30] text-white px-3 py-2 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:bg-[#112340] transition-colors">
        {/* Google Wallet Icon */}
        <div className="size-4 rounded-xs bg-white/10 flex items-center justify-center">
          <span className="text-[10px] font-bold text-[#4285F4]">G</span>
        </div>
        <div className="text-left leading-tight">
          <span className="text-[8px] text-neutral-400 block font-normal">
            Add to
          </span>
          <span className="text-[11px] font-semibold">Google Wallet</span>
        </div>
      </div>

      {/* 3. Ticket Status: Active */}
      <div className="bg-[#EAF7EE] text-[#16A34A] border border-[#16A34A]/25 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 font-semibold text-[11px]">
        <CheckCircle2 className="size-4 shrink-0" />
        <span className="leading-tight">
          <span className="text-[8px] block opacity-80 uppercase">
            TICKET STATUS
          </span>
          ACTIVE
        </span>
      </div>

      {/* 4. Event Status Countdown */}
      <div className="bg-[#EEF2F6] text-neutral-700 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-semibold">
        <Calendar className="size-4 text-neutral-500 shrink-0" />
        <span className="leading-tight">
          <span className="text-[8px] text-neutral-400 block uppercase">
            EVENT STATUS IN
          </span>
          03 : 12 : 45 <span className="text-[8px] text-neutral-400">DAYS</span>
        </span>
      </div>
    </div>
  );
};

export default WalletBadgesRow;

