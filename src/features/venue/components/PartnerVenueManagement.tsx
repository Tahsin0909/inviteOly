"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PartnerVenueList from "./PartnerVenueList";
import VenueDetails from "./VenueDetails";
import VenueDrawer from "./VenueDrawer";

export const PartnerVenueManagement: React.FC = () => {
  const { activeView, selectedVenue } = useSelector(
    (state: RootState) => state.venue
  );

  return (
    <div className="w-full">
      {activeView === "details" && selectedVenue ? (
        <VenueDetails />
      ) : (
        <PartnerVenueList />
      )}

      {/* Central Stepped Venue Drawer */}
      <VenueDrawer />
    </div>
  );
};

export default PartnerVenueManagement;

