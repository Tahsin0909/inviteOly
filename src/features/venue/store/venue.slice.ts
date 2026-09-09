import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVenue, IVenueSpace } from "../venue.interface";
import { initialVenues } from "../data/venue.data";

export interface VenueState {
  venues: IVenue[];
  selectedVenue: IVenue | null;
  activeView: "list" | "details";
  isDrawerOpen: boolean;
  drawerMode: "create" | "edit" | "details";
  drawerStep: number;
  formDraft: Partial<IVenue>;
}

const defaultDraft: Partial<IVenue> = {
  name: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  capacity: undefined,
  parkingInfo: "",
  spaces: [],
};

const initialState: VenueState = {
  venues: initialVenues,
  selectedVenue: null,
  activeView: "list",
  isDrawerOpen: false,
  drawerMode: "create",
  drawerStep: 1,
  formDraft: defaultDraft,
};

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    setVenues: (state, action: PayloadAction<IVenue[]>) => {
      state.venues = action.payload;
    },
    setSelectedVenue: (state, action: PayloadAction<IVenue | null>) => {
      state.selectedVenue = action.payload;
    },
    setActiveView: (state, action: PayloadAction<"list" | "details">) => {
      state.activeView = action.payload;
    },
    openCreateDrawer: (state) => {
      state.isDrawerOpen = true;
      state.drawerMode = "create";
      state.drawerStep = 1;
      state.formDraft = { ...defaultDraft, spaces: [] };
    },
    openEditDrawer: (state, action: PayloadAction<IVenue>) => {
      state.isDrawerOpen = true;
      state.drawerMode = "edit";
      state.drawerStep = 1;
      state.selectedVenue = action.payload;
      state.formDraft = {
        ...action.payload,
        spaces: action.payload.spaces ? [...action.payload.spaces] : [],
      };
    },
    openDetailsDrawer: (state, action: PayloadAction<IVenue>) => {
      state.isDrawerOpen = true;
      state.drawerMode = "details";
      state.selectedVenue = action.payload;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
      state.drawerStep = 1;
      state.formDraft = defaultDraft;
    },
    setDrawerStep: (state, action: PayloadAction<number>) => {
      state.drawerStep = action.payload;
    },
    nextDrawerStep: (state) => {
      if (state.drawerStep < 3) {
        state.drawerStep += 1;
      }
    },
    prevDrawerStep: (state) => {
      if (state.drawerStep > 1) {
        state.drawerStep -= 1;
      }
    },
    updateFormDraft: (state, action: PayloadAction<Partial<IVenue>>) => {
      state.formDraft = {
        ...state.formDraft,
        ...action.payload,
      };
    },
    addSpaceToDraft: (state, action: PayloadAction<IVenueSpace>) => {
      if (!state.formDraft.spaces) {
        state.formDraft.spaces = [];
      }
      state.formDraft.spaces.push(action.payload);
    },
    removeSpaceFromDraft: (state, action: PayloadAction<number>) => {
      if (state.formDraft.spaces) {
        state.formDraft.spaces.splice(action.payload, 1);
      }
    },
    addVenue: (state, action: PayloadAction<IVenue>) => {
      state.venues.unshift(action.payload);
      state.isDrawerOpen = false;
      state.formDraft = defaultDraft;
    },
    updateVenue: (state, action: PayloadAction<IVenue>) => {
      const idx = state.venues.findIndex((v) => v.id === action.payload.id);
      if (idx !== -1) {
        state.venues[idx] = action.payload;
      }
      if (state.selectedVenue?.id === action.payload.id) {
        state.selectedVenue = action.payload;
      }
      state.isDrawerOpen = false;
    },
    deleteVenue: (state, action: PayloadAction<string>) => {
      state.venues = state.venues.filter((v) => v.id !== action.payload);
      if (state.selectedVenue?.id === action.payload) {
        state.selectedVenue = null;
        state.activeView = "list";
      }
    },
  },
});

export const {
  setVenues,
  setSelectedVenue,
  setActiveView,
  openCreateDrawer,
  openEditDrawer,
  openDetailsDrawer,
  closeDrawer,
  setDrawerStep,
  nextDrawerStep,
  prevDrawerStep,
  updateFormDraft,
  addSpaceToDraft,
  removeSpaceFromDraft,
  addVenue,
  updateVenue,
  deleteVenue,
} = venueSlice.actions;

export const venueReducer = venueSlice.reducer;
