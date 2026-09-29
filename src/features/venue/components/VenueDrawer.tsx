"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeDrawer } from "../store/venue.slice";
import CreateVenue from "./CreateVenue";
import { X } from "lucide-react";

export const VenueDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { isDrawerOpen, drawerMode } = useSelector(
    (state: RootState) => state.venue
  );

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        dispatch(closeDrawer());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, dispatch]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-work-sans">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => dispatch(closeDrawer())}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white dark:bg-neutral-900 shadow-2xl border-l border-transparent dark:border-neutral-800 flex flex-col animate-in slide-in-from-right duration-300">
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
                {drawerMode === "create" ? "Add New Venue" : "Edit Venue"}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {drawerMode === "create"
                  ? "Configure venue info, rooms, and parking."
                  : "Update existing venue details and spaces."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => dispatch(closeDrawer())}
              className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Close drawer (Esc)"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Stepped Venue Form Content */}
          <div className="flex-1 overflow-hidden">
            <CreateVenue />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDrawer;

