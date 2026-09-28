"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  closeDrawer,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  openEditDrawer,
} from "../store/marketing.slice";
import { CreateMarketing } from "./create-marketing/CreateMarketing";
import { MarketingDetails } from "./MarketingDetails";
import { IMarketing } from "../marketing.interface";

export const MarketingDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { isDrawerOpen, drawerMode, selectedMaterial } = useSelector(
    (state: RootState) => state.marketing
  );

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        dispatch(closeDrawer());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, dispatch]);

  if (!isDrawerOpen) return null;

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  const handleSubmit = (material: IMarketing) => {
    if (drawerMode === "edit") {
      dispatch(updateMaterial(material));
    } else {
      dispatch(addMaterial(material));
    }
  };

  const handleEdit = (material: IMarketing) => {
    dispatch(openEditDrawer(material));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteMaterial(id));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Panel from Right */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
          {drawerMode === "details" && selectedMaterial ? (
            <MarketingDetails
              material={selectedMaterial}
              onClose={handleClose}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <CreateMarketing
              initialData={drawerMode === "edit" ? selectedMaterial : null}
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingDrawer;

