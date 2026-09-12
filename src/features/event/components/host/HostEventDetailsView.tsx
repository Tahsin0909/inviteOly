"use client";

import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setActiveFilter,
  setSearchQuery,
  setIsAddGuestModalOpen,
  setIsScannerModalOpen,
  sendReminderToTicket,
} from "../../store/event.slice";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Ticket,
  Search,
  Download,
  UserPlus,
  RefreshCw,
  ChevronDown,
  Filter as FilterIcon,
  Send as SendIcon,
  ArrowLeft,
  Pencil,
  Lock,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getTicketsForEvent } from "../../data/hostEvent.data";
import { AddGuestModal } from "./AddGuestModal";
import { ScannerCodeModal } from "./ScannerCodeModal";

interface HostEventDetailsViewProps {
  eventId?: string;
}

export const HostEventDetailsView: React.FC<HostEventDetailsViewProps> = ({
  eventId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    hostEvents,
    selectedEventId,
    tickets,
    activeFilter,
    searchQuery,
  } = useSelector((state: RootState) => state.event);

  const [currentPage, setCurrentPage] = useState(2);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeId = eventId || selectedEventId || "host-evt-1";
  const event =
    hostEvents.find((e) => e.id === activeId) || hostEvents[0];

  // Load event-specific mock tickets based on current event ID
  const eventSpecificTickets = useMemo(() => {
    return getTicketsForEvent(event.id);
  }, [event.id]);

  // Combine with any user-added guests from Redux store
  const effectiveTickets = useMemo(() => {
    const newlyAdded = tickets.filter(
      (t) => !eventSpecificTickets.some((et) => et.id === t.id)
    );
    return [...newlyAdded, ...eventSpecificTickets];
  }, [tickets, eventSpecificTickets]);

  // Dynamic filter tab counts
  const counts = useMemo(() => {
    return {
      all: effectiveTickets.length > 0 ? 400 : 0,
      editable:
        effectiveTickets.filter((t) => t.status === "Editable").length || 175,
      locked:
        effectiveTickets.filter((t) => t.status === "Locked/ Ready").length ||
        100,
      sent: effectiveTickets.filter((t) => t.status === "Sent").length || 125,
      voided: 10,
    };
  }, [effectiveTickets]);

  // Filter tickets by active tab and search query
  const filteredTickets = useMemo(() => {
    return effectiveTickets.filter((ticket) => {
      // Tab filter
      if (activeFilter === "editable" && ticket.status !== "Editable") {
        return false;
      }
      if (activeFilter === "locked" && ticket.status !== "Locked/ Ready") {
        return false;
      }
      if (
        (activeFilter === "send" || activeFilter === "sent") &&
        ticket.status !== "Sent"
      ) {
        return false;
      }
      if (activeFilter === "voided" && ticket.status !== "Voided") {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ticket.guestName.toLowerCase().includes(q);
        const matchesId = ticket.ticketId.toLowerCase().includes(q);
        const matchesTable = ticket.table.toLowerCase().includes(q);
        const matchesType = ticket.ticketType.toLowerCase().includes(q);
        return matchesName || matchesId || matchesTable || matchesType;
      }

      return true;
    });
  }, [effectiveTickets, activeFilter, searchQuery]);


  const handleCopyLink = async (ticketId: string) => {
    try {
      const dummyLink = `https://inviteonly.app/tickets/t-${ticketId.replace(/\s+/g, "").toLowerCase()}`;
      await navigator.clipboard.writeText(dummyLink);
      setCopiedId(ticketId);
      toast.success("Ticket link copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      toast.info("Copied ticket link");
    }
  };

  const handleSendReminder = (ticketId: string, guestName: string) => {
    dispatch(sendReminderToTicket(ticketId));
    toast.success(`Reminder sent to ${guestName !== "--" ? guestName : "guest"}!`);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Ticket,Guest Name,Table,RSVP Status,Ticket Type,Check-in Time,Status"]
        .concat(
          tickets.map(
            (t) =>
              `"${t.ticketId}","${t.guestName}","${t.table}","${t.rsvpStatus}","${t.ticketType}","${t.checkInTime || "--"}","${t.status}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `attendees-${event.title.toLowerCase().replace(/\s+/g, "-")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Guest ticket list exported as CSV!");
  };

  const handleBulkSend = () => {
    toast.success("Invites sent to all unsent ticket holders!");
  };

  // Determine layout mode based on event tier and status
  const isScheduled = event.status === "Scheduled";
  const isStandard = event.tier === "Standard" && !isScheduled;
  const isPremium = !isScheduled && !isStandard;

  return (
    <div className="space-y-6">
      {/* Top Header Row with Back Button, Title, Search, Export, Add Guests */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push("/host/events")}
            className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#C39B4C] transition-colors cursor-pointer font-work-sans"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Events
          </button>
          <h1 className="text-2xl font-bold text-gray-900 font-space-grotesk tracking-tight">
            Events Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 font-work-sans">
            Manage and monitor live access for your upcoming scheduled events.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search guest name, email or phone..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C39B4C] focus:outline-none focus:ring-1 focus:ring-[#C39B4C] transition-all font-work-sans"
            />
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-work-sans shadow-2xs"
          >
            <Download className="h-4 w-4 text-gray-500" />
            Export
          </button>

          {/* Add Guests Button */}
          <button
            type="button"
            onClick={() => dispatch(setIsAddGuestModalOpen(true))}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#C39B4C] px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#b08b3e] transition-colors cursor-pointer font-work-sans shadow-2xs"
          >
            <UserPlus className="h-4 w-4" />
            Add Guests
          </button>
        </div>
      </div>

      {/* Event Details Card (Banner) */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left info */}
          <div className="space-y-3">
            {/* Badges */}
            <div className="flex items-center gap-2">
              {event.tier && (
                <span
                  className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium font-work-sans ${event.tier === "Premium"
                    ? "bg-[#FFF9EE] text-[#B58500] border border-[#FDE68A]/60"
                    : "bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]/50"
                    }`}
                >
                  {event.tier}
                </span>
              )}
              <span
                className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium font-work-sans ${event.status === "Active"
                  ? "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]/50"
                  : "bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]/50"
                  }`}
              >
                {event.status}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 font-space-grotesk">
              {event.title}
            </h2>

            {/* Event Meta Row 1 */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-500 font-work-sans">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Ticket className="h-3.5 w-3.5 text-gray-400" />
                <span>{event.eventType}</span>
              </div>
            </div>

            {/* Event Meta Row 2 */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-600 font-work-sans">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-gray-400" />
                <span>{event.hostName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                <span>{event.hostEmail}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-gray-400" />
                <span>{event.hostPhone}</span>
              </div>
            </div>
          </div>

          {/* Middle: Scanner App Login Code */}
          <div className="flex flex-col justify-center border-t border-gray-100 pt-4 lg:border-t-0 lg:border-l lg:border-gray-100 lg:pl-8 lg:pt-0">
            <span className="text-xs font-medium text-gray-700 font-work-sans">
              Scanner App Login Code :
            </span>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => dispatch(setIsScannerModalOpen(true))}
                className="text-sm font-semibold text-[#C39B4C] hover:underline cursor-pointer font-work-sans"
              >
                View code
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch(setIsScannerModalOpen(true));
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                title="View scanner code"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Stats & Progress Bar */}
          <div className="flex flex-col justify-center border-t border-gray-100 pt-4 lg:border-t-0 lg:border-l lg:border-gray-100 lg:pl-8 lg:pt-0 min-w-[260px]">
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-xs text-gray-500 font-work-sans">
                  {isStandard ? "Total Guests" : "Total Guest"}
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900 font-space-grotesk">
                  {event.totalGuests}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-work-sans">
                  {isStandard ? "Checked In" : "Check in"}
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900 font-space-grotesk">
                  {event.checkedIn}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-work-sans">
                  Remaining
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900 font-space-grotesk">
                  {event.remaining}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#12B76A] transition-all duration-500"
                  style={{ width: "74.1%" }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-500 font-space-grotesk min-w-[36px] text-right">
                74.1%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Filter Pills & Bulk Action Buttons Row */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Left Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* All ticket */}
          <button
            type="button"
            onClick={() => dispatch(setActiveFilter("all"))}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer font-work-sans ${activeFilter === "all"
              ? "border border-gray-300 bg-gray-100 text-gray-900 font-semibold"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            All ticket {counts.all}
          </button>

          {/* Editable (shown in Premium and Standard) */}
          {!isScheduled && (
            <button
              type="button"
              onClick={() => dispatch(setActiveFilter("editable"))}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer font-work-sans border ${activeFilter === "editable"
                ? "border-blue-500 bg-blue-100 text-blue-700 font-semibold"
                : "border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50"
                }`}
            >
              Editable {counts.editable}
            </button>
          )}

          {/* Locked/ Ready */}
          <button
            type="button"
            onClick={() => dispatch(setActiveFilter("locked"))}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer font-work-sans border ${activeFilter === "locked"
              ? "border-orange-500 bg-orange-100 text-orange-700 font-semibold"
              : "border-orange-200 bg-orange-50/50 text-orange-600 hover:bg-orange-50"
              }`}
          >
            Locked/ Ready {counts.locked}
          </button>

          {/* Send */}
          <button
            type="button"
            onClick={() => dispatch(setActiveFilter("send"))}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer font-work-sans border ${activeFilter === "send"
              ? "border-emerald-500 bg-emerald-100 text-emerald-700 font-semibold"
              : "border-emerald-200 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-50"
              }`}
          >
            Send {counts.sent}
          </button>

          {/* Voided (Premium active) */}
          {isPremium && (
            <button
              type="button"
              onClick={() => dispatch(setActiveFilter("voided"))}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer font-work-sans border ${activeFilter === "voided"
                ? "border-gray-400 bg-gray-200 text-gray-800 font-semibold"
                : "border-gray-200 bg-gray-50/50 text-gray-500 hover:bg-gray-100"
                }`}
            >
              Voided {counts.voided}
            </button>
          )}

          {/* RSVP Deadline */}
          {!isStandard && (
            <button
              type="button"
              onClick={() => dispatch(setActiveFilter("rsvp"))}
              className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer font-work-sans border ${activeFilter === "rsvp"
                ? "border-amber-500 bg-amber-100 text-amber-900 font-semibold"
                : "border-amber-200 bg-amber-50/50 text-amber-700 hover:bg-amber-100/60"
                }`}
            >
              <span>RSVP Deadline</span>
              <CalendarDays className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Right Actions: Filter, Bulk Actions, Send */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => toast.info("Filter options opened")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-work-sans shadow-2xs"
          >
            <FilterIcon className="h-3.5 w-3.5 text-gray-500" />
            Filter
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>

          <button
            type="button"
            onClick={() => toast.info("Bulk actions menu opened")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#C39B4C]/40 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#C39B4C] hover:bg-amber-50/30 transition-colors cursor-pointer font-work-sans shadow-2xs"
          >
            Bulk Actions
            <ChevronDown className="h-3.5 w-3.5 text-[#C39B4C]" />
          </button>

          <button
            type="button"
            onClick={handleBulkSend}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#C39B4C] px-5 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-[#b08b3e] transition-colors cursor-pointer font-work-sans shadow-2xs"
          >
            <SendIcon className="h-3.5 w-3.5" />
            Send
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-work-sans">
            <thead className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-600">
              {/* Premium Active Table Header */}
              {isPremium && (
                <tr>
                  <th className="py-3.5 pl-6 pr-4">Ticket</th>
                  <th className="py-3.5 px-4">Guest Name</th>
                  <th className="py-3.5 px-4">Table</th>
                  <th className="py-3.5 px-4">RSVP Status</th>
                  <th className="py-3.5 px-4">Send Reminder</th>
                  <th className="py-3.5 px-4">Ticket Type</th>
                  <th className="py-3.5 px-4">Ticket Link</th>
                  <th className="py-3.5 px-4">Check-in time</th>
                  <th className="py-3.5 pr-6 pl-4">Status</th>
                </tr>
              )}

              {/* Standard Active Table Header */}
              {isStandard && (
                <tr>
                  <th className="py-3.5 pl-6 pr-4">Ticket</th>
                  <th className="py-3.5 px-4">Assign to Name</th>
                  <th className="py-3.5 px-4">Table</th>
                  <th className="py-3.5 px-4">Ticket Type</th>
                  <th className="py-3.5 px-4">Ticket Link</th>
                  <th className="py-3.5 pr-6 pl-4">Check-in time</th>
                </tr>
              )}

              {/* Scheduled Table Header */}
              {isScheduled && (
                <tr>
                  <th className="py-3.5 pl-6 pr-4">Ticket</th>
                  <th className="py-3.5 px-4">Assign to Name</th>
                  <th className="py-3.5 px-4">Table</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Ticket Type</th>
                  <th className="py-3.5 px-4">Ticket Link</th>
                  <th className="py-3.5 pr-6 pl-4">Check-in time</th>
                </tr>
              )}
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td
                    colSpan={isPremium ? 9 : isStandard ? 6 : 7}
                    className="py-12 text-center text-gray-500 font-work-sans"
                  >
                    No tickets found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => {
                  return (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Ticket ID */}
                      <td className="py-3.5 pl-6 pr-4 font-medium text-gray-800">
                        {ticket.ticketId}
                      </td>

                      {/* Guest Name / Assign to Name */}
                      {isPremium ? (
                        <td className="py-3.5 px-4 text-gray-700">
                          {ticket.guestName}
                        </td>
                      ) : (
                        <td className="py-3.5 px-4 text-gray-400">--</td>
                      )}

                      {/* Table Column */}
                      {isPremium && (
                        <td className="py-3.5 px-4 text-gray-700">
                          {ticket.table}
                        </td>
                      )}

                      {/* Standard Active: Table column has inline status badge */}
                      {isStandard && (
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700">
                              {ticket.table}
                            </span>
                            {ticket.status === "Locked/ Ready" && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF1F3] px-2 py-0.5 text-[11px] font-medium text-[#F04438] border border-[#FDA29B]/60">
                                <Lock className="h-2.5 w-2.5" />
                                Locked/ Ready
                              </span>
                            )}
                            {ticket.status === "Editable" && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-[#EFF8FF] px-2 py-0.5 text-[11px] font-medium text-[#175CD3] border border-[#B2DDFF]/60">
                                <Pencil className="h-2.5 w-2.5" />
                                Editable
                              </span>
                            )}
                          </div>
                        </td>
                      )}

                      {/* Scheduled Table column */}
                      {isScheduled && (
                        <td className="py-3.5 px-4 text-gray-700">
                          {ticket.table}
                        </td>
                      )}

                      {/* Scheduled Status Column */}
                      {isScheduled && (
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF1F3] px-2 py-0.5 text-[11px] font-medium text-[#F04438] border border-[#FDA29B]/60">
                            <Lock className="h-2.5 w-2.5" />
                            Locked/ Ready
                          </span>
                        </td>
                      )}

                      {/* Premium RSVP Status */}
                      {isPremium && (
                        <td className="py-3.5 px-4">
                          {ticket.rsvpStatus === "Pending" ? (
                            <span className="font-medium text-[#F79009]">
                              Pending
                            </span>
                          ) : ticket.rsvpStatus === "Confirm" ? (
                            <span className="font-medium text-[#12B76A]">
                              Confirm
                            </span>
                          ) : ticket.rsvpStatus === "Decline" ? (
                            <span className="font-medium text-gray-400">
                              Decline
                            </span>
                          ) : (
                            <span className="text-gray-400">--</span>
                          )}
                        </td>
                      )}

                      {/* Premium Send Reminder */}
                      {isPremium && (
                        <td className="py-3.5 px-4">
                          {ticket.reminderStatus === "Reminder" ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleSendReminder(
                                  ticket.id,
                                  ticket.guestName
                                )
                              }
                              className="rounded-md bg-[#B58500]/15 px-2.5 py-1 text-xs font-medium text-[#B58500] hover:bg-[#B58500]/25 transition-colors cursor-pointer font-work-sans"
                            >
                              Reminder
                            </button>
                          ) : ticket.reminderStatus === "Follow-up" ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleSendReminder(
                                  ticket.id,
                                  ticket.guestName
                                )
                              }
                              className="rounded-md bg-[#B58500]/15 px-2.5 py-1 text-xs font-medium text-[#B58500] hover:bg-[#B58500]/25 transition-colors cursor-pointer font-work-sans"
                            >
                              Follow-up
                            </button>
                          ) : (
                            <span className="text-gray-400">--</span>
                          )}
                        </td>
                      )}

                      {/* Ticket Type */}
                      <td className="py-3.5 px-4 text-gray-700">
                        {ticket.ticketType}
                      </td>

                      {/* Ticket Link */}
                      <td className="py-3.5 px-4">
                        {ticket.ticketLink && ticket.ticketLink !== "--" ? (
                          <button
                            type="button"
                            onClick={() => handleCopyLink(ticket.ticketId)}
                            className="text-[#175CD3] hover:underline cursor-pointer font-medium"
                          >
                            {copiedId === ticket.ticketId
                              ? "Copied!"
                              : ticket.ticketLink}
                          </button>
                        ) : (
                          <span className="text-gray-400">--</span>
                        )}
                      </td>

                      {/* Check-in time */}
                      <td className="py-3.5 px-4 text-gray-600">
                        {ticket.checkInTime || "--"}
                      </td>

                      {/* Premium Status Pill */}
                      {isPremium && (
                        <td className="py-3.5 pr-6 pl-4">
                          {ticket.status === "Editable" && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#EFF8FF] px-2.5 py-0.5 text-xs font-medium text-[#175CD3] border border-[#B2DDFF]/70">
                              <Pencil className="h-3 w-3" />
                              Editable
                            </span>
                          )}
                          {ticket.status === "Locked/ Ready" && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF1F3] px-2.5 py-0.5 text-xs font-medium text-[#F04438] border border-[#FDA29B]/70">
                              <Lock className="h-3 w-3" />
                              Locked/ Ready
                            </span>
                          )}
                          {ticket.status === "Sent" && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#ECFDF3] px-2.5 py-0.5 text-xs font-medium text-[#027A48] border border-[#ABEFC6]/70">
                              <CheckCircle2 className="h-3 w-3" />
                              Sent
                            </span>
                          )}
                          {ticket.status === "Voided" && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 border border-gray-200">
                              Voided
                            </span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 border-t border-gray-100 py-4">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer text-xs"
          >
            &lt;
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${currentPage === page
                ? "bg-[#C39B4C] text-white"
                : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer text-xs"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddGuestModal />
      <ScannerCodeModal />
    </div>
  );
};
