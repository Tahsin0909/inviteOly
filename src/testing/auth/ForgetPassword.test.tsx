import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

// -----------------------------------------------------------------------------
// Mocks
// -----------------------------------------------------------------------------

// Mock the authentication hook to monitor handleForgotPassword calls and loading state
const mockHandleForgotPassword = vi.fn();
let mockIsLoading = false;

vi.mock("@/features/auth/hooks/useAuth", () => ({
    useAuth: () => ({
        handleForgotPassword: mockHandleForgotPassword,
        isLoading: mockIsLoading,
    }),
}));

// -----------------------------------------------------------------------------
// Test Suite: ForgotPasswordForm
// -----------------------------------------------------------------------------

describe("ForgotPasswordForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockIsLoading = false;
    });

    // ===========================================================================
    // 1. Initial Rendering Tests
    // ===========================================================================
    describe("Initial Rendering", () => {
        // Verifies the component renders and appears in the DOM
        it("renders and appears in the DOM", () => {
            render(<ForgotPasswordForm />);

            // Verify container is in the document
            expect(screen.getByTestId("forgot-password-container")).toBeInTheDocument();

            // Verify heading and subtitle are rendered
            expect(
                screen.getByRole("heading", { name: /forgot password\?/i })
            ).toBeInTheDocument();
            expect(
                screen.getByText(/enter your registered email and we'll send you a 6-digit verification code/i)
            ).toBeInTheDocument();

            // Verify form elements appear in the DOM
            expect(screen.getByTestId("forgot-password-form")).toBeInTheDocument();
            expect(screen.getByTestId("forgot-email-input")).toBeInTheDocument();
            expect(screen.getByTestId("forgot-password-submit-button")).toBeInTheDocument();
            expect(screen.getByTestId("back-to-login-link")).toBeInTheDocument();
        });
    });

    // ===========================================================================
    // 2. Email Validation Tests
    // ===========================================================================
    describe("Email Validation", () => {
        // Tests that submitting an empty form shows an email validation error
        it("displays an error message when submitting an empty email", async () => {
            render(<ForgotPasswordForm />);

            const submitButton = screen.getByTestId("forgot-password-submit-button");
            fireEvent.click(submitButton);

            // Wait for validation error to appear
            await waitFor(() => {
                expect(screen.getByTestId("forgot-email-error")).toBeInTheDocument();
            });

            expect(screen.getByTestId("forgot-email-error")).toHaveTextContent(
                "Invalid email address"
            );
            expect(mockHandleForgotPassword).not.toHaveBeenCalled();
        });

        // Tests that submitting with an invalid email format displays an error
        it("displays an error message when an invalid email format is entered", async () => {
            render(<ForgotPasswordForm />);

            const emailInput = screen.getByTestId("forgot-email-input");
            const submitButton = screen.getByTestId("forgot-password-submit-button");

            // Enter an invalid email format
            fireEvent.change(emailInput, { target: { value: "invalid-email-format" } });
            fireEvent.click(submitButton);

            // Verify error message is displayed
            await waitFor(() => {
                expect(screen.getByTestId("forgot-email-error")).toBeInTheDocument();
            });

            expect(screen.getByTestId("forgot-email-error")).toHaveTextContent(
                "Invalid email address"
            );
            expect(mockHandleForgotPassword).not.toHaveBeenCalled();
        });

        // Tests that submitting with email missing the domain shows an error
        it("displays an error message when email is missing domain or '@' sign", async () => {
            render(<ForgotPasswordForm />);

            const emailInput = screen.getByTestId("forgot-email-input");
            const submitButton = screen.getByTestId("forgot-password-submit-button");

            fireEvent.change(emailInput, { target: { value: "testuser@" } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByTestId("forgot-email-error")).toHaveTextContent(
                    "Invalid email address"
                );
            });

            expect(mockHandleForgotPassword).not.toHaveBeenCalled();
        });

        // Tests successful validation and submission with a valid email address
        it("submits successfully and calls handleForgotPassword when a valid email is provided", async () => {
            render(<ForgotPasswordForm />);

            const emailInput = screen.getByTestId("forgot-email-input");
            const submitButton = screen.getByTestId("forgot-password-submit-button");

            // Enter a valid email address
            fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
            fireEvent.click(submitButton);

            // Verify handleForgotPassword is called with the trimmed email
            await waitFor(() => {
                expect(mockHandleForgotPassword).toHaveBeenCalledTimes(1);
                expect(mockHandleForgotPassword).toHaveBeenCalledWith({
                    email: "john.doe@example.com",
                });
            });

            // No validation errors should be displayed
            expect(screen.queryByTestId("forgot-email-error")).not.toBeInTheDocument();
        });
    });

    // ===========================================================================
    // 3. Loading State & Accessibility
    // ===========================================================================
    describe("Loading State & Attributes", () => {
        // Tests that button is disabled and text updates when isLoading is true
        it("disables submit button and displays 'Sending code...' during loading state", () => {
            mockIsLoading = true;
            render(<ForgotPasswordForm />);

            const submitButton = screen.getByTestId("forgot-password-submit-button");
            expect(submitButton).toBeDisabled();
            expect(submitButton).toHaveTextContent("Sending code...");
        });

        // Tests accessible label linking and autocomplete attribute
        it("associates label with email input via htmlFor/id and includes proper autocomplete", () => {
            render(<ForgotPasswordForm />);

            const emailInput = screen.getByLabelText("Email Address");
            expect(emailInput).toHaveAttribute("id", "forgot-email");
            expect(emailInput).toHaveAttribute("type", "email");
            expect(emailInput).toHaveAttribute("autoComplete", "email");
        });
    });

});
