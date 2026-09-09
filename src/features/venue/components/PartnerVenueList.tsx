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
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
            Venue Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
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
        <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center shadow-xs">
          <div className="size-12 rounded-full bg-amber-50 text-[#C39B4C] flex items-center justify-center mx-auto mb-4">
            <Building2 className="size-6" />
          </div>
          <h3 className="text-base font-bold font-space-grotesk text-neutral-900 mb-1">
            No venues found
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mb-5">
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
                className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between relative"
              >
                {/* Card Top Row */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-neutral-900 text-base sm:text-lg font-space-grotesk tracking-tight leading-snug">
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
                        className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
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
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-neutral-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150 text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                handleViewDetails(venue);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                            >
                              <Eye className="size-3.5 text-neutral-400" />
                              <span>View Details</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEditVenue(venue)}
                              className="w-full px-3.5 py-2 text-left text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                            >
                              <Edit3 className="size-3.5 text-neutral-400" />
                              <span>Edit Venue</span>
                            </button>
                            <div className="h-px bg-neutral-100 my-1" />
                            <button
                              type="button"
                              onClick={() => handleDeleteVenue(venue)}
                              className="w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
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
                  <div className="flex items-start gap-2 text-neutral-500 text-xs sm:text-sm mb-3 font-work-sans">
                    <MapPin className="size-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">
                      {venue.streetAddress}, {venue.city}, {venue.state}{" "}
                      {venue.zipCode}
                    </span>
                  </div>

                  {/* Key Highlights (Spaces count & Parking) */}
                  <div className="flex items-center gap-4 text-neutral-600 text-xs sm:text-sm mb-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="size-4 text-neutral-400" />
                      <span>
                        {spacesCount} {spacesCount === 1 ? "Space" : "Spaces"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Car className="size-4 text-neutral-400" />
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
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-neutral-100/90 text-neutral-600 border border-neutral-200/50"
                        >
                          {space.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-neutral-400 italic">
                        No spaces listed
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Separator & Actions */}
                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleViewDetails(venue)}
                    className="text-xs sm:text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
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