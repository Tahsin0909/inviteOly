import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICreateEventState,
  ICreateEventPackageState,
  ICreateEventDetailsForm,
  ICreateEventSettingsForm,
  IUploadedGuestList,
  IGuestManualEntry,
  IEventPreviewGuest,
} from "../event.interface";

const defaultPackage: ICreateEventPackageState = {
  category: "intimate",
  tier: "standard",
  packageName: "Standard",
  price: "$149",
  guestRange: "Up To 200",
  features: [
    "Secure QR-Code Tickets For A Premium Guest Entry Experience",
    "Easy-To-Use Host Dashboard To Manage And Send Tickets From",
    "Downloadable PDF Guest List",
    "Assign Unnamed Tickets To Guests Directly From Your Dashboard For Easy, Accurate Tracking.",
    "Easy-To-Use Scanning App For Fast, Secure Ticket Verification At Entry.",
    "Dedicated Customer Support",
  ],
};

const defaultDetails: ICreateEventDetailsForm = {
  hostName: "",
  email: "",
  phone: "",
  eventName: "",
  eventType: "",
  eventDescription: "",
  eventDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  ageRestriction: "",
  idRequirement: "",
  dressCode: "",
  ticketRequirementAge: "",
};

const defaultSettings: ICreateEventSettingsForm = {
  venue: "",
  room: "",
  address: "",
  state: "",
  venueState: "",
  city: "",
  postalCode: "",
  venueContact: "",
  venueGuestCapacity: "",
  estimateGuestCount: "",
  ticketNote: "",
};

export const defaultUploadedGuestLists: IUploadedGuestList[] = [
  { id: "1", ticketType: "Adult", guestsCount: 214, status: "ready" },
  { id: "2", ticketType: "Child", guestsCount: 56, status: "ready" },
  { id: "3", ticketType: "VIP", guestsCount: 176, status: "ready" },
  { id: "4", ticketType: "Staff", guestsCount: 142, status: "ready" },
];

export const defaultPreviewGuests: IEventPreviewGuest[] = [
  { id: "1", name: "Marcus Thorne", email: "example@gmail.com", ticketType: "General Admission", table: "A1" },
  { id: "2", name: "Dmitri Ivanov", email: "dmitri.ivanov@example.com", ticketType: "General Admission", table: "A3" },
  { id: "3", name: "Zaid Ali", email: "zaid.ali@example.com", ticketType: "Child", table: "A3" },
  { id: "4", name: "Ethan Brooks", email: "ethan.brooks@example.com", ticketType: "VIP", table: "A4" },
  { id: "5", name: "Raj Patel", email: "raj.patel@example.com", ticketType: "Staff", table: "A5" },
  { id: "6", name: "Sofia Petrov", email: "sofia.petrov@example.com", ticketType: "Vendor", table: "A6" },
  { id: "7", name: "Omar El-Sayed", email: "omar.elsayed@example.com", ticketType: "General Admission", table: "A7" },
  { id: "8", name: "Maya Nguyen", email: "maya.nguyen@example.com", ticketType: "VIP", table: "A8" },
  { id: "9", name: "Nina Johansson", email: "nina.johansson@example.com", ticketType: "Staff", table: "A9" },
  { id: "10", name: "Jasper Liu", email: "jasper.liu@example.com", ticketType: "Child", table: "A10" },
  { id: "11", name: "Lucia Ferrer", email: "lucia.ferrer@example.com", ticketType: "VIP", table: "A11" },
  { id: "12", name: "Anika Bose", email: "anika.bose@example.com", ticketType: "Staff", table: "A12" },
  { id: "13", name: "Chloe Martin", email: "chloe.martin@example.com", ticketType: "VIP", table: "A13" },
  { id: "14", name: "Elena Ramirez", email: "elena.ramirez@example.com", ticketType: "Vendor", table: "A14" },
  { id: "15", name: "Liam O'Connor", email: "liam.oconnor@example.com", ticketType: "Staff", table: "A15" },
  { id: "16", name: "Marcus Thorne", email: "example@gmail.com", ticketType: "VIP", table: "A16" },
  { id: "17", name: "Carlos Mendes", email: "carlos.mendes@example.com", ticketType: "Staff", table: "A17" },
];

