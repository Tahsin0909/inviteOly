"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedEventId } from "../../store/event.slice";
import { HostEventCard } from "./HostEventCard";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const HostEvent: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const hostEvents = useSelector(
        (state: RootState) => state.event.hostEvents
    );

    const handleViewEvent = (id: string) => {
        dispatch(setSelectedEventId(id));
        router.push(`/host/events/${id}`);
    };

    const handleEditDraft = (id: string) => {
        dispatch(setSelectedEventId(id));
        router.push(`/host/events/${id}`);
    };

    const handleUploadReceipt = () => {
        router.push("/host/payment-pending");
    };

    const handleCreateNewEvent = () => {
        toast.info("Create new event flow initiated");
    };

    return (
        <div className="w-full space-y-6 pb-12 font-work-sans">
            {/* Overview Header matching media_1789202843941.png */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-gray-900 tracking-tight">
                        Events Management
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500 font-work-sans">
                        Manage all your events, track their progress, and monitor every stage
                        from request to completion.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreateNewEvent}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#C39B4C] px-5 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-[#b08b3e] active:scale-[0.98] transition-all cursor-pointer font-work-sans shadow-2xs self-start sm:self-auto"
                >
                    <Plus className="h-4 w-4" />
                    <span>Create New Event</span>
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
    );
};

export default HostEvent;
