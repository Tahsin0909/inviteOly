import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialMarketingMaterials,
  initialMarketingStats,
  partnerMarketingAssets,
} from "../data/marketing.data";
import { IMarketing, IMarketingStats } from "../marketing.interface";

export type TMarketingTab =
  | "All Materials"
  | "Partner Materials"
  | "Host Materials"
  | "Both Audiences";

export type TDrawerMode = "create" | "details" | "edit";

export interface MarketingState {
  materials: IMarketing[];
  partnerAssets: IMarketing[];
  stats: IMarketingStats;
  isDrawerOpen: boolean;
  drawerMode: TDrawerMode;
  selectedMaterial: IMarketing | null;
  activeTab: TMarketingTab;
  searchQuery: string;
}

const initialState: MarketingState = {
  materials: initialMarketingMaterials,
  partnerAssets: partnerMarketingAssets,
  stats: initialMarketingStats,
  isDrawerOpen: false,
  drawerMode: "create",
  selectedMaterial: null,
  activeTab: "All Materials",
  searchQuery: "",
};

export const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {
    openCreateDrawer: (state) => {
      state.isDrawerOpen = true;
      state.drawerMode = "create";
      state.selectedMaterial = null;
    },
    openDetailsDrawer: (state, action: PayloadAction<IMarketing>) => {
      state.isDrawerOpen = true;
      state.drawerMode = "details";
      state.selectedMaterial = action.payload;
    },
    openEditDrawer: (state, action: PayloadAction<IMarketing>) => {
      state.isDrawerOpen = true;
      state.drawerMode = "edit";
      state.selectedMaterial = action.payload;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
      state.selectedMaterial = null;
    },
    addMaterial: (state, action: PayloadAction<IMarketing>) => {
      state.materials.unshift(action.payload);
      state.stats.totalMaterials += 1;
      if (action.payload.audience === "Partner") {
        state.stats.partnerMaterials += 1;
      } else if (action.payload.audience === "Host") {
        state.stats.hostMaterials += 1;
      }
    },
    updateMaterial: (state, action: PayloadAction<IMarketing>) => {
      const index = state.materials.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.materials[index] = action.payload;
      }
      if (state.selectedMaterial?.id === action.payload.id) {
        state.selectedMaterial = action.payload;
      }
    },
    deleteMaterial: (state, action: PayloadAction<string>) => {
      const target = state.materials.find((m) => m.id === action.payload);
      if (target) {
        state.stats.totalMaterials = Math.max(0, state.stats.totalMaterials - 1);
        if (target.audience === "Partner") {
          state.stats.partnerMaterials = Math.max(0, state.stats.partnerMaterials - 1);
        } else if (target.audience === "Host") {
          state.stats.hostMaterials = Math.max(0, state.stats.hostMaterials - 1);
        }
      }
      state.materials = state.materials.filter((m) => m.id !== action.payload);
      if (state.selectedMaterial?.id === action.payload) {
        state.isDrawerOpen = false;
        state.selectedMaterial = null;
      }
    },
    setActiveTab: (state, action: PayloadAction<TMarketingTab>) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { } = marketingSlice.actions;
export const {
  openCreateDrawer,
  openDetailsDrawer,
  openEditDrawer,
  closeDrawer,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  setActiveTab,
  setSearchQuery,
} = marketingSlice.actions;

export const marketingReducer = marketingSlice.reducer;
