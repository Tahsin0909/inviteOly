import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHostInvite } from "../hostandpartner.interface";
import { initialHostInvites } from "../data/hostandpartner.data";
import { IPricingPlan } from "@/features/payment/payment.interface";
import { INVITE_PRICING_TIERS } from "@/features/payment/data/pricingData";

export interface HostandpartnerState {
  invites: IHostInvite[];
  selectedInvite: IHostInvite | null;
  activeView: "list" | "select-plan" | "invite-form";
  selectedTierId: string;
  selectedPlan: IPricingPlan | null;
}

const initialState: HostandpartnerState = {
  invites: initialHostInvites,
  selectedInvite: null,
  activeView: "list",
  selectedTierId: "intimate",
  selectedPlan: INVITE_PRICING_TIERS[0].plans[0],
};

export const hostandpartnerSlice = createSlice({
  name: "hostandpartner",
  initialState,
  reducers: {
    setInvites: (state, action: PayloadAction<IHostInvite[]>) => {
      state.invites = action.payload;
    },
    setActiveView: (
      state,
      action: PayloadAction<"list" | "select-plan" | "invite-form">
    ) => {
      state.activeView = action.payload;
    },
    setSelectedTierId: (state, action: PayloadAction<string>) => {
      state.selectedTierId = action.payload;
      const tier = INVITE_PRICING_TIERS.find((t) => t.id === action.payload);
      if (tier && tier.plans.length > 0) {
        state.selectedPlan = tier.plans[0];
      }
    },
    setSelectedPlan: (state, action: PayloadAction<IPricingPlan>) => {
      state.selectedPlan = action.payload;
    },
    addInvite: (state, action: PayloadAction<IHostInvite>) => {
      state.invites.unshift(action.payload);
      state.activeView = "list";
    },
    cancelInvite: (state, action: PayloadAction<string>) => {
      const invite = state.invites.find((i) => i.id === action.payload);
      if (invite) {
        invite.status = "Declined";
      }
    },
    resetInviteFlow: (state) => {
      state.activeView = "list";
      state.selectedTierId = "intimate";
      state.selectedPlan = INVITE_PRICING_TIERS[0].plans[0];
    },
  },
});

export const {
  setInvites,
  setActiveView,
  setSelectedTierId,
  setSelectedPlan,
  addInvite,
  cancelInvite,
  resetInviteFlow,
} = hostandpartnerSlice.actions;

export const hostandpartnerReducer = hostandpartnerSlice.reducer;
