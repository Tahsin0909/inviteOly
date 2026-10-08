import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import PartnerSettings from "@/features/user/components/partner/PartnerSettings";
import { updateProfileSchema } from "@/features/user/user.schema";
import { IRole, IUser } from "@/features/user/user.interface";

// -----------------------------------------------------------------------------
// Mocks
// -----------------------------------------------------------------------------

const mockHandleUpdateProfile = vi.fn();
const mockHandleUploadProfileImage = vi.fn();
const mockHandleRemoveProfileImage = vi.fn();
const mockHandleDeleteAccount = vi.fn();

let mockUser: Partial<IUser> | null = null;
let mockIsUpdatingProfile = false;
let mockIsUploadingImage = false;
let mockIsRemovingImage = false;
let mockIsDeletingAccount = false;
let mockRole = "PARTNER";

vi.mock("@/features/user/hooks/useUser", () => ({
  useUser: () => ({
    user: mockUser,
    isProfileLoading: false,
    isUpdatingProfile: mockIsUpdatingProfile,
    isUploadingImage: mockIsUploadingImage,
    isRemovingImage: mockIsRemovingImage,
    isDeletingAccount: mockIsDeletingAccount,
    handleUpdateProfile: mockHandleUpdateProfile,
    handleUploadProfileImage: mockHandleUploadProfileImage,
    handleRemoveProfileImage: mockHandleRemoveProfileImage,
    handleDeleteAccount: mockHandleDeleteAccount,
  }),
}));

vi.mock("@/features/auth/hooks/useAuth", () => ({
  useAuth: () => ({
    user: mockUser,
    getUserRole: () => mockRole,
  }),
}));

// Mock toast notifications
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(),
  },
}));

// -----------------------------------------------------------------------------
// Test Suite: User Profile & Settings Integration
// -----------------------------------------------------------------------------

