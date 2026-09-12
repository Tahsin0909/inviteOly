"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
    setViewMode,
    setSelectedEventId,
} from "../../store/event.slice";
import { HostEventCard } from "./HostEventCard";
import { HostEventDetailsView } from "./HostEventDetailsView";
import { AddGuestModal } from "./AddGuestModal";
import { ScannerCodeModal } from "./ScannerCodeModal";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const HostEvent: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { hostEvents, viewMode, selectedEventId } = useSelector(
        (state: RootState) => state.event
    );

    const handleViewEvent = (id: string) => {
        dispatch(setSelectedEventId(id));
        dispatch(setViewMode("details"));
    };

    const handleEditDraft = (id: string) => {
        dispatch(setSelectedEventId(id));
        dispatch(setViewMode("details"));
        toast.info("Opened draft event for editing");
    };

    const handleUploadReceipt = () => {
        router.push("/host/payment-pending");
    };

    const handleCreateNewEvent = () => {
        toast.info("Create new event flow initiated");
    };

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Top Event Selector Bar for Easy Navigation between mock variations */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200/80 bg-white px-4 py-2.5 text-xs text-gray-600 shadow-2xs font-work-sans">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">Current View:</span>
                    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
                        <button
                            type="button"
                            onClick={() => dispatch(setViewMode("list"))}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${viewMode === "list"
                                    ? "bg-white text-gray-900 shadow-xs"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Overview Grid
                        </button>
                        <button
                            type="button"
                            onClick={() => dispatch(setViewMode("details"))}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${viewMode === "details"
                                    ? "bg-white text-gray-900 shadow-xs"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Event Details
                        </button>
                    </div>
                </div>

                {viewMode === "details" && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">Preview Variant:</span>
                        <select
                            value={selectedEventId}
                            onChange={(e) => dispatch(setSelectedEventId(e.target.value))}
                            className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-800 focus:border-[#C39B4C] focus:outline-none"
                        >
                            <option value="host-evt-1">
                                Summer Gala 2026 (Premium Active)
                            </option>
                            <option value="host-evt-2">
                                Tech Summit 2026 (Scheduled)
                            </option>
                            <option value="host-evt-3">
                                Summer Gala 2026 (Standard Active)
                            </option>
                        </select>
                    </div>
                )}
            </div>

            {viewMode === "list" ? (
                <div className="space-y-6">
                    {/* Overview Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                                Events Management
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 font-work-sans">
                                Manage all your events, track their progress, and monitor every
                                stage from request to completion.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleCreateNewEvent}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#C39B4C] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#b08b3e] transition-colors cursor-pointer font-work-sans shadow-2xs self-start sm:self-auto"
                        >
                            <Plus className="h-4 w-4" />
                            Create New Event
                        </button>
                    </div>

                    {/* Event Cards Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {hostEvents.map((event) => (
                            <HostEventCard
                                key={event.id}
                                event={event}
                                onViewEvent={handleViewEvent}
                                onEdit={handleEditDraft}
                                onUploadReceipt={handleUploadReceipt}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <HostEventDetailsView />
            )}

            {/* Modals */}
            <AddGuestModal />
            <ScannerCodeModal />
        </div>
    );
};
