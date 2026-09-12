"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setIsScannerModalOpen } from "../../store/event.slice";
import { X, Copy, Check, QrCode, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const ScannerCodeModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.event.isScannerModalOpen
  );
  const selectedEventId = useSelector(
    (state: RootState) => state.event.selectedEventId
  );
  const hostEvents = useSelector(
    (state: RootState) => state.event.hostEvents
  );
  const currentEvent = hostEvents.find((e) => e.id === selectedEventId) || hostEvents[0];

  const [copied, setCopied] = useState(false);
  const [currentCode, setCurrentCode] = useState(
    currentEvent?.scannerCode || "SCAN-8821-X9"
  );

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(setIsScannerModalOpen(false));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      toast.success("Scanner code copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info(`Scanner Code: ${currentCode}`);
    }
  };

  const handleRegenerate = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCode = `SCAN-${randomSuffix}-X9`;
    setCurrentCode(newCode);
    toast.success("New scanner login code generated!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-7">
        {/* Close button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF9EE] text-[#C39B4C]">
            <QrCode className="h-7 w-7" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 font-space-grotesk">
            Scanner App Login Code
          </h3>
          <p className="mt-1 text-sm text-gray-500 font-work-sans">
            Use this secure code on the mobile Scanner App to authorize check-in staff for{" "}
            <span className="font-semibold text-gray-800">
              {currentEvent?.title || "Summer Gala 2026"}
            </span>
            .
          </p>

          {/* Code Box */}
          <div className="mt-6 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3">
            <span className="font-mono text-lg font-bold tracking-wider text-gray-800">
              {currentCode}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRegenerate}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors cursor-pointer"
                title="Regenerate code"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-[#C39B4C] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#b08b3e] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 w-full text-left rounded-xl bg-amber-50/60 p-3.5 border border-amber-200/60">
            <h4 className="text-xs font-semibold text-amber-900 font-space-grotesk">
              Attendant Instructions:
            </h4>
            <ul className="mt-1.5 list-disc pl-4 text-xs text-amber-800/90 space-y-1 font-work-sans">
              <li>Open the InviteOnly Ticket Scanner App on your device.</li>
              <li>Enter or scan this login code to activate ticket verification.</li>
              <li>Ticket scans will immediately update this live dashboard.</li>
            </ul>
          </div>

          <div className="mt-6 w-full">
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-work-sans"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
