"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  MoreVertical,
  Download,
  Plus,
  Copy,
  Edit2,
  History,
  RefreshCw,
  Ban,
  QrCode,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  getAdminEventDetailsById,
  staticAdminEventDetails,
  staticAdminGuestTickets,
} from "../../data/adminEvent.data";
import { useGetAdminEventByIdQuery } from "../../event.api";
import {
  IAdminEventDetails,
  IAdminGuestTicket,
  TAdminTicketStatus,
} from "../../event.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminEventDetailsProps {
  eventId: string;
  className?: string;
}

type TabType = "overview" | "guests";

export const AdminEventDetails: React.FC<AdminEventDetailsProps> = ({
  eventId,
  className,
}) => {
  const { data: apiData } = useGetAdminEventByIdQuery(eventId);
  const event: IAdminEventDetails =
    apiData?.data || getAdminEventDetailsById(eventId) || staticAdminEventDetails;

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>("guests");

  // Ticket Guests State (allows editing, adding, voiding in real time)
  const [guestTickets, setGuestTickets] = useState<IAdminGuestTicket[]>(() => {
    return event.ticketGuests && event.ticketGuests.length > 0
      ? event.ticketGuests
      : staticAdminGuestTickets;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketTypeFilter, setTicketTypeFilter] = useState("All Ticket Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [deliveryFilter, setDeliveryFilter] = useState("All Delivery Methods");

  // Pagination - Admin can see at least 10 guests
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modals state
  const [selectedTicket, setSelectedTicket] = useState<IAdminGuestTicket | null>(null);
  const [viewTicketOpen, setViewTicketOpen] = useState(false);
  const [editTicketOpen, setEditTicketOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [addGuestOpen, setAddGuestOpen] = useState(false);

  // Fix: Ensure document.body pointer-events is cleaned up whenever all modals are closed
  React.useEffect(() => {
    if (!viewTicketOpen && !editTicketOpen && !activityModalOpen && !addGuestOpen) {
      document.body.style.pointerEvents = "";
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [viewTicketOpen, editTicketOpen, activityModalOpen, addGuestOpen]);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    ticketType: "General Admission",
    table: "",
  });

  // Add guest form state
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    ticketType: "General Admission",
    table: "",
    deliveryMethod: "Email" as "Email" | "Copied by Host" | "Not delivered",
  });

  // Filtered Tickets
  const filteredTickets = useMemo(() => {
    return guestTickets.filter((ticket) => {
      // Search query (name, email, ticketNumber)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = ticket.name.toLowerCase().includes(query);
        const matchEmail = (ticket.email || "").toLowerCase().includes(query);
        const matchNumber = ticket.ticketNumber.toLowerCase().includes(query);
        if (!matchName && !matchEmail && !matchNumber) return false;
      }

      // Ticket Type
      if (ticketTypeFilter !== "All Ticket Types") {
        if (!ticket.ticketType.toLowerCase().includes(ticketTypeFilter.toLowerCase())) {
          return false;
        }
      }

      // Status
      if (statusFilter !== "All Statuses") {
        if (ticket.status !== statusFilter) return false;
      }

      // Delivery Method
      if (deliveryFilter !== "All Delivery Methods" && deliveryFilter !== "Delivery Method,") {
        if (ticket.deliveryMethod !== deliveryFilter) return false;
      }

      return true;
    });
  }, [guestTickets, searchQuery, ticketTypeFilter, statusFilter, deliveryFilter]);

  // Paginated Tickets
  const totalItems = filteredTickets.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTickets.slice(start, start + pageSize);
  }, [filteredTickets, currentPage, pageSize]);

  // Action Handlers
  const handleCopyLink = (ticket: IAdminGuestTicket) => {
    const url = `https://InviteOly.com/ticket/${ticket.id}`;
    navigator.clipboard.writeText(url);
    toast.success(`Copied ticket link for ${ticket.name} (${ticket.ticketNumber})`);
  };

  const handleResendTicket = (ticket: IAdminGuestTicket) => {
    if (!ticket.canResendEmail || !ticket.email) {
      toast.error("Email delivery unavailable for this guest.");
      return;
    }
    toast.success(`Ticket email resent to ${ticket.email}`);
  };

  const handleOpenViewTicket = (ticket: IAdminGuestTicket) => {
    setSelectedTicket(ticket);
    setViewTicketOpen(true);
  };

  const handleOpenEdit = (ticket: IAdminGuestTicket) => {
    setSelectedTicket(ticket);
    setEditForm({
      name: ticket.name,
      email: ticket.email || "",
      ticketType: ticket.ticketType,
      table: ticket.table || "",
    });
    setEditTicketOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    setGuestTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
            ...t,
            name: editForm.name,
            email: editForm.email,
            ticketType: editForm.ticketType,
            table: editForm.table || undefined,
          }
          : t
      )
    );
    toast.success(`Updated ticket details for ${editForm.name}`);
    setEditTicketOpen(false);
  };

  const handleOpenActivity = (ticket: IAdminGuestTicket) => {
    setSelectedTicket(ticket);
    setActivityModalOpen(true);
  };

  const handleRegenerateLink = (ticket: IAdminGuestTicket) => {
    toast.success(`Regenerated secure ticket link for ${ticket.name}`);
  };

  const handleVoidTicket = (ticket: IAdminGuestTicket) => {
    setGuestTickets((prev) =>
      prev.map((t) =>
        t.id === ticket.id
          ? {
            ...t,
            status: "Voided" as TAdminTicketStatus,
            checkInStatus: "Voided",
          }
          : t
      )
    );
    toast.error(`Ticket ${ticket.ticketNumber} has been voided.`);
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `tkt-${Date.now().toString().slice(-4)}`;
    const newNumber = `Guest ${String(guestTickets.length + 1).padStart(3, "0")}`;

    const newGuest: IAdminGuestTicket = {
      id: newId,
      ticketNumber: newNumber,
      name: addForm.name,
      email: addForm.email || undefined,
      ticketType: addForm.ticketType,
      table: addForm.table || undefined,
      deliveryMethod: addForm.deliveryMethod,
      deliveryDate:
        addForm.deliveryMethod === "Email"
          ? "Sent Just Now"
          : addForm.deliveryMethod === "Copied by Host"
            ? "Copied Just Now"
            : "Not yet copied",
      rsvpStatus: "Awaiting response",
      rsvpDate: "Awaiting response",
      checkInStatus: "Not checked in",
      status: "Ready",
      canResendEmail: addForm.deliveryMethod === "Email" && Boolean(addForm.email),
      activityHistory: [
        {
          timestamp: "Just Now",
          title: "Ticket Created",
          description: `Admin created ticket for ${addForm.name}`,
        },
      ],
    };

    setGuestTickets((prev) => [newGuest, ...prev]);
    toast.success(`Added ${addForm.name} (${newNumber}) to guest list.`);
    setAddForm({
      name: "",
      email: "",
      ticketType: "General Admission",
      table: "",
      deliveryMethod: "Email",
    });
    setAddGuestOpen(false);
  };

  const handleExportCsv = () => {
    const headers = "Ticket Number,Name,Email,Ticket Type,Table,Delivery,RSVP,Check-in,Status\n";
    const rows = guestTickets
      .map(
        (t) =>
          `"${t.ticketNumber}","${t.name}","${t.email || ""}","${t.ticketType}","${t.table || ""
          }","${t.deliveryMethod}","${t.rsvpStatus}","${t.checkInStatus}","${t.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${event.eventName.replace(/\s+/g, "_")}_Guests.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Guest list exported to CSV.");
  };

  // Status Badge Styling
  const renderStatusBadge = (status: TAdminTicketStatus) => {
    switch (status) {
      case "Scanned":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
            Scanned
          </span>
        );
      case "Accepted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0FDFA] text-[#0D9488] border border-[#99F6E4]">
            Accepted
          </span>
        );
      case "Sent":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
            Sent
          </span>
        );
      case "Ready":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
            Ready
          </span>
        );
      case "Declined":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
            Declined
          </span>
        );
      case "Voided":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
            Voided
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className={cn("w-full space-y-6 pb-16 font-work-sans text-neutral-900", className)}>
      {/* Top Header: Back to Events */}
      <div>
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors font-medium mb-3"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Events</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                {event.eventName || "Amina & Zayd Wedding Reception"}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Active Event
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Event ID: {event.id || "EVT-29451"} · {event.eventDate || "Saturday, October 18, 2026"} ·{" "}
              {event.startTime || "5:00 PM"}–{event.endTime || "11:00 PM"}
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Assigned Partner */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            ASSIGNED PARTNER
          </p>
          <p className="text-sm sm:text-base font-bold text-neutral-900 mt-1 truncate">
            {event.partnerName || "Golden Bay Event Center"}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            Partner ID: {event.partnerId || "PRT-1004"}
          </p>
        </div>

        {/* Card 2: Package */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            PACKAGE
          </p>
          <p className="text-sm sm:text-base font-bold text-neutral-900 mt-1 truncate">
            {event.packageTitle || "Premium Signature"}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {event.packageCapacity || "Up to 400 guests"}
          </p>
        </div>

        {/* Card 3: Guest Progress */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            GUEST PROGRESS
          </p>
          <p className="text-lg sm:text-xl font-bold font-space-grotesk text-neutral-900 mt-0.5">
            {event.assignedGuestsCount || 175} / {event.totalCapacity || 400}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">tickets assigned</p>
        </div>

        {/* Card 4: Checked In */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            CHECKED IN
          </p>
          <p className="text-lg sm:text-xl font-bold font-space-grotesk text-neutral-900 mt-0.5">
            {event.checkedInCount || 82}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {Math.round(
              ((event.checkedInCount || 82) / (event.assignedGuestsCount || 175)) * 100
            )}
            % of assigned guests
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 flex items-center gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={cn(
            "pb-3 text-sm font-semibold transition-all cursor-pointer relative",
            activeTab === "overview"
              ? "text-neutral-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C39B4C]"
              : "text-neutral-500 hover:text-neutral-800"
          )}
        >
          Event Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("guests")}
          className={cn(
            "pb-3 text-sm font-semibold transition-all cursor-pointer relative",
            activeTab === "guests"
              ? "text-[#C39B4C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C39B4C]"
              : "text-neutral-500 hover:text-neutral-800"
          )}
        >
          Guests & Tickets ({guestTickets.length})
        </button>
      </div>

      {/* TAB 1: GUESTS & TICKETS (Active Tab from Mockup) */}
      {activeTab === "guests" && (
        <div className="space-y-4">
          {/* Section Header & Top Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
                Guest & Ticket Management
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                View ticket assignments, delivery activity, RSVP responses and entry records.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleExportCsv}
                className="px-3.5 py-2 rounded-lg bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="size-3.5 text-neutral-500" />
                <span>Export Guest List</span>
              </button>

              <button
                type="button"
                onClick={() => setAddGuestOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#C39B4C] hover:bg-[#b08b41] active:scale-[0.99] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="size-3.5 stroke-[2.5]" />
                <span>Add Guest</span>
              </button>
            </div>
          </div>

          {/* Search & Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search guest, email or ticket number"
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C39B4C] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Filter 1: Ticket Types */}
            <div className="sm:col-span-2 relative">
              <select
                value={ticketTypeFilter}
                onChange={(e) => {
                  setTicketTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 pr-8 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-700 focus:outline-none focus:border-[#C39B4C] appearance-none cursor-pointer"
              >
                <option value="All Ticket Types">All Ticket Types</option>
                <option value="General Admission">General Admission</option>
                <option value="Adult">Adult</option>
                <option value="VIP">VIP</option>
                <option value="Child">Child</option>
                <option value="Staff">Staff</option>
                <option value="Vendor">Vendor</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
            </div>

            {/* Filter 2: Statuses */}
            <div className="sm:col-span-2 relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 pr-8 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-700 focus:outline-none focus:border-[#C39B4C] appearance-none cursor-pointer"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Scanned">Scanned</option>
                <option value="Accepted">Accepted</option>
                <option value="Sent">Sent</option>
                <option value="Ready">Ready</option>
                <option value="Declined">Declined</option>
                <option value="Voided">Voided</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
            </div>

            {/* Filter 3: Delivery Method */}
            <div className="sm:col-span-2 relative">
              <select
                value={deliveryFilter}
                onChange={(e) => {
                  setDeliveryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 pr-8 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-700 focus:outline-none focus:border-[#C39B4C] appearance-none cursor-pointer"
              >
                <option value="All Delivery Methods">Delivery Method</option>
                <option value="Email">Email</option>
                <option value="Copied by Host">Copied by Host</option>
                <option value="Not delivered">Not delivered</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-neutral-200/90 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200/80 bg-neutral-50/50">
                    <th className="py-3 px-4 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      GUEST
                    </th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      TICKET
                    </th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      DELIVERY
                    </th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      RSVP ACTIVITY
                    </th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      CHECK-IN
                    </th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider text-right sm:text-left">
                      TICKET ACTIONS
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-100 text-xs">
                  {paginatedTickets.length > 0 ? (
                    paginatedTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-neutral-50/70 transition-colors duration-150"
                      >
                        {/* 1. GUEST */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-bold text-neutral-900">{ticket.name}</p>
                          <p className="text-[11px] text-neutral-500">
                            {ticket.email || "No email provided"}
                          </p>
                        </td>

                        {/* 2. TICKET */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-bold text-neutral-900">{ticket.ticketNumber}</p>
                          <p className="text-[11px] text-neutral-500">
                            {ticket.ticketType}
                            {ticket.table ? ` • ${ticket.table}` : ""}
                          </p>
                        </td>

                        {/* 3. DELIVERY */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-bold text-neutral-900">{ticket.deliveryMethod}</p>
                          <p className="text-[11px] text-neutral-500">
                            {ticket.deliveryDate || "---"}
                          </p>
                        </td>

                        {/* 4. RSVP ACTIVITY */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-bold text-neutral-900">{ticket.rsvpStatus}</p>
                          <p className="text-[11px] text-neutral-500">
                            {ticket.rsvpDate || "---"}
                          </p>
                        </td>

                        {/* 5. CHECK-IN */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-bold text-neutral-900">
                            {ticket.checkInStatus}
                          </p>
                          {ticket.checkInGate && (
                            <p className="text-[11px] text-neutral-500">
                              {ticket.checkInGate}
                            </p>
                          )}
                        </td>

                        {/* 6. STATUS */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {renderStatusBadge(ticket.status)}
                        </td>

                        {/* 7. TICKET ACTIONS */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {/* View Ticket */}
                            <button
                              type="button"
                              onClick={() => handleOpenViewTicket(ticket)}
                              className="px-2.5 py-1 rounded-md border border-neutral-200 text-[11px] font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer shadow-2xs"
                            >
                              View Ticket
                            </button>

                            {/* Copy Link */}
                            <button
                              type="button"
                              onClick={() => handleCopyLink(ticket)}
                              className="px-2.5 py-1 rounded-md border border-neutral-200 text-[11px] font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer shadow-2xs"
                            >
                              Copy Link
                            </button>

                            {/* Resend - Disabled when email delivery is unavailable */}
                            <button
                              type="button"
                              disabled={!ticket.canResendEmail}
                              onClick={() => handleResendTicket(ticket)}
                              className={cn(
                                "px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors shadow-2xs",
                                ticket.canResendEmail
                                  ? "border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                                  : "border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed"
                              )}
                              title={
                                !ticket.canResendEmail
                                  ? "Resend disabled: Email delivery is unavailable"
                                  : "Resend ticket email"
                              }
                            >
                              Resend
                            </button>

                            {/* Three-Dot Menu */}
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild>
                                <button
                                  type="button"
                                  className="size-6.5 rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
                                  aria-label="More actions"
                                >
                                  <MoreVertical className="size-3.5" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 bg-white border-neutral-200 shadow-md">
                                <DropdownMenuItem
                                  onSelect={() => {
                                    setTimeout(() => handleOpenEdit(ticket), 50);
                                  }}
                                  className="text-xs cursor-pointer flex items-center gap-2"
                                >
                                  <Edit2 className="size-3.5 text-neutral-500" />
                                  <span>Edit Ticket Details</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => {
                                    setTimeout(() => handleOpenActivity(ticket), 50);
                                  }}
                                  className="text-xs cursor-pointer flex items-center gap-2"
                                >
                                  <History className="size-3.5 text-neutral-500" />
                                  <span>View Activity</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => handleRegenerateLink(ticket)}
                                  className="text-xs cursor-pointer flex items-center gap-2"
                                >
                                  <RefreshCw className="size-3.5 text-neutral-500" />
                                  <span>Regenerate Secure Link</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onSelect={() => handleVoidTicket(ticket)}
                                  className="text-xs text-red-600 hover:text-red-700 focus:text-red-700 cursor-pointer flex items-center gap-2"
                                >
                                  <Ban className="size-3.5 text-red-500" />
                                  <span>Void Ticket</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-400">
                        No guests found matching your search and filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="py-3 px-4 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 bg-white">
              <p>
                Showing{" "}
                <strong className="text-neutral-900">
                  {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, totalItems)}
                </strong>{" "}
                of <strong className="text-neutral-900">{totalItems}</strong> guests
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="size-7 rounded-md border border-neutral-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 cursor-pointer"
                >
                  &lt;
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrent = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "size-7 rounded-md text-xs font-semibold cursor-pointer transition-colors",
                        isCurrent
                          ? "bg-[#C39B4C] text-white shadow-2xs"
                          : "border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <>
                    <span className="px-1 text-neutral-400">...</span>
                    <button
                      type="button"
                      onClick={() => setCurrentPage(totalPages)}
                      className={cn(
                        "size-7 rounded-md text-xs font-semibold cursor-pointer transition-colors",
                        currentPage === totalPages
                          ? "bg-[#C39B4C] text-white shadow-2xs"
                          : "border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      )}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="size-7 rounded-md border border-neutral-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 cursor-pointer"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EVENT OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6 pt-2">
          {/* Section 1: Host / Client Information */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
            <h3 className="text-sm sm:text-base font-bold font-space-grotesk text-neutral-900">
              Host or Client Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-neutral-400 font-medium">Host Name</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.hostName}</p>
              </div>
              <div>
                <p className="text-neutral-400 font-medium">Host Type</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.hostType}</p>
              </div>
              <div>
                <p className="text-neutral-400 font-medium">Email Address</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.email}</p>
              </div>
              <div>
                <p className="text-neutral-400 font-medium">Phone Number</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.phone}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Event Details & Description */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
            <h3 className="text-sm sm:text-base font-bold font-space-grotesk text-neutral-900">
              Basic Event Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-neutral-400 font-medium">Event Name</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.eventName}</p>
              </div>
              <div>
                <p className="text-neutral-400 font-medium">Event Type</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.eventType}</p>
              </div>
              <div>
                <p className="text-neutral-400 font-medium">Tier</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF7EC] text-[#B89047]">
                  {event.tier}
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs">
              <p className="text-neutral-400 font-medium mb-1">Event Description</p>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/60 text-neutral-700 leading-relaxed">
                {event.eventDescription}
              </div>
            </div>
          </div>

          {/* Section 3: Venue, Capacity & Timing */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
            <h3 className="text-sm sm:text-base font-bold font-space-grotesk text-neutral-900">
              Venue & Capacity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-neutral-400 font-medium">Venue</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.venue}</p>
              </div>
              <div>
                <p className="text-neutral-400 font-medium">Ballroom / Hall</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.room}</p>
              </div>
              <div>
                <p className="text-neutral-400 font-medium">Max Capacity</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.venueGuestCapacity} guests</p>
              </div>
              <div>
                <p className="text-neutral-400 font-medium">Assigned Tickets</p>
                <p className="font-semibold text-neutral-900 mt-1">{event.assignedGuestsCount || 175} tickets</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: VIEW TICKET DIALOG
          ========================================================================= */}
      <Dialog
        open={viewTicketOpen}
        onOpenChange={(open) => {
          setViewTicketOpen(open);
          if (!open) {
            setTimeout(() => {
              document.body.style.pointerEvents = "";
            }, 250);
          }
        }}
      >
        <DialogContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            document.body.style.pointerEvents = "";
          }}
          className="max-w-md bg-white border border-neutral-200 p-0 overflow-hidden font-work-sans text-neutral-900"
        >
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E5C170]">
                InviteOly Digital Ticket
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C39B4C]/20 border border-[#C39B4C]/40 text-[#E5C170]">
                {selectedTicket?.status}
              </span>
            </div>
            <h3 className="text-lg font-bold font-space-grotesk mt-2">
              {event.eventName}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {event.venue} · {event.eventDate}
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* QR Code Container */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-3">
              <div className="size-40 mx-auto bg-white p-2.5 rounded-xl border border-neutral-300 shadow-xs flex items-center justify-center">
                <QrCode className="size-36 text-neutral-900" />
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-neutral-900">
                  {selectedTicket?.ticketNumber}
                </p>
                <p className="text-xs text-neutral-500">Single-scan entry verification</p>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <p className="text-neutral-400">Guest Name</p>
                <p className="font-bold text-neutral-900 mt-0.5">{selectedTicket?.name}</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <p className="text-neutral-400">Ticket Type</p>
                <p className="font-bold text-neutral-900 mt-0.5">{selectedTicket?.ticketType}</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <p className="text-neutral-400">Table / Seating</p>
                <p className="font-bold text-neutral-900 mt-0.5">{selectedTicket?.table || "Open Seating"}</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <p className="text-neutral-400">Check-in Status</p>
                <p className="font-bold text-neutral-900 mt-0.5">{selectedTicket?.checkInStatus}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  if (selectedTicket) handleCopyLink(selectedTicket);
                }}
                className="flex-1 py-2 rounded-xl bg-[#C39B4C] text-white text-xs font-semibold hover:bg-[#b08b41] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="size-3.5" />
                <span>Copy Ticket Link</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTicketOpen(false)}
                className="py-2 px-4 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* =========================================================================
          MODAL 2: EDIT TICKET DETAILS
          ========================================================================= */}
      <Dialog
        open={editTicketOpen}
        onOpenChange={(open) => {
          setEditTicketOpen(open);
          if (!open) {
            setTimeout(() => {
              document.body.style.pointerEvents = "";
            }, 250);
          }
        }}
      >
        <DialogContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            document.body.style.pointerEvents = "";
          }}
          className="max-w-md bg-white border border-neutral-200 p-6 font-work-sans text-neutral-900"
        >
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-space-grotesk">
              Edit Ticket Details ({selectedTicket?.ticketNumber})
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-500">
              Update guest details for customer support or seat reassignments.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4 pt-2 text-xs">
            <div className="space-y-1">
              <label className="font-medium text-neutral-700">Guest Name</label>
              <input
                type="text"
                required
                value={editForm.name}
                onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-neutral-700">Guest Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="guest@example.com"
                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-medium text-neutral-700">Ticket Type</label>
                <select
                  value={editForm.ticketType}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, ticketType: e.target.value }))}
                  className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
                >
                  <option value="General Admission">General Admission</option>
                  <option value="Adult">Adult</option>
                  <option value="VIP">VIP</option>
                  <option value="Child">Child</option>
                  <option value="Staff">Staff</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-neutral-700">Table / Seating</label>
                <input
                  type="text"
                  value={editForm.table}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, table: e.target.value }))}
                  placeholder="e.g. Table 8"
                  className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <button
                type="button"
                onClick={() => setEditTicketOpen(false)}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#C39B4C] text-white text-xs font-semibold hover:bg-[#b08b41] cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* =========================================================================
          MODAL 3: VIEW TICKET ACTIVITY TIMELINE
          ========================================================================= */}
      <Dialog
        open={activityModalOpen}
        onOpenChange={(open) => {
          setActivityModalOpen(open);
          if (!open) {
            setTimeout(() => {
              document.body.style.pointerEvents = "";
            }, 250);
          }
        }}
      >
        <DialogContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            document.body.style.pointerEvents = "";
          }}
          className="max-w-md bg-white border border-neutral-200 p-6 font-work-sans text-neutral-900"
        >
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-space-grotesk">
              Ticket Activity: {selectedTicket?.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-500">
              Audit timeline for {selectedTicket?.ticketNumber} ({selectedTicket?.status})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 pt-3">
            {selectedTicket?.activityHistory && selectedTicket.activityHistory.length > 0 ? (
              selectedTicket.activityHistory.map((act, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
                  <div className="size-2 rounded-full bg-[#C39B4C] mt-1.5 shrink-0" />
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-neutral-900">{act.title}</p>
                      <span className="text-[10px] text-neutral-400 font-mono">{act.timestamp}</span>
                    </div>
                    <p className="text-neutral-600 mt-0.5">{act.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-400 text-center py-6">
                No detailed activity history logged yet.
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <button
              type="button"
              onClick={() => setActivityModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
            >
              Done
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* =========================================================================
          MODAL 4: ADD GUEST MODAL
          ========================================================================= */}
      <Dialog
        open={addGuestOpen}
        onOpenChange={(open) => {
          setAddGuestOpen(open);
          if (!open) {
            setTimeout(() => {
              document.body.style.pointerEvents = "";
            }, 250);
          }
        }}
      >
        <DialogContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            document.body.style.pointerEvents = "";
          }}
          className="max-w-md bg-white border border-neutral-200 p-6 font-work-sans text-neutral-900"
        >
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-space-grotesk">
              Add New Guest to Event
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-500">
              Issue a secure ticket with custom seating and delivery preference.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddGuest} className="space-y-4 pt-2 text-xs">
            <div className="space-y-1">
              <label className="font-medium text-neutral-700">Full Name</label>
              <input
                type="text"
                required
                value={addForm.name}
                onChange={(e) => setAddForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Eleanor Vance"
                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-neutral-700">Email Address (Optional)</label>
              <input
                type="email"
                value={addForm.email}
                onChange={(e) => setAddForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="guest@example.com"
                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-medium text-neutral-700">Ticket Type</label>
                <select
                  value={addForm.ticketType}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, ticketType: e.target.value }))}
                  className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
                >
                  <option value="General Admission">General Admission</option>
                  <option value="Adult">Adult</option>
                  <option value="VIP">VIP</option>
                  <option value="Child">Child</option>
                  <option value="Staff">Staff</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-neutral-700">Table / Seating</label>
                <input
                  type="text"
                  value={addForm.table}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, table: e.target.value }))}
                  placeholder="e.g. Table 4"
                  className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-neutral-700">Delivery Method</label>
              <select
                value={addForm.deliveryMethod}
                onChange={(e) =>
                  setAddForm((prev) => ({
                    ...prev,
                    deliveryMethod: e.target.value as
                      | "Email"
                      | "Copied by Host"
                      | "Not delivered",
                  }))
                }
                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#C39B4C]"
              >
                <option value="Email">Email (Automatic Dispatch)</option>
                <option value="Copied by Host">Copied by Host (Direct Link)</option>
                <option value="Not delivered">Not delivered (Generate Only)</option>
              </select>
            </div>

            <DialogFooter className="pt-2">
              <button
                type="button"
                onClick={() => setAddGuestOpen(false)}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#C39B4C] text-white text-xs font-semibold hover:bg-[#b08b41] cursor-pointer shadow-xs"
              >
                Add Guest
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEventDetails;
