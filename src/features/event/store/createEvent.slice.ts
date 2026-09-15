import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICreateEventState,
  ICreateEventPackageState,
  ICreateEventDetailsForm,
  ICreateEventSettingsForm,
  IUploadedGuestList,
  IGuestManualEntry,
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

const initialState: ICreateEventState = {
  currentStep: 1,
  packageSelection: defaultPackage,
  eventDetails: defaultDetails,
  eventSettings: defaultSettings,
  uploadedGuestLists: defaultUploadedGuestLists,
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
  resetCreateEvent,
} = createEventSlice.actions;

export const createEventReducer = createEventSlice.reducer;

