"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { IUser } from "../../user.interface";
import { PartnerAvatarHeader } from "./PartnerAvatarHeader";
import { PartnerContactInfo, PartnerContactInfoFormData } from "./PartnerContactInfo";
import { PartnerSecurity } from "./PartnerSecurity";
import { PartnerDangerZone } from "./PartnerDangerZone";

interface PartnerSettingsProps {
  initialUser?: Partial<IUser>;
  className?: string;
}

export const PartnerSettings: React.FC<PartnerSettingsProps> = ({
  initialUser,
  className,
}) => {
  // 1. Profile State initialized with exact values from design specification
  const [profile, setProfile] = useState({
    name: initialUser?.firstName
      ? `${initialUser.firstName} ${initialUser.lastName || ""}`.trim()
      : "Alex Johnson",
    email: initialUser?.email || "alex.johnson@email.com",
    avatar:
      initialUser?.profileImage ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  });

  // 2. Contact Information State
  const [contactInfo, setContactInfo] = useState<PartnerContactInfoFormData>({
    firstName: initialUser?.firstName || "Shaima",
    lastName: initialUser?.lastName || "Hussain",
    role: initialUser?.role || "Partner",
    partnerType: initialUser?.partnerType || "Venue",
    businessName: initialUser?.businessName || "Elite Events Co.",
    businessEmail: initialUser?.businessEmail || "john.doe@example.com",
    phone: initialUser?.phone || "+(000)000-XXXX",
    website: initialUser?.website || "www.invitoly.com",
    businessAddress: initialUser?.businessAddress || "",
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Handle avatar upload preview
  const handleUploadPhoto = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: previewUrl }));
    toast.success("Profile photo uploaded successfully");
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setProfile((prev) => ({
      ...prev,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    }));
    toast.info("Profile photo removed");
  };

  // Handle contact info input change
  const handleContactInfoChange = (
    field: keyof PartnerContactInfoFormData,
    value: string
  ) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Save personal & contact information
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);

    setTimeout(() => {
      setIsSavingProfile(false);
      // Synchronize the display name in the top card
      const updatedDisplayName = `${contactInfo.firstName} ${contactInfo.lastName}`.trim();
      if (updatedDisplayName) {
        setProfile((prev) => ({ ...prev, name: updatedDisplayName }));
      }
      toast.success("Personal & contact information saved successfully");
    }, 400);
  };

  // Update password callback
  const handleUpdatePassword = () => {
    // Handled in PartnerSecurity with validation and toast
  };

  // Delete account callback
  const handleDeleteAccount = () => {
    toast.error("Account deletion request submitted");
  };

  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto space-y-5 sm:space-y-6 font-work-sans pb-12",
        className
      )}
    >
      {/* CARD 1: Profile Photo Header */}
      <PartnerAvatarHeader
        name={profile.name}
        email={profile.email}
        avatar={profile.avatar}
        onUploadPhoto={handleUploadPhoto}
        onRemovePhoto={handleRemovePhoto}
      />

      {/* CARD 2: Personal & Contact Information */}
      <PartnerContactInfo
        data={contactInfo}
        onChange={handleContactInfoChange}
        onSubmit={handleSaveProfile}
        isSaving={isSavingProfile}
      />

      {/* CARD 3: Security */}
      <PartnerSecurity onUpdatePassword={handleUpdatePassword} />

      {/* CARD 4: Danger Zone */}
      <PartnerDangerZone onDeleteAccount={handleDeleteAccount} />
    </div>
  );
};

export default PartnerSettings;

