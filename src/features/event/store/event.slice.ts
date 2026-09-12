import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IHostEventItem,
  IHostTicketGuest,
  THostTicketStatus,
  THostEventStatus,
} from "../event.interface";
import {
  MOCK_HOST_EVENTS,
  MOCK_HOST_TICKETS,
} from "../data/hostEvent.data";

export type TicketFilterTab =
  | "all"
  | "editable"
  | "locked"
  | "sent"
  | "send"
  | "voided"
  | "rsvp";

export interface EventState {
  hostEvents: IHostEventItem[];
  selectedEventId: string;
  viewMode: "list" | "details";
  tickets: IHostTicketGuest[];
  activeFilter: TicketFilterTab;
  searchQuery: string;
  isAddGuestModalOpen: boolean;
  isScannerModalOpen: boolean;
}

const initialState: EventState = {
  hostEvents: MOCK_HOST_EVENTS,
  selectedEventId: "host-evt-1",
  viewMode: "list",
  tickets: MOCK_HOST_TICKETS,
  activeFilter: "all",
  searchQuery: "",
  isAddGuestModalOpen: false,
  isScannerModalOpen: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<"list" | "details">) => {
      state.viewMode = action.payload;
    },
    setSelectedEventId: (state, action: PayloadAction<string>) => {
      state.selectedEventId = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<TicketFilterTab>) => {
      state.activeFilter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsAddGuestModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddGuestModalOpen = action.payload;
    },
    setIsScannerModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isScannerModalOpen = action.payload;
    },
    addGuest: (
      state,
      action: PayloadAction<{
        guestName: string;
        guestEmail: string;
        ticketType: string;
        table: string;
      }>
    ) => {
      const nextNum = state.tickets.length + 1;
      const newTicket: IHostTicketGuest = {
        id: `t-${Date.now()}`,
        ticketId: `Guest ${String(nextNum).padStart(3, "0")}`,
        guestName: action.payload.guestName || "--",
        guestEmail: action.payload.guestEmail,
        table: action.payload.table || "A1",
        ticketType: action.payload.ticketType || "General Admission",
        rsvpStatus: "--",
        reminderStatus: "--",
        ticketLink: "Copy link",
        checkInTime: "--",
        status: "Editable",
      };
      state.tickets.unshift(newTicket);
    },
    updateTicketStatus: (
      state,
      action: PayloadAction<{ id: string; status: THostTicketStatus }>
    ) => {
      const item = state.tickets.find((t) => t.id === action.payload.id);
      if (item) {
        item.status = action.payload.status;
      }
    },
    sendReminderToTicket: (state, action: PayloadAction<string>) => {
      const item = state.tickets.find((t) => t.id === action.payload);
      if (item) {
        item.reminderStatus = "Reminder";
        item.status = "Sent";
      }
    },
    updateHostEventStatus: (
      state,
      action: PayloadAction<{
        id?: string;
        title?: string;
        status: THostEventStatus;
      }>
    ) => {
      const item = state.hostEvents.find(
        (e) =>
          (action.payload.id && e.id === action.payload.id) ||
          (action.payload.title && e.title === action.payload.title)
      );
      if (item) {
        item.status = action.payload.status;
      }
    },
  },
});

export const {
  setViewMode,
  setSelectedEventId,
  setActiveFilter,
  setSearchQuery,
  setIsAddGuestModalOpen,
  setIsScannerModalOpen,
  addGuest,
  updateTicketStatus,
  sendReminderToTicket,
  updateHostEventStatus,
} = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
