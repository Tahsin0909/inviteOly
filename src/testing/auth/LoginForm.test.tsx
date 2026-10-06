import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import LoginForm from "@/features/auth/components/LoginForm";

// -----------------------------------------------------------------------------
// Mocks
// -----------------------------------------------------------------------------

// Mock the authentication hook to inspect handleLogin calls and control loading state
const mockHandleLogin = vi.fn();
let mockIsLoading = false;

vi.mock("@/features/auth/hooks/useAuth", () => ({
  useAuth: () => ({
    handleLogin: mockHandleLogin,
    isLoading: mockIsLoading,
  }),
}));

// Mock DemoUserSwitcher so tests don't require the entire Redux Provider wrapper
vi.mock("@/components/navbar/components/DemoUserSwitcher", () => ({
  DemoUserSwitcher: () => <div data-testid="mock-demo-user-switcher">Demo User Switcher</div>,
}));

// -----------------------------------------------------------------------------
// Test Suite: LoginForm
// -----------------------------------------------------------------------------

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsLoading = false;
  });

  // ===========================================================================
  // 1. Initial Rendering Tests
  // ===========================================================================
  describe("Initial Rendering", () => {
    // Verifies that the title and descriptive subtitle are displayed
    it("renders the welcome heading and subtitle correctly", () => {
      render(<LoginForm />);

      expect(
        screen.getByRole("heading", { name: /welcome back/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/login to your inviteoly account/i)
      ).toBeInTheDocument();
    });

    // Verifies that inputs are rendered with proper placeholder text and default types
    it("renders email and password inputs with their respective labels", () => {
      render(<LoginForm />);

      // Accessible labels linked to inputs
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");

      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "name@example.com");

      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute("type", "password");
      expect(passwordInput).toHaveAttribute("placeholder", "enter password");
    });

    // Verifies essential links (Forgot Password, Register, Terms, Privacy)
    it("renders navigation links with correct href destinations", () => {
      render(<LoginForm />);

      const forgotPasswordLink = screen.getByTestId("forgot-password-link");
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");

      const createAccountLink = screen.getByTestId("create-account-link");
      expect(createAccountLink).toBeInTheDocument();
      expect(createAccountLink).toHaveAttribute("href", "/register");

      expect(screen.getByRole("link", { name: /terms of service/i })).toHaveAttribute(
        "href",
        "/terms"
      );
      expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
        "href",
        "/privacy"
      );
    });

    // Verifies that the submit button and mock switcher are in the document
    it("renders the login submit button and demo switcher section", () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId("login-submit-button");
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveTextContent("Login");

      expect(screen.getByTestId("mock-demo-user-switcher")).toBeInTheDocument();
    });
  });

  // ===========================================================================
  // 2. Password Visibility Toggle
  // ===========================================================================
  describe("Password Visibility Toggle", () => {
    // Tests toggling from masked (password) to plaintext (text) and back
    it("toggles password input type and aria-label when the eye icon is clicked", () => {
      render(<LoginForm />);

      const passwordInput = screen.getByLabelText("Password");
      const toggleButton = screen.getByTestId("toggle-password-visibility");

      // Initial state: masked
      expect(passwordInput).toHaveAttribute("type", "password");
      expect(toggleButton).toHaveAttribute("aria-label", "Show password");

      // Click to show password
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "text");
      expect(toggleButton).toHaveAttribute("aria-label", "Hide password");

      // Click again to hide password
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "password");
      expect(toggleButton).toHaveAttribute("aria-label", "Show password");
    });
  });

  // ===========================================================================
  // 3. Form Validation Tests
  // ===========================================================================
  describe("Validation & Error Messages", () => {
    // Tests that empty submissions trigger validation errors without calling handleLogin
    it("displays validation errors when submitting an empty form", async () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId("login-submit-button");
      fireEvent.click(submitButton);

      // Email and password required errors from zod schema
      await waitFor(() => {
        expect(screen.getByTestId("email-error")).toBeInTheDocument();
        expect(screen.getByTestId("password-error")).toBeInTheDocument();
      });

      expect(screen.getByTestId("email-error")).toHaveTextContent("Invalid email address");
      expect(screen.getByTestId("password-error")).toHaveTextContent("Password is required");
      expect(mockHandleLogin).not.toHaveBeenCalled();
    });

    // Tests that malformed emails are rejected
    it("displays an error message when an invalid email format is entered", async () => {
      render(<LoginForm />);

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByTestId("login-submit-button");

      fireEvent.change(emailInput, { target: { value: "invalid-email-format" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("email-error")).toHaveTextContent("Invalid email address");
      });

      expect(screen.queryByTestId("password-error")).not.toBeInTheDocument();
      expect(mockHandleLogin).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // 4. Form Submission Tests
  // ===========================================================================
  describe("Form Submission", () => {
    // Tests valid credentials submission
    it("submits the form and calls handleLogin with correct values", async () => {
      render(<LoginForm />);

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByTestId("login-submit-button");

      // Arrange valid user input
      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "secret123" } });

      // Act: Submit form
      fireEvent.click(submitButton);

      // Assert: handleLogin received the exact form values
      await waitFor(() => {
        expect(mockHandleLogin).toHaveBeenCalledTimes(1);
        expect(mockHandleLogin).toHaveBeenCalledWith({
          email: "user@example.com",
          password: "secret123",
        });
      });
    });

    // Tests loading state disabled state and text
    it("disables the submit button and displays 'Logging in...' when isLoading is true", () => {
      mockIsLoading = true;
      render(<LoginForm />);

      const submitButton = screen.getByTestId("login-submit-button");
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent("Logging in...");
    });
  });

  // ===========================================================================
  // 5. Accessibility & Semantic Attributes
  // ===========================================================================
  describe("Accessibility & Attributes", () => {
    // Tests htmlFor and id associations for screen reader compatibility
    it("properly associates labels with inputs using htmlFor and id", () => {
      render(<LoginForm />);

      const emailInput = screen.getByLabelText("Email");
      expect(emailInput).toHaveAttribute("id", "email");

      const passwordInput = screen.getByLabelText("Password");
      expect(passwordInput).toHaveAttribute("id", "password");
    });

    // Tests autocomplete attributes to help browsers and password managers
    it("includes proper autocomplete attributes on form inputs", () => {
      render(<LoginForm />);

      expect(screen.getByLabelText("Email")).toHaveAttribute("autoComplete", "email");
      expect(screen.getByLabelText("Password")).toHaveAttribute(
        "autoComplete",
        "current-password"
      );
    });
  });
});