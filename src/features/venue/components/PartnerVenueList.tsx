"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  openCreateDrawer,
  openEditDrawer,
  setSelectedVenue,
  setActiveView,
  deleteVenue,
} from "../store/venue.slice";
import { IVenue } from "../venue.interface";
import {
  Building2,
  Car,
  Edit3,
  Eye,
  MapPin,
  MoreVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export const PartnerVenueList: React.FC = () => {
  const dispatch = useDispatch();
  const { venues } = useSelector((state: RootState) => state.venue);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleViewDetails = (venue: IVenue) => {
    dispatch(setSelectedVenue(venue));
    dispatch(setActiveView("details"));
  };

  const handleEditVenue = (venue: IVenue) => {
    dispatch(openEditDrawer(venue));
    setActiveMenuId(null);
  };

  const handleDeleteVenue = (venue: IVenue) => {
    if (confirm(`Are you sure you want to delete "${venue.name}"?`)) {
      dispatch(deleteVenue(venue.id));
      toast.success(`Venue "${venue.name}" deleted`);
      setActiveMenuId(null);
    }
  };

  return (
    <div className="w-full space-y-6 font-work-sans pb-16">
      {/* ========================================================================= */}
      {/* 1. Header with Add Venue Button */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Venue Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-1">
            Manage venues, locations, and event spaces efficiently.
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(openCreateDrawer())}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.99] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          <span>Add Venue</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. Venue Cards Grid */}
      {/* ========================================================================= */}
      {venues.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900/80 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-12 text-center shadow-xs">
          <div className="size-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#C39B4C] flex items-center justify-center mx-auto mb-4">
            <Building2 className="size-6" />
          </div>
          <h3 className="text-base font-bold font-space-grotesk text-neutral-900 dark:text-white mb-1">
            No venues found
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mb-5">
            Get started by adding your first venue, configuring available
            spaces, and providing parking instructions.
          </p>
          <button
            type="button"
            onClick={() => dispatch(openCreateDrawer())}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Add Venue</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {venues.map((venue) => {
            const spacesCount = venue.spaces?.length || 0;
            const hasParking =
              venue.hasParking || !!venue.parkingInfo?.trim();

            return (
              <div
                key={venue.id}
                className="bg-white dark:bg-neutral-900/80 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between relative"
              >
                {/* Card Top Row */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-neutral-900 dark:text-white text-base sm:text-lg font-space-grotesk tracking-tight leading-snug">
                      {venue.name}
                    </h3>

                    {/* Three Dots Action Menu */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === venue.id ? null : venue.id
                          )
                        }
                        className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        title="Actions"
                      >
                        <MoreVertical className="size-4" />
                      </button>

                      {activeMenuId === venue.id && (
                        <>
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setActiveMenuId(null)}
                          />
                          <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200/80 dark:border-neutral-800 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150 text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                handleViewDetails(venue);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                            >
                              <Eye className="size-3.5 text-neutral-400 dark:text-neutral-500" />
                              <span>View Details</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEditVenue(venue)}
                              className="w-full px-3.5 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                            >
                              <Edit3 className="size-3.5 text-neutral-400 dark:text-neutral-500" />
                              <span>Edit Venue</span>
                            </button>
                            <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />
                            <button
                              type="button"
                              onClick={() => handleDeleteVenue(venue)}
                              className="w-full px-3.5 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="size-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mb-3 font-work-sans">
                    <MapPin className="size-4 text-neutral-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">
                      {venue.streetAddress}, {venue.city}, {venue.state}
                      {venue.zipCode ? ` ${venue.zipCode}` : ""}
                    </span>
                  </div>

                  {/* Key Highlights (Spaces count & Parking) */}
                  <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm mb-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="size-4 text-neutral-400 dark:text-neutral-500" />
                      <span>
                        {spacesCount} {spacesCount === 1 ? "Space" : "Spaces"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Car className="size-4 text-neutral-400 dark:text-neutral-500" />
                      <span>
                        {hasParking ? "Parking Available" : "No Parking"}
                      </span>
                    </div>
                  </div>

                  {/* Space Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {venue.spaces && venue.spaces.length > 0 ? (
                      venue.spaces.map((space, idx) => (
                        <span
                          key={space.id || idx}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-neutral-100/90 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/60"
                        >
                          {space.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 italic">
                        No spaces listed
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Separator & Actions */}
                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleViewDetails(venue)}
                    className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEditVenue(venue)}
                    className="text-xs sm:text-sm font-semibold text-[#C39B4C] hover:text-[#B38A3B] transition-colors cursor-pointer"
                  >
                    Edit Venue
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PartnerVenueList;