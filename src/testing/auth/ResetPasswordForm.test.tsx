import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// -----------------------------------------------------------------------------
// Mocks
// -----------------------------------------------------------------------------

// Mock the authentication hook used by ForgotPasswordForm
vi.mock("@/features/auth/hooks/useAuth", () => ({
    useAuth: () => ({
        handleResetPassword: vi.fn(),
        isLoading: false,
    }),
}));

// -----------------------------------------------------------------------------
// Test Suite: ForgotPasswordForm
// -----------------------------------------------------------------------------

describe("ResetPasswordForm", () => {
    // Simple test to verify the component renders and appears in the DOM
    it("renders and appears in the DOM", () => {
        render(<ResetPasswordForm />);

        // 1. Verify container is in the document
        const container = screen.getByTestId("reset-password-container");
        expect(container).toBeInTheDocument();

        // 2. Verify heading is rendered
        expect(
            screen.getByRole("heading", { name: /set new password/i })
        ).toBeInTheDocument();

        // 3. Verify form elements appear in the DOM
        expect(screen.getByTestId("reset-password-form")).toBeInTheDocument();
        expect(screen.getByTestId("reset-new-password-input")).toBeInTheDocument();
        expect(screen.getByTestId("reset-confirm-password-input")).toBeInTheDocument();
        expect(screen.getByTestId("reset-password-submit-button")).toBeInTheDocument();
        expect(screen.getByTestId("back-to-login-link")).toBeInTheDocument();
    });
});