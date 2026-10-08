"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import { IUser, IUpdateUserProfilePayload } from "../../user.interface";
import { PartnerAvatarHeader } from "./PartnerAvatarHeader";
import {
  PartnerContactInfo,
  PartnerContactInfoFormData,
} from "./PartnerContactInfo";
import { PartnerBankInfo, PartnerBankInfoFormData } from "./PartnerBankInfo";
import { PartnerSecurity } from "./PartnerSecurity";
import { PartnerDangerZone } from "./PartnerDangerZone";

interface PartnerSettingsProps {
  initialUser?: Partial<IUser>;
  className?: string;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";

export const PartnerSettings: React.FC<PartnerSettingsProps> = ({
  initialUser,
  className,
}) => {
  const { getUserRole, user: authUser } = useAuth();
  const {
    user: apiUser,
    isUpdatingProfile,
    isUploadingImage,
    isRemovingImage,
    isDeletingAccount,
    handleUpdateProfile,
    handleUploadProfileImage,
    handleRemoveProfileImage,
    handleDeleteAccount: performDeleteAccount,
  } = useUser();

  const activeUser = apiUser || initialUser || authUser;

  const currentRole = (
    activeUser?.role ||
    authUser?.role ||
    getUserRole() ||
    "PARTNER"
  ).toUpperCase();

  const isPartner = currentRole === "PARTNER";

  // 1. Profile Display State (Header card)
  const [profile, setProfile] = useState({
    name: activeUser?.firstName
      ? `${activeUser.firstName} ${activeUser.lastName || ""}`.trim()
      : activeUser?.name || "Alex Johnson",
    email: activeUser?.email || "alex.johnson@email.com",
    avatar: activeUser?.profileImage || DEFAULT_AVATAR,
  });

  // 2. Contact Information Form State
  const [contactInfo, setContactInfo] = useState<PartnerContactInfoFormData>({
    firstName: activeUser?.firstName || "",
    lastName: activeUser?.lastName || "",
    role: activeUser?.role || "Partner",
    partnerType: activeUser?.partnerType || "Venue",
    businessName: activeUser?.businessName || "",
    businessEmail: activeUser?.businessEmail || activeUser?.email || "",
    email: activeUser?.email || "",
    phone: activeUser?.phone || "",
    website: activeUser?.website || "",
    address: activeUser?.address || activeUser?.businessAddress || "",
    businessAddress: activeUser?.businessAddress || activeUser?.address || "",
  });

  // 3. Bank & Payout Information State (Preserved as requested)
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

  // Synchronize state when active user profile loads from API or Auth
  useEffect(() => {
    if (activeUser) {
      const computedName =
        activeUser.name ||
        `${activeUser.firstName || ""} ${activeUser.lastName || ""}`.trim();

      setProfile({
        name: computedName || "Alex Johnson",
        email: activeUser.email || "alex.johnson@email.com",
        avatar: activeUser.profileImage || DEFAULT_AVATAR,
      });

      setContactInfo({
        firstName: activeUser.firstName || "",
        lastName: activeUser.lastName || "",
        role: activeUser.role || "Partner",
        partnerType: activeUser.partnerType || "Venue",
        businessName: activeUser.businessName || "",
        businessEmail: activeUser.businessEmail || activeUser.email || "",
        email: activeUser.email || "",
        phone: activeUser.phone || "",
        website: activeUser.website || "",
        address: activeUser.address || activeUser.businessAddress || "",
        businessAddress:
          activeUser.businessAddress || activeUser.address || "",
      });

      if (
        activeUser.accountHolderName ||
        activeUser.bankName ||
        activeUser.accountNumber
      ) {
        setBankInfo((prev) => ({
          ...prev,
          accountHolderName:
            activeUser.accountHolderName || prev.accountHolderName,
          bankName: activeUser.bankName || prev.bankName,
          routingNumber: activeUser.routingNumber || prev.routingNumber,
          accountNumber: activeUser.accountNumber || prev.accountNumber,
          accountType:
            (activeUser.accountType as
              | "checking"
              | "savings"
              | "business") || prev.accountType,
          swiftCode: activeUser.swiftCode || prev.swiftCode,
        }));
      }
    }
  }, [activeUser]);

  // Handle avatar upload: POST /user/upload-profile-image (FormData, key: image)
  const handleUploadPhoto = async (file: File) => {
    try {
      const updatedUser = await handleUploadProfileImage(file);
      if (updatedUser?.profileImage) {
        setProfile((prev) => ({ ...prev, avatar: updatedUser.profileImage! }));
      }
    } catch {
      // Error handled with toast in useUser
    }
  };

  // Handle remove avatar: DELETE /user/remove-profile-image
  const handleRemovePhoto = async () => {
    try {
      await handleRemoveProfileImage();
      setProfile((prev) => ({
        ...prev,
        avatar: DEFAULT_AVATAR,
      }));
    } catch {
      // Error handled with toast in useUser
    }
  };

  // Handle contact info input change
  const handleContactInfoChange = (
    field: keyof PartnerContactInfoFormData,
    value: string
  ) => {
    setContactInfo((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "address") {
        updated.businessAddress = value;
      } else if (field === "businessAddress") {
        updated.address = value;
      }
      return updated;
    });
  };

  // Save profile information: PATCH /user/me
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactInfo.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    if (!contactInfo.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }

    try {
      const payload: IUpdateUserProfilePayload = {
        firstName: contactInfo.firstName.trim(),
        lastName: contactInfo.lastName.trim(),
        partnerType: contactInfo.partnerType || null,
        businessName: contactInfo.businessName || null,
        email: contactInfo.email || activeUser?.email,
        phone: contactInfo.phone || null,
        website: contactInfo.website || null,
        address:
          contactInfo.address || contactInfo.businessAddress || null,
        businessAddress:
          contactInfo.businessAddress || contactInfo.address || null,
      };

      const updated = await handleUpdateProfile(payload);
      if (updated) {
        const updatedDisplayName =
          updated.name ||
          `${updated.firstName || ""} ${updated.lastName || ""}`.trim();
        if (updatedDisplayName) {
          setProfile((prev) => ({ ...prev, name: updatedDisplayName }));
        }
      }
    } catch {
      // Error handled with toast in useUser
    }
  };

  // Handle bank info input change
  const handleBankInfoChange = (
    field: keyof PartnerBankInfoFormData,
    value: string
  ) => {
    setBankInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Save bank & payout information (preserved as is)
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

  // Delete account: DELETE /user/me
  const handleDeleteAccount = async () => {
    try {
      await performDeleteAccount();
    } catch {
      // Error handled with toast in useUser
    }
  };

  return (
    <div
      data-testid="partner-settings"
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
        isUploading={isUploadingImage}
        isRemoving={isRemovingImage}
      />

      {/* CARD 2: Personal & Contact Information */}
      <PartnerContactInfo
        data={contactInfo}
        onChange={handleContactInfoChange}
        onSubmit={handleSaveProfile}
        isSaving={isUpdatingProfile}
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
      <PartnerDangerZone
        onDeleteAccount={handleDeleteAccount}
        isDeleting={isDeletingAccount}
      />
    </div>
  );
};

export default PartnerSettings;
