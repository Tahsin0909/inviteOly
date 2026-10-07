# 🎟️ InviteOly — Modern Event & Partner Management Platform

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)
![Vitest](https://img.shields.io/badge/Vitest-5-green?style=flat-square&logo=vitest)

**InviteOly** is an end-to-end event planning, ticketing, and partner collaboration platform. Built for event hosts, venue partners, service providers, and administrators, InviteOly streamlines event creation, guest management, ticket purchasing, reward programs, and payment processing into a unified, accessible experience with full dark and light mode support.

---

## 🌟 Key Features

### 🎪 Host Experience
- **Multi-Step Event Builder**: Intuitive step-by-step workflow covering event details, package selection, guest lists, settings, and live ticket preview.
- **Guest List & CSV Import**: Upload, manage, and filter guest lists with CSV parsing powered by PapaParse.
- **Golden Ticket & Passes**: Generate visual, branded digital tickets and passes with QR code readiness.
- **Pending Payments & Invoicing**: Track payment processing states and settle event packages effortlessly.

### 🤝 Partner & Vendor Ecosystem
- **Vendor Categories**: Dedicated management for Venues, Catering, Photography, DJ/Entertainment, Decor & Floral, and Event Planners.
- **Venue & Service Showcase**: Drawers, detail modals, and management interfaces for partner inventory.
- **Partner Metrics & Analytics**: Performance indicators, booking volume, and engagement metrics.
- **Rewards & Training**: Tiered reward system, host referral invites, and onboarding training guides.

### 🛡️ Administration & Oversight
- **Admin Dashboard**: System-wide oversight for event metrics, partner verification, and user management.
- **Promotional Codes**: Create, manage, and track redemption of discount and promotional vouchers.
- **Partner Rewards Approval**: Review and manage host and partner reward balances.

### 🔐 Authentication & Security
- **Role-Based Onboarding**: Specialized registration flows for Hosts and Partners with automatic form state synchronization.
- **OTP Verification**: Fast 6-digit numeric verification with clipboard auto-fill, resend cooldown timers, and keyboard navigation.
- **Secure Password Reset**: Email verification flow with reset password confirmation.
- **Token Management**: JWT decode handling with persistent auth state via Redux Persist.

### 🎨 Design & Accessibility
- **Light & Dark Mode**: Seamless theme switching using `next-themes` and CSS variables.
- **Accessible UI**: Radix UI primitives, ARIA compliance, semantic forms, and full keyboard navigation.
- **Rich Text Editing**: WYSIWYG note editing powered by Tiptap extensions (formatting, highlights, alignment, lists).

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Core UI** | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), SASS, `tw-animate-css` |
| **Component Primitives** | [Radix UI](https://www.radix-ui.com/), [Lucide React Icons](https://lucide.dev/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/), [Redux-Persist](https://github.com/rt2zz/redux-persist), [Zustand](https://zustand-demo.pmnd.rs/) |
| **Data Fetching & Tables** | [TanStack React Query v5](https://tanstack.com/query), [TanStack Table v8](https://tanstack.com/table) |
| **Form Handling & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod v4](https://zod.dev/) |
| **Payments** | [Stripe](https://stripe.com/) (`@stripe/react-stripe-js`, `@stripe/stripe-js`) |
| **Rich Text Editor** | [Tiptap](https://tiptap.dev/) (Starter Kit, Typography, Image, Highlight) |
| **Testing** | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), JSDOM |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |

---

## 📁 Project Architecture

The project follows a modular, **feature-driven** architecture:

```text
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Authentication routes (login, register, forgot-password, verify-otp)
│   ├── (dashboard)/            # Authenticated application views
│   │   ├── admin/              # Admin dashboard & controls
│   │   ├── host/               # Host event creation, listings, payments
│   │   ├── partner/            # Partner venue & service management
│   │   └── settings/           # Account settings & preferences
│   ├── (frontend)/             # Public marketing, landing pages, legal & ticketing
│   ├── globals.css             # Tailwind v4 theme definitions and CSS variables
│   └── layout.tsx              # Root HTML & metadata layout
├── assets/                     # Static images, SVG illustrations, icons
├── components/                 # Global, reusable UI components (navbars, drawers, modals)
├── features/                   # Core business domains (slices, hooks, schemas, components)
│   ├── auth/                   # Authentication logic, schemas, forms, hooks
│   ├── event/                  # Event creation wizard, ticket cards, guest lists
│   ├── hostandpartner/         # Referral and collaboration features
│   ├── marketing/              # Marketing tools and banner components
│   ├── metrics/                # Analytics and performance data display
│   ├── payment/                # Stripe integration, pending payment banners
│   ├── promotional-codes/      # Discount code generation & validation
│   ├── reward/                 # Partner & host reward tracking
│   ├── training/               # Vendor training modules
│   ├── user/                   # User profile and settings
│   └── venue/                  # Venue listings, management, and drawers
├── hooks/                      # Custom React utility hooks
├── providers/                  # Application providers (Redux, Theme, React Query)
├── redux/                      # Redux Toolkit store, reducers, and persist config
├── styles/                     # SASS / auxiliary stylesheets
├── testing/                    # Vitest unit & component test suites
│   ├── auth/                   # Authentication test suites (LoginForm, RegisterForm, etc.)
│   └── setup.ts                # Test environment setup (jest-dom matchers)
└── types/                      # Shared TypeScript definitions and API contracts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v20.x` or later (recommended: Node LTS)
- **Package Manager**: `npm` (v10+), `yarn`, or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/judi_luli-Client.git
   cd judi_luli-Client
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and configure the necessary keys:

   ```env
   # App Environment
   NEXT_PUBLIC_ENV="development"
   NEXT_PUBLIC_APP_NAME="InviteOly"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_API_URL="http://localhost:3000"

   # Stripe Payment Gateway
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   NEXT_PUBLIC_STRIPE_SECRET_KEY="sk_test_..."
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Runs the Next.js development server with Turbopack |
| `build` | `npm run build` | Compiles and builds the production application |
| `start` | `npm run start` | Boots the Next.js production server |
| `lint` | `npm run lint` | Runs ESLint to check for code quality and warnings |
| `test` | `npm run test` | Launches the Vitest test runner in watch mode |
| `test:run` | `npm run test:run` | Executes all Vitest test suites once and outputs results |

---

## 🧪 Testing

Unit and component tests are built using **Vitest** and **React Testing Library** with JSDOM:

- **Run all tests once**:
  ```bash
  npm run test:run
  ```

- **Run tests in watch mode during development**:
  ```bash
  npm run test
  ```

- **Run TypeScript validation**:
  ```bash
  npx tsc --noEmit
  ```

### Testing Conventions
- Use semantic `data-testid`, `role`, and accessible label (`htmlFor` / `id`) attributes on form controls.
- Keep tests isolated by mocking external hooks (`useAuth`, `useSearchParams`, `next/navigation`).
- Organize tests within `src/testing/` matching feature boundaries.

---

## 🌓 Theming & Customization

The interface supports dynamic **Light** and **Dark** themes.
- Powered by `next-themes` with seamless SSR synchronization.
- Theme tokens (background, foreground, primary, card, muted, border) are managed through CSS variables in `src/app/globals.css`.

---

## 📄 License

This project is proprietary and confidential. All rights reserved.
