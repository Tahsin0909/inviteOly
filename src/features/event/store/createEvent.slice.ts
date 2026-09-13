import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICreateEventState,
  ICreateEventPackageState,
  ICreateEventDetailsForm,
  ICreateEventSettingsForm,
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

const initialState: ICreateEventState = {
  currentStep: 1,
  packageSelection: defaultPackage,
  eventDetails: defaultDetails,
  eventSettings: defaultSettings,
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
    resetCreateEvent: () => initialState,
  },
});

export const {
  setCurrentStep,
  setPackageSelection,
  setEventDetails,
  setEventSettings,
  resetCreateEvent,
} = createEventSlice.actions;

export const createEventReducer = createEventSlice.reducer;

