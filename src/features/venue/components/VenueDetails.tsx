"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveView, openEditDrawer } from "../store/venue.slice";
import { ArrowLeft, Edit3, MapPin } from "lucide-react";

export const VenueDetails: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedVenue } = useSelector((state: RootState) => state.venue);

    if (!selectedVenue) {
        return (
            <div className="p-8 text-center font-work-sans">
                <p className="text-neutral-500 mb-4">No venue selected.</p>
                <button
                    type="button"
                    onClick={() => dispatch(setActiveView("list"))}
                    className="px-4 py-2 bg-[#C39B4C] text-white rounded-lg text-sm font-medium"
                >
                    Return to Venue List
                </button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 font-work-sans pb-16">
            {/* ========================================================================= */}
            {/* 1. Header with Back Button and Edit Button */}
            {/* ========================================================================= */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => dispatch(setActiveView("list"))}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-medium rounded-lg shadow-2xs transition-all cursor-pointer"
                >
                    <ArrowLeft className="size-4" />
                    <span>Back</span>
                </button>

                <button
                    type="button"
                    onClick={() => dispatch(openEditDrawer(selectedVenue))}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs sm:text-sm font-medium rounded-lg shadow-2xs transition-all cursor-pointer"
                >
                    <Edit3 className="size-4" />
                    <span>Edit</span>
                </button>
            </div>

            {/* Venue Title */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                    {selectedVenue.name}
                </h1>
            </div>

            {/* ========================================================================= */}
            {/* 2. Details Two-Column Grid */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Column (Address & Parking) */}
                <div className="lg:col-span-4 space-y-5">
                    {/* Venue Address Card */}
                    <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-2xs">
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-4">
                            VENUE ADDRESS
                        </h3>

                        <div className="flex items-start gap-3">
                            <MapPin className="size-5 text-[#C39B4C] shrink-0 mt-0.5" />
                            <div className="text-xs sm:text-sm text-neutral-700 font-work-sans leading-relaxed">
                                <p className="font-medium text-neutral-900">
                                    {selectedVenue.streetAddress}
                                </p>
                                <p className="text-neutral-500">
                                    {selectedVenue.city}, {selectedVenue.state}{" "}
                                    {selectedVenue.zipCode}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Parking Information Card */}
                    <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-2xs">
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3">
                            PARKING INFORMATION
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-600 font-work-sans leading-relaxed">
                            {selectedVenue.parkingInfo?.trim()
                                ? selectedVenue.parkingInfo
                                : "No parking information provided for this venue."}
                        </p>
                    </div>
                </div>

                {/* Right Column (Available Spaces) */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl border border-neutral-100 p-6 sm:p-7 shadow-2xs h-full flex flex-col">
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-6">
                            AVAILABLE SPACES
                        </h3>

                        {selectedVenue.spaces && selectedVenue.spaces.length > 0 ? (
                            <div className="divide-y divide-neutral-100 flex-1">
                                {selectedVenue.spaces.map((space, idx) => (
                                    <div
                                        key={space.id || idx}
                                        className="py-4 first:pt-0 last:pb-0 flex items-center justify-between"
                                    >
                                        <div>
                                            <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                                                {space.name}
                                            </h4>
                                            <p className="text-xs text-neutral-400 mt-0.5">
                                                Available Space
                                            </p>
                                        </div>

                                        {space.capacity && (
                                            <span className="px-3 py-1 rounded-full bg-amber-50 text-[#C39B4C] border border-amber-200/60 text-xs font-medium">
                                                Capacity: {space.capacity}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center text-neutral-400 text-xs sm:text-sm">
                                No spaces have been configured for this venue yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueDetails;