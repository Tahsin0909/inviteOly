"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { IUser } from "../../user.interface";
import { PartnerAvatarHeader } from "./PartnerAvatarHeader";
import { PartnerContactInfo, PartnerContactInfoFormData } from "./PartnerContactInfo";
import { PartnerBankInfo, PartnerBankInfoFormData } from "./PartnerBankInfo";
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
  const { getUserRole, user } = useAuth();
  const activeUser = initialUser || user;

  const currentRole = (
    activeUser?.role ||
    user?.role ||
    getUserRole() ||
    "PARTNER"
  ).toUpperCase();

  const isPartner = currentRole === "PARTNER";

  // 1. Profile State initialized with exact values from design specification
  const [profile, setProfile] = useState({
    name: activeUser?.firstName
      ? `${activeUser.firstName} ${activeUser.lastName || ""}`.trim()
      : "Alex Johnson",
    email: activeUser?.email || "alex.johnson@email.com",
    avatar:
      activeUser?.profileImage ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  });

  // 2. Contact Information State
  const [contactInfo, setContactInfo] = useState<PartnerContactInfoFormData>({
    firstName: activeUser?.firstName || "Shaima",
    lastName: activeUser?.lastName || "Hussain",
    role: activeUser?.role || "Partner",
    partnerType: activeUser?.partnerType || "Venue",
    businessName: activeUser?.businessName || "Elite Events Co.",
    businessEmail: activeUser?.businessEmail || "john.doe@example.com",
    phone: activeUser?.phone || "+(000)000-XXXX",
    website: activeUser?.website || "www.invitoly.com",
    businessAddress: activeUser?.businessAddress || "",
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // 3. Bank & Payout Information State
  const [bankInfo, setBankInfo] = useState<PartnerBankInfoFormData>({
    accountHolderName:
      initialUser?.accountHolderName ||
      initialUser?.businessName ||
      "Elite Events Co. LLC",
    bankName: initialUser?.bankName || "JPMorgan Chase Bank",
    routingNumber: initialUser?.routingNumber || "021000021",
    accountNumber: initialUser?.accountNumber || "1234567890",
    accountType:
      (initialUser?.accountType as "checking" | "savings" | "business") ||
      "business",
    swiftCode: initialUser?.swiftCode || "CHASUS33",
  });

  const [isSavingBank, setIsSavingBank] = useState(false);

  // Synchronize state when auth user loads
  useEffect(() => {
    if (user) {
      if (user.firstName || user.lastName) {
        setProfile((prev) => ({
          ...prev,
          name:
            `${user.firstName || ""} ${user.lastName || ""}`.trim() || prev.name,
          email: user.email || prev.email,
          avatar: user.profileImage || prev.avatar,
        }));
      }
      setContactInfo((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        role: user.role || prev.role,
        partnerType: user.partnerType || prev.partnerType,
        businessName: user.businessName || prev.businessName,
        businessEmail: user.businessEmail || prev.businessEmail,
        phone: user.phone || prev.phone,
        website: user.website || prev.website,
        businessAddress: user.businessAddress || prev.businessAddress,
      }));
      if (user.accountHolderName || user.bankName || user.accountNumber) {
        setBankInfo((prev) => ({
          ...prev,
          accountHolderName: user.accountHolderName || prev.accountHolderName,
          bankName: user.bankName || prev.bankName,
          routingNumber: user.routingNumber || prev.routingNumber,
          accountNumber: user.accountNumber || prev.accountNumber,
          accountType:
            (user.accountType as "checking" | "savings" | "business") ||
            prev.accountType,
          swiftCode: user.swiftCode || prev.swiftCode,
        }));
      }
    }
  }, [user]);

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

  // Handle bank info input change
  const handleBankInfoChange = (
    field: keyof PartnerBankInfoFormData,
    value: string
  ) => {
    setBankInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Save bank & payout information
  const handleSaveBankInfo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bankInfo.accountHolderName.trim()) {
      toast.error("Please enter the account holder name");
      return;
    }
    if (!bankInfo.bankName.trim()) {
      toast.error("Please enter the bank name");
      return;
    }
    if (!bankInfo.routingNumber.trim()) {
      toast.error("Please enter the routing number");
      return;
    }
    if (!bankInfo.accountNumber.trim()) {
      toast.error("Please enter the account number");
      return;
    }

    setIsSavingBank(true);
    setTimeout(() => {
      setIsSavingBank(false);
      toast.success("Bank & payout information updated successfully");
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

      {/* CARD 3: Bank & Payout Information (Only visible for Partners) */}
      {isPartner && (
        <PartnerBankInfo
          data={bankInfo}
          onChange={handleBankInfoChange}
          onSubmit={handleSaveBankInfo}
          isSaving={isSavingBank}
        />
      )}

      {/* CARD 4: Security */}
      <PartnerSecurity onUpdatePassword={handleUpdatePassword} />

      {/* CARD 5: Danger Zone */}
      <PartnerDangerZone onDeleteAccount={handleDeleteAccount} />
    </div>
  );
};

export default PartnerSettings;