const initialState: ICreateEventState = {
  currentStep: 1,
  packageSelection: defaultPackage,
  eventDetails: defaultDetails,
  eventSettings: defaultSettings,
  uploadedGuestLists: defaultUploadedGuestLists,
  previewGuests: defaultPreviewGuests,
};

export const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setPackageSelection: (
      state,
      action: PayloadAction<ICreateEventPackageState>
    ) => {
      state.packageSelection = action.payload;
    },
    setEventDetails: (
      state,
      action: PayloadAction<Partial<ICreateEventDetailsForm>>
    ) => {
      state.eventDetails = {
        ...state.eventDetails,
        ...action.payload,
      };
    },
    setEventSettings: (
      state,
      action: PayloadAction<Partial<ICreateEventSettingsForm>>
    ) => {
      state.eventSettings = {
        ...state.eventSettings,
        ...action.payload,
      };
    },
    setUploadedGuestLists: (
      state,
      action: PayloadAction<IUploadedGuestList[]>
    ) => {
      state.uploadedGuestLists = action.payload;
    },
    addUploadedGuestList: (
      state,
      action: PayloadAction<IUploadedGuestList>
    ) => {
      if (!state.uploadedGuestLists) {
        state.uploadedGuestLists = [];
      }
      const existingIdx = state.uploadedGuestLists.findIndex(
        (g) => g.ticketType.toLowerCase() === action.payload.ticketType.toLowerCase()
      );
      if (existingIdx !== -1) {
        state.uploadedGuestLists[existingIdx] = {
          ...state.uploadedGuestLists[existingIdx],
          guestsCount:
            state.uploadedGuestLists[existingIdx].guestsCount +
            action.payload.guestsCount,
          fileName: action.payload.fileName || state.uploadedGuestLists[existingIdx].fileName,
        };
      } else {
        state.uploadedGuestLists.push(action.payload);
      }
    },
    removeUploadedGuestList: (state, action: PayloadAction<string>) => {
      if (state.uploadedGuestLists) {
        state.uploadedGuestLists = state.uploadedGuestLists.filter(
          (g) => g.id !== action.payload
        );
      }
    },
    addManualGuest: (state, action: PayloadAction<IGuestManualEntry>) => {
      if (!state.uploadedGuestLists) {
        state.uploadedGuestLists = [];
      }
      const ticketType = action.payload.ticketType || "General";
      const existing = state.uploadedGuestLists.find(
        (g) => g.ticketType.toLowerCase() === ticketType.toLowerCase()
      );
      if (existing) {
        existing.guestsCount += 1;
      } else {
        state.uploadedGuestLists.push({
          id: Date.now().toString(),
          ticketType,
          guestsCount: 1,
          status: "ready",
        });
      }
    },
    setPreviewGuests: (state, action: PayloadAction<IEventPreviewGuest[]>) => {
      state.previewGuests = action.payload;
    },
    updatePreviewGuest: (state, action: PayloadAction<IEventPreviewGuest>) => {
      if (!state.previewGuests) return;
      const index = state.previewGuests.findIndex((g) => g.id === action.payload.id);
      if (index !== -1) {
        state.previewGuests[index] = action.payload;
      }
    },
    deletePreviewGuest: (state, action: PayloadAction<string>) => {
      if (!state.previewGuests) return;
      state.previewGuests = state.previewGuests.filter((g) => g.id !== action.payload);
    },
    resetCreateEvent: () => initialState,
  },
});

export const {
  setCurrentStep,
  setPackageSelection,
  setEventDetails,
  setEventSettings,
  setUploadedGuestLists,
  addUploadedGuestList,
  removeUploadedGuestList,
  addManualGuest,
  setPreviewGuests,
  updatePreviewGuest,
  deletePreviewGuest,
  resetCreateEvent,
} = createEventSlice.actions;

export const createEventReducer = createEventSlice.reducer;

