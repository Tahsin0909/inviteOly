"use client";

import { RootState } from "@/redux/store";
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Filter as FilterIcon,
  Lock,
  Mail,
  Pencil,
  Phone,
  RefreshCw,
  Search,
  Send as SendIcon,
  Ticket,
  User,
  UserPlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getTicketsForEvent } from "../../data/hostEvent.data";
import { IHostTicketGuest } from "../../event.interface";
import {
  sendReminderToTicket,
  setActiveFilter,
  setIsAddGuestModalOpen,
  setIsScannerModalOpen,
  setSearchQuery,
  setSelectedEventId,
} from "../../store/event.slice";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Inline editing state for Ticket Name
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [tempTicketName, setTempTicketName] = useState<string>("");

  const activeId = eventId || selectedEventId || "host-evt-1";
  const event =
    hostEvents.find((e) => e.id === activeId) || hostEvents[0];

  // Local state to store tickets with live inline edits
  const [eventTickets, setEventTickets] = useState<IHostTicketGuest[]>(() =>
    getTicketsForEvent(event.id)
  );

  // Sync tickets when active event changes
  useEffect(() => {
    setEventTickets(getTicketsForEvent(event.id));
    setEditingTicketId(null);
  }, [event.id]);

  // Combine with any user-added guests from Redux store
  const effectiveTickets = useMemo(() => {
    const newlyAdded = tickets.filter(
      (t) => !eventTickets.some((et) => et.id === t.id)
    );
    return [...newlyAdded, ...eventTickets];
  }, [tickets, eventTickets]);

  // Layout flags based on event package and timeline
  const isPremium = event.tier === "Premium";
  const isStandard = event.tier === "Standard";
  const isLive = event.status === "Live";
  const isScheduled = event.status === "Scheduled";

  // Dynamic filter tab counts
  const counts = useMemo(() => {
    return {
      all: effectiveTickets.length > 0 ? 400 : 0,
      editable:
        effectiveTickets.filter((t) => t.status === "Editable").length || 175,
      locked:
        effectiveTickets.filter((t) => t.status === "Locked/ Ready").length ||
        100,
      sent:
        effectiveTickets.filter(
          (t) => t.status === "Sent" || t.status === "Checked In"
        ).length || 125,
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
        ticket.status !== "Sent" &&
        ticket.status !== "Checked In"
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
        const matchesRoom = ticket.table.toLowerCase().includes(q);
        const matchesType = ticket.ticketType.toLowerCase().includes(q);
        return matchesName || matchesId || matchesRoom || matchesType;
      }

      return true;
    });
  }, [effectiveTickets, activeFilter, searchQuery]);

  const handleCopyLink = async (ticketId: string) => {
    try {
      const dummyLink = `https://InviteOly.app/tickets/t-${ticketId.replace(/\s+/g, "").toLowerCase()}`;
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
    toast.success(
      `Reminder sent to ${guestName && guestName !== "--" ? guestName : "guest"}!`
    );
  };

  const handleBulkSend = () => {
    toast.success("Invites sent to all unsent ticket holders!");
  };

  // Inline edit handlers for Ticket Name
  const handleStartEdit = (ticketId: string, currentName: string) => {
    if (isLive) {
      toast.info("Ticket names cannot be edited while event is in Live mode.");
      return;
    }
    setEditingTicketId(ticketId);
    setTempTicketName(currentName === "--" ? "" : currentName);
  };

  const handleSaveEdit = (ticketId: string) => {
    const trimmed = tempTicketName.trim();
    setEventTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, guestName: trimmed } : t))
    );
    setEditingTicketId(null);
    toast.success(
      trimmed ? `Ticket name saved: "${trimmed}"` : "Ticket name cleared"
    );
  };

  const handleCancelEdit = () => {
    setEditingTicketId(null);
  };

  const getFilterLabel = () => {
    switch (activeFilter) {
      case "editable":
        return `Editable (${counts.editable})`;
      case "locked":
        return `Locked/ Ready (${counts.locked})`;
      case "send":
      case "sent":
        return `Send (${counts.sent})`;
      case "voided":
        return `Voided (${counts.voided})`;
      case "rsvp":
        return "RSVP Deadline";
      default:
        return "Filter";
    }
  };

  const progressPercentage =
    event.progressPercentage !== undefined
      ? event.progressPercentage
      : event.totalGuests > 0
        ? Math.round((event.checkedIn / event.totalGuests) * 100)
        : 0;

  return (
    <div className="space-y-6 font-work-sans">
      {/* Top Header Row with Back Button, Title, Demo Switcher, Search, Add Guests */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <button
              type="button"
              onClick={() => router.push("/host/events")}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#C39B4C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to All Events
            </button>

            {/* Demonstration Scenario Switcher */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50/90 px-3 py-1 text-xs font-medium text-amber-900 hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
                >
                  <span className="text-[11px] font-normal text-amber-700">Demo Scenario:</span>
                  <span className="font-bold">{event.tier} • {event.status}</span>
                  <ChevronDown className="h-3 w-3 text-amber-700" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 bg-white border-neutral-200 shadow-xl rounded-xl p-1.5 z-50">
                <DropdownMenuLabel className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2.5 py-1">
                  Demonstration Modes
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />
                {hostEvents.map((evt) => (
                  <DropdownMenuItem
                    key={evt.id}
                    onClick={() => {
                      dispatch(setSelectedEventId(evt.id));
                      router.push(`/host/events/${evt.id}`);
                    }}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer text-xs ${evt.id === event.id
                      ? "bg-amber-50 text-amber-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {evt.id === event.id ? (
                        <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      ) : (
                        <span className="w-3.5 shrink-0" />
                      )}
                      <span className="truncate max-w-[130px]">{evt.title}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${evt.tier === "Premium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {evt.tier}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${evt.status === "Live"
                          ? "bg-emerald-100 text-emerald-800"
                          : evt.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-sky-100 text-sky-800"
                          }`}
                      >
                        {evt.status}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 font-space-grotesk tracking-tight">
            Events Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
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
              placeholder={
                isStandard
                  ? "Search ticket (e.g. Guest 001) or name..."
                  : "Search guest name, email or phone..."
              }
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C39B4C] focus:outline-none focus:ring-1 focus:ring-[#C39B4C] transition-all"
            />
          </div>

          {/* Add Guests Button (Premium only) */}
          {isPremium && !isLive && (
            <button
              type="button"
              onClick={() => dispatch(setIsAddGuestModalOpen(true))}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#C39B4C] px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#b08b3e] transition-colors cursor-pointer shadow-2xs"
            >
              <UserPlus className="h-4 w-4" />
              Add Guests
            </button>
          )}
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
                  className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${event.tier === "Premium"
                    ? "bg-[#FFF9EE] text-[#B58500] border border-[#FDE68A]/60"
                    : "bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]/50"
                    }`}
                >
                  {event.tier}
                </span>
              )}

              {/* Status Badge with Live Pulse Indicator */}
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-semibold bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]/60">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12B76A]"></span>
                  </span>
                  Live
                </span>
              ) : event.status === "Active" ? (
                <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]/50">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]/50">
                  Scheduled
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 font-space-grotesk">
              {event.title}
            </h2>

            {/* Event Meta Row 1 */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-500">
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
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-600">
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
            <span className="text-xs font-medium text-gray-700">
              Scanner App Login Code :
            </span>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => dispatch(setIsScannerModalOpen(true))}
                className="text-sm font-semibold text-[#C39B4C] hover:underline cursor-pointer"
              >
                View code
              </button>
              <button
                type="button"
                onClick={() => dispatch(setIsScannerModalOpen(true))}
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
                <p className="text-xs text-gray-500">Total Guest</p>
                <p className="mt-1 text-xl font-bold text-gray-900 font-space-grotesk">
                  {event.totalGuests}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">
                  {isScheduled ? "Check in" : "Check-in"}
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900 font-space-grotesk">
                  {event.checkedIn}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Remaining</p>
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
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-500 font-space-grotesk min-w-[36px] text-right">
                {progressPercentage}%
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
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${activeFilter === "all"
              ? "border border-gray-300 bg-gray-100 text-gray-900 font-semibold"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            All ticket {counts.all}
          </button>

          {activeFilter !== "all" && (
            <button
              type="button"
              onClick={() => dispatch(setActiveFilter("all"))}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <span>{getFilterLabel()}</span>
              <span className="text-amber-500 hover:text-amber-800 text-sm leading-none font-bold">
                &times;
              </span>
            </button>
          )}
        </div>

        {/* Right Actions: Filter, Bulk Actions, Send */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filter Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs ${activeFilter !== "all"
                  ? "border-[#C39B4C] bg-amber-50/60 text-[#C39B4C] font-semibold"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <FilterIcon
                  className={`h-3.5 w-3.5 ${activeFilter !== "all" ? "text-[#C39B4C]" : "text-gray-500"
                    }`}
                />
                <span>
                  {activeFilter === "all" ? "Filter" : getFilterLabel()}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 ${activeFilter !== "all" ? "text-[#C39B4C]" : "text-gray-400"
                    }`}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border-neutral-200 shadow-lg rounded-xl p-1.5 z-50"
            >
              <DropdownMenuLabel className="text-xs font-semibold text-gray-500 px-2.5 py-1.5">
                Filter by Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1" />

              {/* All Ticket */}
              <DropdownMenuItem
                onClick={() => dispatch(setActiveFilter("all"))}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer text-xs sm:text-sm ${activeFilter === "all"
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {activeFilter === "all" ? (
                    <Check className="h-3.5 w-3.5 text-gray-900 shrink-0" />
                  ) : (
                    <span className="w-3.5 shrink-0" />
                  )}
                  <span>All ticket</span>
                </div>
                <span className="rounded-full bg-gray-100 border border-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                  {counts.all}
                </span>
              </DropdownMenuItem>

              {/* Editable */}
              {!isScheduled && !isLive && (
                <DropdownMenuItem
                  onClick={() => dispatch(setActiveFilter("editable"))}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer text-xs sm:text-sm ${activeFilter === "editable"
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-blue-50/50"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {activeFilter === "editable" ? (
                      <Check className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                    ) : (
                      <span className="w-3.5 shrink-0" />
                    )}
                    <span>Editable</span>
                  </div>
                  <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-[11px] font-medium">
                    {counts.editable}
                  </span>
                </DropdownMenuItem>
              )}

              {/* Locked/ Ready */}
              <DropdownMenuItem
                onClick={() => dispatch(setActiveFilter("locked"))}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer text-xs sm:text-sm ${activeFilter === "locked"
                  ? "bg-orange-50 text-orange-700 font-semibold"
                  : "text-gray-700 hover:bg-orange-50/50"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {activeFilter === "locked" ? (
                    <Check className="h-3.5 w-3.5 text-orange-700 shrink-0" />
                  ) : (
                    <span className="w-3.5 shrink-0" />
                  )}
                  <span>Locked/ Ready</span>
                </div>
                <span className="rounded-full bg-orange-100 text-orange-700 px-2 py-0.5 text-[11px] font-medium">
                  {counts.locked}
                </span>
              </DropdownMenuItem>

              {/* Send / Checked In */}
              <DropdownMenuItem
                onClick={() => dispatch(setActiveFilter("send"))}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer text-xs sm:text-sm ${activeFilter === "send" || activeFilter === "sent"
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-emerald-50/50"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {activeFilter === "send" || activeFilter === "sent" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                  ) : (
                    <span className="w-3.5 shrink-0" />
                  )}
                  <span>{isLive ? "Checked In / Sent" : "Send"}</span>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[11px] font-medium">
                  {counts.sent}
                </span>
              </DropdownMenuItem>

              {/* Voided (Premium only) */}
              {isPremium && (
                <DropdownMenuItem
                  onClick={() => dispatch(setActiveFilter("voided"))}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer text-xs sm:text-sm ${activeFilter === "voided"
                    ? "bg-gray-100 text-gray-800 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {activeFilter === "voided" ? (
                      <Check className="h-3.5 w-3.5 text-gray-800 shrink-0" />
                    ) : (
                      <span className="w-3.5 shrink-0" />
                    )}
                    <span>Voided</span>
                  </div>
                  <span className="rounded-full bg-gray-200 text-gray-700 px-2 py-0.5 text-[11px] font-medium">
                    {counts.voided}
                  </span>
                </DropdownMenuItem>
              )}

              {/* RSVP Deadline (Premium only) */}
              {isPremium && (
                <DropdownMenuItem
                  onClick={() => dispatch(setActiveFilter("rsvp"))}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer text-xs sm:text-sm ${activeFilter === "rsvp"
                    ? "bg-amber-50 text-amber-900 font-semibold"
                    : "text-gray-700 hover:bg-amber-50/50"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {activeFilter === "rsvp" ? (
                      <Check className="h-3.5 w-3.5 text-amber-900 shrink-0" />
                    ) : (
                      <span className="w-3.5 shrink-0" />
                    )}
                    <span className="flex items-center gap-1.5">
                      <span>RSVP Deadline</span>
                      <CalendarDays className="h-3.5 w-3.5 text-amber-600" />
                    </span>
                  </div>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            onClick={() => toast.info("Bulk actions menu opened")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#C39B4C]/40 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#C39B4C] hover:bg-amber-50/30 transition-colors cursor-pointer shadow-2xs"
          >
            Bulk Actions
            <ChevronDown className="h-3.5 w-3.5 text-[#C39B4C]" />
          </button>

          <button
            type="button"
            onClick={handleBulkSend}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#C39B4C] px-5 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-[#b08b3e] transition-colors cursor-pointer shadow-2xs"
          >
            <SendIcon className="h-3.5 w-3.5" />
            Send
          </button>
        </div>
      </div>

      {/* Tickets Table - Uniform Consistent Design across All Packages & Timelines */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-work-sans">
            <thead className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-600">
              <tr>
                <th className="py-3.5 pl-6 pr-4">Ticket (Guest #)</th>
                <th className="py-3.5 px-4">Ticket Name</th>
                <th className="py-3.5 px-4">Room</th>
                {isPremium && (
                  <>
                    <th className="py-3.5 px-4">RSVP Status</th>
                    <th className="py-3.5 px-4">Send Reminder</th>
                  </>
                )}
                <th className="py-3.5 px-4">Ticket Type</th>
                <th className="py-3.5 px-4">Ticket Link</th>
                <th className="py-3.5 px-4">Check-in time</th>
                <th className="py-3.5 pr-6 pl-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td
                    colSpan={isPremium ? 9 : 7}
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
                      {/* 1. Ticket (Guest #) */}
                      <td className="py-3.5 pl-6 pr-4 font-medium text-gray-800 whitespace-nowrap">
                        {ticket.ticketId}
                      </td>

                      {/* 2. Ticket Name (Editable in Scheduled & Active, Locked in Live. Standard enables manual tracking) */}
                      <td className="py-3.5 px-4">
                        {editingTicketId === ticket.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              autoFocus
                              value={tempTicketName}
                              onChange={(e) => setTempTicketName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveEdit(ticket.id);
                                if (e.key === "Escape") handleCancelEdit();
                              }}
                              placeholder={
                                isStandard
                                  ? "Add guest name..."
                                  : "Enter ticket name..."
                              }
                              className="px-2.5 py-1 text-xs rounded-md border border-[#C39B4C] bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#C39B4C] w-36 sm:w-44 shadow-2xs font-work-sans"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(ticket.id)}
                              className="p-1 rounded bg-[#C39B4C] text-white hover:bg-[#B38A3B] transition-colors cursor-pointer"
                              title="Save name"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="p-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              <span className="text-xs font-bold leading-none">
                                &times;
                              </span>
                            </button>
                          </div>
                        ) : isLive ? (
                          /* In Live Mode: NOT editable */
                          <span className="text-gray-700 font-medium">
                            {ticket.guestName && ticket.guestName !== "--"
                              ? ticket.guestName
                              : "--"}
                          </span>
                        ) : ticket.guestName &&
                          ticket.guestName !== "--" &&
                          ticket.guestName.trim() !== "" ? (
                          /* In Scheduled or Active Mode: Click to Edit */
                          <button
                            type="button"
                            onClick={() =>
                              handleStartEdit(ticket.id, ticket.guestName)
                            }
                            className="group inline-flex items-center gap-1.5 cursor-pointer text-gray-800 hover:text-[#C39B4C] transition-colors text-left"
                            title="Click to edit ticket name"
                          >
                            <span className="font-medium text-xs sm:text-sm">
                              {ticket.guestName}
                            </span>
                            <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100 text-gray-400 group-hover:text-[#C39B4C] transition-opacity" />
                          </button>
                        ) : (
                          /* Standard / Initial state: click to input name for tracking */
                          <button
                            type="button"
                            onClick={() => handleStartEdit(ticket.id, "")}
                            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#C39B4C] transition-colors cursor-pointer italic"
                            title="Add guest name for internal tracking"
                          >
                            <Pencil className="h-3 w-3" />
                            <span>Add name</span>
                          </button>
                        )}
                      </td>

                      {/* 3. Room (Consistently named Room, formerly Table) */}
                      <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap">
                        {ticket.table}
                      </td>

                      {/* 4 & 5. Premium only: RSVP Status & Send Reminder */}
                      {isPremium && (
                        <>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {ticket.rsvpStatus === "Pending" ? (
                              <span className="font-medium text-[#F79009]">
                                Pending
                              </span>
                            ) : ticket.rsvpStatus === "Confirm" ? (
                              <span className="font-medium text-[#12B76A]">
                                Confirmed
                              </span>
                            ) : ticket.rsvpStatus === "Decline" ? (
                              <span className="font-medium text-gray-400">
                                Declined
                              </span>
                            ) : (
                              <span className="text-gray-400">--</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
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
                        </>
                      )}

                      {/* 6. Ticket Type */}
                      <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap">
                        {ticket.ticketType}
                      </td>

                      {/* 7. Ticket Link */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
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

                      {/* 8. Check-in time */}
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        {ticket.checkInTime || "--"}
                      </td>

                      {/* 9. Status (Consistently placed at the end for all packages) */}
                      <td className="py-3.5 pr-6 pl-4 whitespace-nowrap">
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
                        {ticket.status === "Checked In" && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#ECFDF3] px-2.5 py-0.5 text-xs font-medium text-[#027A48] border border-[#ABEFC6]/70">
                            <Check className="h-3 w-3" />
                            Checked In
                          </span>
                        )}
                        {ticket.status === "Voided" && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 border border-gray-200">
                            Voided
                          </span>
                        )}
                      </td>
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

export default HostEventDetailsView;
