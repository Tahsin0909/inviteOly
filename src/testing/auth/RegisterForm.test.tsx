import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import RegisterForm from "@/features/auth/components/RegisterForm";

// -----------------------------------------------------------------------------
// Mocks
// -----------------------------------------------------------------------------

// Mock next/navigation useSearchParams to control the "?role=..." query parameter
const mockSearchParamsGet = vi.fn((key: string): string | null => null);

vi.mock("next/navigation", () => ({
    useSearchParams: () => ({
        get: mockSearchParamsGet,
    }),
}));

// Mock the authentication hook to monitor handleRegister calls and toggle isLoading
const mockHandleRegister = vi.fn();
let mockIsLoading = false;

vi.mock("@/features/auth/hooks/useAuth", () => ({
    useAuth: () => ({
        handleRegister: mockHandleRegister,
        isLoading: mockIsLoading,
    }),
}));

// -----------------------------------------------------------------------------
// Test Suite: RegisterForm
// -----------------------------------------------------------------------------

describe("RegisterForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockSearchParamsGet.mockReturnValue(null);
        mockIsLoading = false;
    });

    // ===========================================================================
    // 1. Initial Rendering & Query Param Handling
    // ===========================================================================
    describe("Initial Rendering & Role Selection", () => {
        // Verifies main header text and container element
        it("renders the registration heading and subtitle correctly", () => {
            render(<RegisterForm />);

            expect(
                screen.getByRole("heading", { name: /create your account/i })
            ).toBeInTheDocument();
            expect(
                screen.getByText(/join inviteoly and simplify your event planning experience/i)
            ).toBeInTheDocument();
            expect(screen.getByTestId("register-container")).toBeInTheDocument();
        });

        // Verifies that Host form is shown by default when no role query param is supplied
        it("defaults to Host registration form when no role query param is provided", () => {
            render(<RegisterForm />);

            expect(screen.getByTestId("host-register-form")).toBeInTheDocument();
            expect(screen.queryByTestId("partner-register-form")).not.toBeInTheDocument();

            // Host specific fields
            expect(screen.getByTestId("host-first-name-input")).toBeInTheDocument();
            expect(screen.getByTestId("host-last-name-input")).toBeInTheDocument();
            expect(screen.getByTestId("host-email-input")).toBeInTheDocument();
            expect(screen.getByTestId("host-password-input")).toBeInTheDocument();
            expect(screen.getByTestId("host-submit-button")).toBeInTheDocument();
        });

        // Verifies that Partner form is displayed when role=partner is in searchParams
        it("defaults to Partner registration form when role=PARTNER is present in URL", () => {
            mockSearchParamsGet.mockImplementation((key: string) => {
                if (key === "role") return "partner";
                return null;
            });

            render(<RegisterForm />);

            expect(screen.getByTestId("partner-register-form")).toBeInTheDocument();
            expect(screen.queryByTestId("host-register-form")).not.toBeInTheDocument();

            // Partner specific fields
            expect(screen.getByTestId("partner-first-name-input")).toBeInTheDocument();
            expect(screen.getByTestId("partner-last-name-input")).toBeInTheDocument();
            expect(screen.getByTestId("partner-type-select")).toBeInTheDocument();
            expect(screen.getByTestId("partner-business-name-input")).toBeInTheDocument();
            expect(screen.getByTestId("partner-business-email-input")).toBeInTheDocument();
            expect(screen.getByTestId("partner-phone-input")).toBeInTheDocument();
            expect(screen.getByTestId("partner-website-input")).toBeInTheDocument();
            expect(screen.getByTestId("partner-business-address-input")).toBeInTheDocument();
            expect(screen.getByTestId("partner-password-input")).toBeInTheDocument();
            expect(screen.getByTestId("partner-submit-button")).toBeInTheDocument();
        });

        // Verifies that login link, Terms of Service, and Privacy Policy links exist
        it("renders navigation and policy links with correct href destinations", () => {
            render(<RegisterForm />);

            const loginLink = screen.getByTestId("login-link");
            expect(loginLink).toBeInTheDocument();
            expect(loginLink).toHaveAttribute("href", "/login");

            expect(screen.getByRole("link", { name: /terms of service/i })).toHaveAttribute(
                "href",
                "/terms"
            );
            expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
                "href",
                "/privacy"
            );
        });
    });

    // ===========================================================================
    // 2. Role Switching & Data Transfer
    // ===========================================================================
    describe("Role Switching & Data Transfer", () => {
        // Verifies switching between Host and Partner toggles form views
        it("switches from Host to Partner form when role dropdown is changed", () => {
            render(<RegisterForm />);

            expect(screen.getByTestId("host-register-form")).toBeInTheDocument();

            const roleSelect = screen.getByTestId("role-select");
            fireEvent.change(roleSelect, { target: { value: "PARTNER" } });

            expect(screen.queryByTestId("host-register-form")).not.toBeInTheDocument();
            expect(screen.getByTestId("partner-register-form")).toBeInTheDocument();
        });

        // Verifies common fields entered in Host form transfer over to Partner form
        it("transfers entered field values (name, email, password) from Host to Partner", () => {
            render(<RegisterForm />);

            // Fill in Host form inputs
            fireEvent.change(screen.getByTestId("host-first-name-input"), {
                target: { value: "Jane" },
            });
            fireEvent.change(screen.getByTestId("host-last-name-input"), {
                target: { value: "Doe" },
            });
            fireEvent.change(screen.getByTestId("host-email-input"), {
                target: { value: "jane@example.com" },
            });
            fireEvent.change(screen.getByTestId("host-password-input"), {
                target: { value: "password123" },
            });

            // Switch to Partner
            const roleSelect = screen.getByTestId("role-select");
            fireEvent.change(roleSelect, { target: { value: "PARTNER" } });

            // Check that Partner fields inherited the Host values
            expect(screen.getByTestId("partner-first-name-input")).toHaveValue("Jane");
            expect(screen.getByTestId("partner-last-name-input")).toHaveValue("Doe");
            expect(screen.getByTestId("partner-business-email-input")).toHaveValue(
                "jane@example.com"
            );
            expect(screen.getByTestId("partner-password-input")).toHaveValue("password123");
        });

        // Verifies common fields entered in Partner form transfer back to Host form
        it("transfers entered field values (name, businessEmail -> email, password) from Partner to Host", () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            render(<RegisterForm />);

            // Fill in Partner form inputs
            fireEvent.change(screen.getByTestId("partner-first-name-input"), {
                target: { value: "Alex" },
            });
            fireEvent.change(screen.getByTestId("partner-last-name-input"), {
                target: { value: "Smith" },
            });
            fireEvent.change(screen.getByTestId("partner-business-email-input"), {
                target: { value: "alex@biz.com" },
            });
            fireEvent.change(screen.getByTestId("partner-password-input"), {
                target: { value: "securePass789" },
            });

            // Switch to Host
            const roleSelect = screen.getByTestId("role-select");
            fireEvent.change(roleSelect, { target: { value: "HOST" } });

            // Check that Host fields inherited the Partner values
            expect(screen.getByTestId("host-first-name-input")).toHaveValue("Alex");
            expect(screen.getByTestId("host-last-name-input")).toHaveValue("Smith");
            expect(screen.getByTestId("host-email-input")).toHaveValue("alex@biz.com");
            expect(screen.getByTestId("host-password-input")).toHaveValue("securePass789");
        });
    });

    // ===========================================================================
    // 3. Password Visibility Toggle
    // ===========================================================================
    describe("Password Visibility Toggle", () => {
        // Tests password masking toggle on Host form
        it("toggles password input type between 'password' and 'text' on Host form", () => {
            render(<RegisterForm />);

            const passwordInput = screen.getByTestId("host-password-input");
            const toggleButton = screen.getByTestId("host-toggle-password");

            // Initial state is password (masked)
            expect(passwordInput).toHaveAttribute("type", "password");
            expect(toggleButton).toHaveAttribute("aria-label", "Show password");

            // Click to reveal password
            fireEvent.click(toggleButton);
            expect(passwordInput).toHaveAttribute("type", "text");
            expect(toggleButton).toHaveAttribute("aria-label", "Hide password");

            // Click again to mask password
            fireEvent.click(toggleButton);
            expect(passwordInput).toHaveAttribute("type", "password");
            expect(toggleButton).toHaveAttribute("aria-label", "Show password");
        });

        // Tests password masking toggle on Partner form
        it("toggles password input type between 'password' and 'text' on Partner form", () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            render(<RegisterForm />);

            const passwordInput = screen.getByTestId("partner-password-input");
            const toggleButton = screen.getByTestId("partner-toggle-password");

            // Initial state is password (masked)
            expect(passwordInput).toHaveAttribute("type", "password");
            expect(toggleButton).toHaveAttribute("aria-label", "Show password");

            // Click to reveal password
            fireEvent.click(toggleButton);
            expect(passwordInput).toHaveAttribute("type", "text");
            expect(toggleButton).toHaveAttribute("aria-label", "Hide password");

            // Click again to mask password
            fireEvent.click(toggleButton);
            expect(passwordInput).toHaveAttribute("type", "password");
            expect(toggleButton).toHaveAttribute("aria-label", "Show password");
        });
    });

    // ===========================================================================
    // 4. Host Form Validation
    // ===========================================================================
    describe("Host Form Validation", () => {
        // Tests validation errors when submitting an empty Host form
        it("displays error messages for all required fields when submitting an empty Host form", async () => {
            render(<RegisterForm />);

            const submitButton = screen.getByTestId("host-submit-button");
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByTestId("host-first-name-error")).toBeInTheDocument();
                expect(screen.getByTestId("host-last-name-error")).toBeInTheDocument();
                expect(screen.getByTestId("host-email-error")).toBeInTheDocument();
                expect(screen.getByTestId("host-password-error")).toBeInTheDocument();
            });

            expect(screen.getByTestId("host-first-name-error")).toHaveTextContent(
                "First name is required"
            );
            expect(screen.getByTestId("host-last-name-error")).toHaveTextContent(
                "Last name is required"
            );
            expect(screen.getByTestId("host-email-error")).toHaveTextContent(
                "Invalid email address"
            );
            expect(screen.getByTestId("host-password-error")).toHaveTextContent(
                "Password must be at least 6 characters"
            );

            // Verify submission callback is blocked
            expect(mockHandleRegister).not.toHaveBeenCalled();
        });

        // Tests validation error when an invalid email format is entered
        it("displays an error when invalid email format is entered on Host form", async () => {
            render(<RegisterForm />);

            fireEvent.change(screen.getByTestId("host-first-name-input"), {
                target: { value: "John" },
            });
            fireEvent.change(screen.getByTestId("host-last-name-input"), {
                target: { value: "Doe" },
            });
            fireEvent.change(screen.getByTestId("host-email-input"), {
                target: { value: "not-an-email" },
            });
            fireEvent.change(screen.getByTestId("host-password-input"), {
                target: { value: "123456" },
            });

            fireEvent.click(screen.getByTestId("host-submit-button"));

            await waitFor(() => {
                expect(screen.getByTestId("host-email-error")).toHaveTextContent(
                    "Invalid email address"
                );
            });

            expect(screen.queryByTestId("host-first-name-error")).not.toBeInTheDocument();
            expect(screen.queryByTestId("host-last-name-error")).not.toBeInTheDocument();
            expect(screen.queryByTestId("host-password-error")).not.toBeInTheDocument();
            expect(mockHandleRegister).not.toHaveBeenCalled();
        });

        // Tests validation error when password is less than 6 characters
        it("displays an error when password is shorter than 6 characters on Host form", async () => {
            render(<RegisterForm />);

            fireEvent.change(screen.getByTestId("host-first-name-input"), {
                target: { value: "John" },
            });
            fireEvent.change(screen.getByTestId("host-last-name-input"), {
                target: { value: "Doe" },
            });
            fireEvent.change(screen.getByTestId("host-email-input"), {
                target: { value: "john@example.com" },
            });
            fireEvent.change(screen.getByTestId("host-password-input"), {
                target: { value: "12345" },
            });

            fireEvent.click(screen.getByTestId("host-submit-button"));

            await waitFor(() => {
                expect(screen.getByTestId("host-password-error")).toHaveTextContent(
                    "Password must be at least 6 characters"
                );
            });

            expect(mockHandleRegister).not.toHaveBeenCalled();
        });
    });

    // ===========================================================================
    // 5. Host Form Submission
    // ===========================================================================
    describe("Host Form Submission", () => {
        // Tests successful Host form submission calling handleRegister with role 'HOST'
        it("submits valid Host data and calls handleRegister with role HOST", async () => {
            render(<RegisterForm />);

            fireEvent.change(screen.getByTestId("host-first-name-input"), {
                target: { value: "Alice" },
            });
            fireEvent.change(screen.getByTestId("host-last-name-input"), {
                target: { value: "Wonder" },
            });
            fireEvent.change(screen.getByTestId("host-email-input"), {
                target: { value: "alice@example.com" },
            });
            fireEvent.change(screen.getByTestId("host-password-input"), {
                target: { value: "securePass123" },
            });

            fireEvent.click(screen.getByTestId("host-submit-button"));

            await waitFor(() => {
                expect(mockHandleRegister).toHaveBeenCalledTimes(1);
                expect(mockHandleRegister).toHaveBeenCalledWith({
                    firstName: "Alice",
                    lastName: "Wonder",
                    email: "alice@example.com",
                    password: "securePass123",
                    role: "HOST",
                });
            });
        });
    });

    // ===========================================================================
    // 6. Partner Form Validation
    // ===========================================================================
    describe("Partner Form Validation", () => {
        // Tests validation errors when submitting an empty Partner form
        it("displays error messages for required fields on empty Partner form submission", async () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            render(<RegisterForm />);

            const submitButton = screen.getByTestId("partner-submit-button");
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByTestId("partner-first-name-error")).toBeInTheDocument();
                expect(screen.getByTestId("partner-last-name-error")).toBeInTheDocument();
                expect(screen.getByTestId("partner-business-name-error")).toBeInTheDocument();
                expect(screen.getByTestId("partner-business-email-error")).toBeInTheDocument();
                expect(screen.getByTestId("partner-phone-error")).toBeInTheDocument();
                expect(screen.getByTestId("partner-password-error")).toBeInTheDocument();
            });

            expect(screen.getByTestId("partner-first-name-error")).toHaveTextContent(
                "First name is required"
            );
            expect(screen.getByTestId("partner-last-name-error")).toHaveTextContent(
                "Last name is required"
            );
            expect(screen.getByTestId("partner-business-name-error")).toHaveTextContent(
                "Business / Organization name is required"
            );
            expect(screen.getByTestId("partner-business-email-error")).toHaveTextContent(
                "Invalid business email address"
            );
            expect(screen.getByTestId("partner-phone-error")).toHaveTextContent(
                "Valid phone number is required"
            );
            expect(screen.getByTestId("partner-password-error")).toHaveTextContent(
                "Password must be at least 6 characters"
            );

            // Verify submission callback is blocked
            expect(mockHandleRegister).not.toHaveBeenCalled();
        });

        // Tests validation error when business email format is invalid
        it("displays an error when invalid business email format is entered", async () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            render(<RegisterForm />);

            fireEvent.change(screen.getByTestId("partner-first-name-input"), {
                target: { value: "Bob" },
            });
            fireEvent.change(screen.getByTestId("partner-last-name-input"), {
                target: { value: "Builder" },
            });
            fireEvent.change(screen.getByTestId("partner-business-name-input"), {
                target: { value: "Builders Corp" },
            });
            fireEvent.change(screen.getByTestId("partner-business-email-input"), {
                target: { value: "bad-business-email" },
            });
            fireEvent.change(screen.getByTestId("partner-phone-input"), {
                target: { value: "1234567890" },
            });
            fireEvent.change(screen.getByTestId("partner-password-input"), {
                target: { value: "strongPassword" },
            });

            fireEvent.click(screen.getByTestId("partner-submit-button"));

            await waitFor(() => {
                expect(screen.getByTestId("partner-business-email-error")).toHaveTextContent(
                    "Invalid business email address"
                );
            });

            expect(mockHandleRegister).not.toHaveBeenCalled();
        });

        // Tests validation error when phone number has fewer than 7 characters
        it("displays an error when phone number is less than 7 characters", async () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            render(<RegisterForm />);

            fireEvent.change(screen.getByTestId("partner-first-name-input"), {
                target: { value: "Bob" },
            });
            fireEvent.change(screen.getByTestId("partner-last-name-input"), {
                target: { value: "Builder" },
            });
            fireEvent.change(screen.getByTestId("partner-business-name-input"), {
                target: { value: "Builders Corp" },
            });
            fireEvent.change(screen.getByTestId("partner-business-email-input"), {
                target: { value: "bob@builder.com" },
            });
            fireEvent.change(screen.getByTestId("partner-phone-input"), {
                target: { value: "12345" }, // Less than 7 chars
            });
            fireEvent.change(screen.getByTestId("partner-password-input"), {
                target: { value: "strongPassword" },
            });

            fireEvent.click(screen.getByTestId("partner-submit-button"));

            await waitFor(() => {
                expect(screen.getByTestId("partner-phone-error")).toHaveTextContent(
                    "Valid phone number is required"
                );
            });

            expect(mockHandleRegister).not.toHaveBeenCalled();
        });
    });

    // ===========================================================================
    // 7. Partner Form Submission
    // ===========================================================================
    describe("Partner Form Submission", () => {
        // Tests successful Partner form submission calling handleRegister with role 'PARTNER'
        it("submits valid Partner data and calls handleRegister with role PARTNER", async () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            render(<RegisterForm />);

            fireEvent.change(screen.getByTestId("partner-first-name-input"), {
                target: { value: "Charles" },
            });
            fireEvent.change(screen.getByTestId("partner-last-name-input"), {
                target: { value: "Darwin" },
            });
            fireEvent.change(screen.getByTestId("partner-type-select"), {
                target: { value: "Photography" },
            });
            fireEvent.change(screen.getByTestId("partner-business-name-input"), {
                target: { value: "Darwin Studios" },
            });
            fireEvent.change(screen.getByTestId("partner-business-email-input"), {
                target: { value: "darwin@studios.com" },
            });
            fireEvent.change(screen.getByTestId("partner-phone-input"), {
                target: { value: "+1 (555) 123-4567" },
            });
            fireEvent.change(screen.getByTestId("partner-website-input"), {
                target: { value: "https://darwinphoto.com" },
            });
            fireEvent.change(screen.getByTestId("partner-business-address-input"), {
                target: { value: "100 Evolution Way" },
            });
            fireEvent.change(screen.getByTestId("partner-password-input"), {
                target: { value: "photographer123" },
            });

            fireEvent.click(screen.getByTestId("partner-submit-button"));

            await waitFor(() => {
                expect(mockHandleRegister).toHaveBeenCalledTimes(1);
                expect(mockHandleRegister).toHaveBeenCalledWith({
                    firstName: "Charles",
                    lastName: "Darwin",
                    partnerType: "Photography",
                    businessName: "Darwin Studios",
                    businessEmail: "darwin@studios.com",
                    phone: "+1 (555) 123-4567",
                    website: "https://darwinphoto.com",
                    businessAddress: "100 Evolution Way",
                    password: "photographer123",
                    role: "PARTNER",
                });
            });
        });
    });

    // ===========================================================================
    // 8. Loading State
    // ===========================================================================
    describe("Loading State", () => {
        // Tests that Host submit button is disabled and text updates when isLoading is true
        it("disables the submit button and shows 'Creating account...' on Host form when isLoading is true", () => {
            mockIsLoading = true;
            render(<RegisterForm />);

            const submitButton = screen.getByTestId("host-submit-button");
            expect(submitButton).toBeDisabled();
            expect(submitButton).toHaveTextContent("Creating account...");
        });

        // Tests that Partner submit button is disabled and text updates when isLoading is true
        it("disables the submit button and shows 'Creating account...' on Partner form when isLoading is true", () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            mockIsLoading = true;
            render(<RegisterForm />);

            const submitButton = screen.getByTestId("partner-submit-button");
            expect(submitButton).toBeDisabled();
            expect(submitButton).toHaveTextContent("Creating account...");
        });
    });

    // ===========================================================================
    // 9. Accessibility & Semantic Attributes
    // ===========================================================================
    describe("Accessibility & Attributes", () => {
        // Tests htmlFor and id linking on Host form
        it("properly associates labels with inputs using htmlFor and id in Host form", () => {
            render(<RegisterForm />);

            expect(screen.getByLabelText("First Name")).toHaveAttribute(
                "id",
                "host-first-name"
            );
            expect(screen.getByLabelText("Last Name")).toHaveAttribute(
                "id",
                "host-last-name"
            );
            expect(screen.getByLabelText("Select Your role")).toHaveAttribute(
                "id",
                "host-role-select"
            );
            expect(screen.getByLabelText("Email")).toHaveAttribute(
                "id",
                "host-email"
            );
            expect(screen.getByLabelText("Password")).toHaveAttribute(
                "id",
                "host-password"
            );
        });

        // Tests htmlFor and id linking on Partner form
        it("properly associates labels with inputs using htmlFor and id in Partner form", () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            render(<RegisterForm />);

            expect(screen.getByLabelText("First Name")).toHaveAttribute(
                "id",
                "partner-first-name"
            );
            expect(screen.getByLabelText("Last Name")).toHaveAttribute(
                "id",
                "partner-last-name"
            );
            expect(screen.getByLabelText("Select Your Role")).toHaveAttribute(
                "id",
                "partner-role-select"
            );
            expect(screen.getByLabelText("Partner Type")).toHaveAttribute(
                "id",
                "partner-type"
            );
            expect(screen.getByLabelText("Business / Organization Name")).toHaveAttribute(
                "id",
                "partner-business-name"
            );
            expect(screen.getByLabelText("Business email")).toHaveAttribute(
                "id",
                "partner-business-email"
            );
            expect(screen.getByLabelText("Phone Number")).toHaveAttribute(
                "id",
                "partner-phone"
            );
            expect(
                screen.getByLabelText("Website or social media (optional)")
            ).toHaveAttribute("id", "partner-website");
            expect(
                screen.getByLabelText("Business Address (optional)")
            ).toHaveAttribute("id", "partner-business-address");
            expect(screen.getByLabelText("Password")).toHaveAttribute(
                "id",
                "partner-password"
            );
        });

        // Tests autocomplete attributes for browser autofill and password manager support
        it("includes appropriate autocomplete attributes across Host form inputs", () => {
            render(<RegisterForm />);

            expect(screen.getByTestId("host-first-name-input")).toHaveAttribute(
                "autoComplete",
                "given-name"
            );
            expect(screen.getByTestId("host-last-name-input")).toHaveAttribute(
                "autoComplete",
                "family-name"
            );
            expect(screen.getByTestId("host-email-input")).toHaveAttribute(
                "autoComplete",
                "email"
            );
            expect(screen.getByTestId("host-password-input")).toHaveAttribute(
                "autoComplete",
                "new-password"
            );
        });

        // Tests autocomplete attributes across Partner form inputs
        it("includes appropriate autocomplete attributes across Partner form inputs", () => {
            mockSearchParamsGet.mockReturnValue("PARTNER");
            render(<RegisterForm />);

            expect(screen.getByTestId("partner-first-name-input")).toHaveAttribute(
                "autoComplete",
                "given-name"
            );
            expect(screen.getByTestId("partner-last-name-input")).toHaveAttribute(
                "autoComplete",
                "family-name"
            );
            expect(screen.getByTestId("partner-business-name-input")).toHaveAttribute(
                "autoComplete",
                "organization"
            );
            expect(screen.getByTestId("partner-business-email-input")).toHaveAttribute(
                "autoComplete",
                "email"
            );
            expect(screen.getByTestId("partner-phone-input")).toHaveAttribute(
                "autoComplete",
                "tel"
            );
            expect(screen.getByTestId("partner-website-input")).toHaveAttribute(
                "autoComplete",
                "url"
            );
            expect(screen.getByTestId("partner-business-address-input")).toHaveAttribute(
                "autoComplete",
                "street-address"
            );
            expect(screen.getByTestId("partner-password-input")).toHaveAttribute(
                "autoComplete",
                "new-password"
            );
        });
    });
});

