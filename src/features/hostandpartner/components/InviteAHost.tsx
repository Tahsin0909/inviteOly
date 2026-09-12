"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HostInviteList from "./HostInviteList";
import ChooseExperience from "./ChooseExperience";
import InviteHostForm from "./InviteHostForm";

export const InviteAHost: React.FC = () => {
    const { activeView } = useSelector(
        (state: RootState) => state.hostandpartner
    );

    return (
        <div className="w-full">
            {activeView === "select-plan" && <ChooseExperience />}
            {activeView === "invite-form" && <InviteHostForm />}
            {activeView === "list" && <HostInviteList />}
        </div>
    );
};

export default InviteAHost;