describe("User Profile & Settings (user.test.tsx)", () => {
  const dummyPartnerUser: IUser = {
    id: "6ac72fefa08280f0ac3ca23c",
    firstName: "Shaima",
    lastName: "Hussain",
    name: "Shaima Hussain",
    email: "shaima@example.com",
    role: IRole.PARTNER,
    partnerType: "Venue",
    businessName: "Elite Events Co.",
    businessEmail: "shaima@example.com",
    phone: "+1(555)555-5555",
    website: "www.invitoly.com",
    address: "123 East St. San Francisco Ca 94112",
    businessAddress: "123 East St. San Francisco Ca 94112",
    profileImage: "https://example.com/avatar.png",
    status: "active",
    isVerified: true,
  };

  const dummyHostUser: IUser = {
    id: "6ac72fefa08280f0ac3ca999",
    firstName: "Robert",
    lastName: "Gilmore",
    name: "Robert Gilmore",
    email: "robert@example.com",
    role: IRole.HOST,
    partnerType: null,
    businessName: null,
    businessEmail: "robert@example.com",
    phone: "+1(555)111-2222",
    website: null,
    address: "456 Market St",
    businessAddress: null,
    profileImage: null,
    status: "active",
    isVerified: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = dummyPartnerUser;
    mockRole = "PARTNER";
    mockIsUpdatingProfile = false;
    mockIsUploadingImage = false;
    mockIsRemovingImage = false;
    mockIsDeletingAccount = false;
  });

  // ===========================================================================
  // 1. Initial Rendering Tests (GET /user/me display)
  // ===========================================================================
  describe("Initial Rendering & Profile Data Display (GET /user/me)", () => {
    it("renders user avatar, name, and email in the header card", () => {
      render(<PartnerSettings />);

      expect(screen.getByTestId("profile-name")).toHaveTextContent("Shaima Hussain");
      expect(screen.getByTestId("profile-email")).toHaveTextContent("shaima@example.com");
      expect(screen.getByTestId("avatar-image")).toBeInTheDocument();
    });

    it("populates contact information fields with fetched user data", () => {
      render(<PartnerSettings />);

      expect(screen.getByTestId("first-name-input")).toHaveValue("Shaima");
      expect(screen.getByTestId("last-name-input")).toHaveValue("Hussain");
      expect(screen.getByTestId("role-input")).toHaveValue("PARTNER");
      expect(screen.getByTestId("partner-type-input")).toHaveValue("Venue");
      expect(screen.getByTestId("business-name-input")).toHaveValue("Elite Events Co.");
      expect(screen.getByTestId("email-input")).toHaveValue("shaima@example.com");
      expect(screen.getByTestId("phone-input")).toHaveValue("+1(555)555-5555");
      expect(screen.getByTestId("website-input")).toHaveValue("www.invitoly.com");
      expect(screen.getByTestId("address-input")).toHaveValue("123 East St. San Francisco Ca 94112");
    });

    it("ensures email field is disabled and read-only as specified", () => {
      render(<PartnerSettings />);

      const emailInput = screen.getByTestId("email-input");
      expect(emailInput).toBeDisabled();
      expect(emailInput).toHaveAttribute("readonly");
    });

    it("ensures role field is disabled and read-only", () => {
      render(<PartnerSettings />);

      const roleInput = screen.getByTestId("role-input");
      expect(roleInput).toBeDisabled();
      expect(roleInput).toHaveAttribute("readonly");
    });
  });

  // ===========================================================================
  // 2. Role-Based Rendering (Partner vs Host)
  // ===========================================================================
  describe("Role-Based Rendering (Partner vs Host)", () => {
    it("renders Bank & Payout Information section for PARTNER role", () => {
      mockRole = "PARTNER";
      mockUser = dummyPartnerUser;
      render(<PartnerSettings />);

      expect(screen.getByText(/bank & payout information/i)).toBeInTheDocument();
    });

    it("does NOT render Bank & Payout Information section for HOST role", () => {
      mockRole = "HOST";
      mockUser = dummyHostUser;
      render(<PartnerSettings />);

      expect(screen.queryByText(/bank & payout information/i)).not.toBeInTheDocument();
    });
  });

  // ===========================================================================
  // 3. Profile Update Integration (PATCH /user/me)
  // ===========================================================================
  describe("Profile Update (PATCH /user/me)", () => {
    it("submits updated contact information successfully", async () => {
      mockHandleUpdateProfile.mockResolvedValueOnce({
        ...dummyPartnerUser,
        firstName: "Shaima Updated",
        lastName: "Hussain Updated",
        name: "Shaima Updated Hussain Updated",
        businessName: "Updated Events Ltd.",
      });

      render(<PartnerSettings />);

      const firstNameInput = screen.getByTestId("first-name-input");
      const businessNameInput = screen.getByTestId("business-name-input");
      const saveBtn = screen.getByTestId("save-profile-btn");

      fireEvent.change(firstNameInput, { target: { value: "Shaima Updated" } });
      fireEvent.change(businessNameInput, { target: { value: "Updated Events Ltd." } });
      fireEvent.click(saveBtn);

      await waitFor(() => {
        expect(mockHandleUpdateProfile).toHaveBeenCalledTimes(1);
        expect(mockHandleUpdateProfile).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: "Shaima Updated",
            lastName: "Hussain",
            businessName: "Updated Events Ltd.",
            email: "shaima@example.com",
            address: "123 East St. San Francisco Ca 94112",
          })
        );
      });
    });

    it("validates that first name cannot be empty", async () => {
      render(<PartnerSettings />);

      const firstNameInput = screen.getByTestId("first-name-input");
      const saveBtn = screen.getByTestId("save-profile-btn");

      fireEvent.change(firstNameInput, { target: { value: "" } });
      fireEvent.click(saveBtn);

      await waitFor(() => {
        expect(mockHandleUpdateProfile).not.toHaveBeenCalled();
      });
    });

    it("validates that last name cannot be empty", async () => {
      render(<PartnerSettings />);

      const lastNameInput = screen.getByTestId("last-name-input");
      const saveBtn = screen.getByTestId("save-profile-btn");

      fireEvent.change(lastNameInput, { target: { value: "" } });
      fireEvent.click(saveBtn);

      await waitFor(() => {
        expect(mockHandleUpdateProfile).not.toHaveBeenCalled();
      });
    });
  });

  // ===========================================================================
  // 4. Profile Photo Update & Removal
  // ===========================================================================
  describe("Profile Photo Management (POST /upload-profile-image & DELETE /remove-profile-image)", () => {
    it("uploads a new profile image when valid image file is chosen", async () => {
      mockHandleUploadProfileImage.mockResolvedValueOnce({
        ...dummyPartnerUser,
        profileImage: "https://res.cloudinary.com/new-image.png",
      });

      render(<PartnerSettings />);

      const fileInput = screen.getByTestId("avatar-file-input");
      const validFile = new File(["test image content"], "avatar.png", {
        type: "image/png",
      });

      fireEvent.change(fileInput, { target: { files: [validFile] } });

      await waitFor(() => {
        expect(mockHandleUploadProfileImage).toHaveBeenCalledTimes(1);
        expect(mockHandleUploadProfileImage).toHaveBeenCalledWith(validFile);
      });
    });

    it("removes profile photo when Remove Photo button is clicked", async () => {
      mockHandleRemoveProfileImage.mockResolvedValueOnce({
        success: true,
        message: "Profile photo removed successfully",
      });

      render(<PartnerSettings />);

      const removeBtn = screen.getByTestId("remove-photo-btn");
      fireEvent.click(removeBtn);

      await waitFor(() => {
        expect(mockHandleRemoveProfileImage).toHaveBeenCalledTimes(1);
      });
    });
  });

  // ===========================================================================
  // 5. Account Deletion (DELETE /user/me)
  // ===========================================================================
  describe("Account Deletion (DELETE /user/me)", () => {
    it("opens confirmation modal when Delete Account button is clicked", () => {
      render(<PartnerSettings />);

      const openModalBtn = screen.getByTestId("open-delete-modal-btn");
      fireEvent.click(openModalBtn);

      expect(screen.getByTestId("delete-account-modal")).toBeInTheDocument();
      expect(screen.getByText(/are you sure you want to permanently delete your account/i)).toBeInTheDocument();
    });

    it("closes confirmation modal when Cancel is clicked", () => {
      render(<PartnerSettings />);

      const openModalBtn = screen.getByTestId("open-delete-modal-btn");
      fireEvent.click(openModalBtn);

      expect(screen.getByTestId("delete-account-modal")).toBeInTheDocument();

      const cancelBtn = screen.getByTestId("cancel-delete-btn");
      fireEvent.click(cancelBtn);

      expect(screen.queryByTestId("delete-account-modal")).not.toBeInTheDocument();
      expect(mockHandleDeleteAccount).not.toHaveBeenCalled();
    });

    it("calls handleDeleteAccount when confirming delete in the modal", async () => {
      mockHandleDeleteAccount.mockResolvedValueOnce({ success: true });

      render(<PartnerSettings />);

      const openModalBtn = screen.getByTestId("open-delete-modal-btn");
      fireEvent.click(openModalBtn);

      const confirmBtn = screen.getByTestId("confirm-delete-btn");
      fireEvent.click(confirmBtn);

      await waitFor(() => {
        expect(mockHandleDeleteAccount).toHaveBeenCalledTimes(1);
      });
    });
  });

  // ===========================================================================
  // 6. Schema Validation Tests (updateProfileSchema)
  // ===========================================================================
  describe("updateProfileSchema Validation", () => {
    it("validates valid profile update payload successfully", () => {
      const validData = {
        firstName: "Shaima",
        lastName: "Hussain",
        partnerType: "Venue",
        businessName: "Elite Events Co.",
        email: "john.doe@example.com",
        phone: "+1(555)555-5555",
        website: "www.invitoly.com",
        address: "123 East St. San Francisco Ca 94112",
      };

      const result = updateProfileSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("fails when firstName is empty", () => {
      const invalidData = {
        firstName: "",
        lastName: "Hussain",
        email: "john.doe@example.com",
      };

      const result = updateProfileSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("First name is required");
      }
    });

    it("fails when lastName is empty", () => {
      const invalidData = {
        firstName: "Shaima",
        lastName: "",
        email: "john.doe@example.com",
      };

      const result = updateProfileSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Last name is required");
      }
    });

    it("fails when email is invalid format", () => {
      const invalidData = {
        firstName: "Shaima",
        lastName: "Hussain",
        email: "not-an-email",
      };

      const result = updateProfileSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Please enter a valid email address");
      }
    });
  });
});

