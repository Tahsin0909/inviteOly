# InviteOnly Authentication API Reference

This document provides a comprehensive reference for the backend authentication and OTP endpoints integrated into the InviteOnly client.

---

## 1. Overview & Configuration

- **Base URL**: Configured via `process.env.NEXT_PUBLIC_API_URL`
- **Content Type**: `application/json`
- **Credentials**: `include` (CORS cookies supported)
- **Authorization Header**: Bearer token or raw JWT token passed via `Authorization: <token>`

---

## 2. Endpoints

### 2.1 Register User (Host)
Registers a new Host account.

- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "password": "SecurePassword123!",
  "role": "HOST"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Account created successfully. Please verify your email with the OTP sent.",
  "data": {
    "email": "jane@example.com"
  }
}
```

---

### 2.2 Register User (Partner)
Registers a new Partner account with business and service details.

- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "role": "PARTNER",
  "partnerType": "Venue",
  "businessName": "Inviteoly Event Palace",
  "businessEmail": "contact@eventpalace.com",
  "phone": "(555) 555-5555",
  "website": "https://www.eventpalace.com",
  "businessAddress": "123 Grand Ave, New York, NY 10001",
  "password": "SecurePassword123!"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Partner account created successfully. Please verify your email.",
  "data": {
    "email": "contact@eventpalace.com"
  }
}
```

---

### 2.3 Login
Authenticates an existing user via email and password.

- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Request Body**:
```json
{
  "email": "jane@example.com",
  "password": "SecurePassword123!"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_123456",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "role": "HOST"
    }
  }
}
```

---

### 2.4 Send OTP
Sends a 6-digit numeric verification code to the specified email address.

- **Method**: `POST`
- **Endpoint**: `/otp/send`
- **Request Body**:
```json
{
  "email": "jane@example.com",
  "type": "register"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Verification code sent to your email"
}
```

---

### 2.5 Resend OTP
Resends a fresh 6-digit code to the user's email.

- **Method**: `POST`
- **Endpoint**: `/otp/resend`
- **Request Body**:
```json
{
  "email": "jane@example.com"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Verification code resent successfully"
}
```

---

### 2.6 Verify OTP
Verifies the 6-digit code sent to the email for account confirmation or password recovery.

- **Method**: `POST`
- **Endpoint**: `/otp/verify`
- **Request Body**:
```json
{
  "email": "jane@example.com",
  "otp": 123456,
  "type": "register"
}
```
- **Response `200 OK` (Registration flow)**:
```json
{
  "success": true,
  "message": "Account verified successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
- **Response `200 OK` (Forgot password flow)**:
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "resetToken": "rst_abcdef123456"
  }
}
```

---

### 2.7 Forgot Password
Initiates the password recovery flow by sending a verification code.

- **Method**: `POST`
- **Endpoint**: `/auth/forgot-password`
- **Request Body**:
```json
{
  "email": "jane@example.com"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Password reset code sent to your email"
}
```

---

### 2.8 Reset / Set Password
Sets a new password using the verified OTP or reset token.

- **Method**: `POST`
- **Endpoint**: `/auth/reset-password`
- **Request Body**:
```json
{
  "email": "jane@example.com",
  "otp": 123456,
  "password": "NewSecurePassword456!"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Password updated successfully. Please log in with your new password."
}
```

---

### 2.9 Get Current User Profile
Retrieves the authenticated user's profile.

- **Method**: `GET`
- **Endpoint**: `/users/profile`
- **Headers**:
```http
Authorization: <token>
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "id": "usr_123456",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "role": "HOST",
    "isActive": true,
    "isEmailVerified": true
  }
}
```

---

### 2.10 Logout
Invalidates the current session and token.

- **Method**: `POST`
- **Endpoint**: `/auth/logout`
- **Headers**:
```http
Authorization: <token>
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 2.11 Get Pricing Plans & Tiers
Retrieves all pricing tiers (Small, Medium, Large) with their corresponding packages, prices, guest limits, and feature lists.

- **Method**: `GET`
- **Endpoint**: `/pricing`
- **Query Parameters**:
  - `tier` (optional): Filter by tier (`small` | `medium` | `large`)
- **Headers**:
  - Optional `Authorization: <token>` (if personalized or customer-specific discounts apply)
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Pricing tiers retrieved successfully",
  "data": [
    {
      "id": "small",
      "tab": {
        "id": "small",
        "label": "Small",
        "sublabel": "Up To 400"
      },
      "plans": [
        {
          "id": "small-standard",
          "name": "Standard",
          "iconType": "standard",
          "description": "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
          "price": "$299",
          "guestRange": "Up To 400 Guests",
          "features": [
            "Secure QR-Code Tickets For A Premium Guest Entry Experience",
            "Easy-To-Use Host Dashboard To Manage And Send Tickets From",
            "Downloadable PDF Guest List",
            "Assign Unnamed Tickets To Guests Directly From Your Dashboard For Easy, Accurate Tracking.",
            "Easy-To-Use Scanning App For Fast, Secure Ticket Verification At Entry.",
            "Dedicated Customer Support"
          ],
          "buttonText": "Choose Standard",
          "buttonVariant": "outline",
          "isPopular": false
        },
        {
          "id": "small-premium",
          "name": "Premium",
          "iconType": "premium",
          "isPopular": true,
          "ribbonText": "Most Popular",
          "description": "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
          "price": "$449",
          "guestRange": "Up To 400 Guests",
          "features": [
            "Up To 400 Guests",
            "Everything Included In The Standard Package",
            "Each Ticket Is Personalized With The Individual Guest's Name.",
            "RSVP-To-Unlock Ticketing: Guests Simply Confirm “Yes” To Reveal Their Personalized Ticket",
            "Tickets Remain Hidden Until Attendance Is Confirmed",
            "Declined Invitations Are Automatically Voided",
            "Elevated, Premium Guest Experience From Invitation To Check-In",
            "Automatically Email Tickets To Guests"
          ],
          "buttonText": "Choose Premium",
          "buttonVariant": "solid"
        }
      ]
    },
    {
      "id": "medium",
      "tab": {
        "id": "medium",
        "label": "Medium",
        "sublabel": "401-800"
      },
      "plans": [
        {
          "id": "medium-standard",
          "name": "Standard",
          "iconType": "standard",
          "description": "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
          "price": "$449",
          "guestRange": "401-800 Guests",
          "features": [
            "Secure QR-Code Tickets For A Premium Guest Entry Experience",
            "Easy-To-Use Host Dashboard To Manage And Send Tickets From",
            "Downloadable PDF Guest List",
            "Assign Unnamed Tickets To Guests Directly From Your Dashboard For Easy, Accurate Tracking.",
            "Easy-To-Use Scanning App For Fast, Secure Ticket Verification At Entry.",
            "Dedicated Customer Support"
          ],
          "buttonText": "Choose Standard",
          "buttonVariant": "outline",
          "isPopular": false
        },
        {
          "id": "medium-premium",
          "name": "Premium",
          "iconType": "premium",
          "isPopular": true,
          "ribbonText": "Most Popular",
          "description": "Create A More Exclusive, Personalized Experience For Every Guest-With All The Power Of Standard.",
          "price": "$599",
          "guestRange": "401-800 Guests",
          "features": [
            "401-800 Guests",
            "Everything Included In The Standard Package",
            "Each Ticket Is Personalized With The Individual Guest's Name.",
            "RSVP-To-Unlock Ticketing: Guests Simply Confirm “Yes” To Reveal Their Personalized Ticket",
            "Tickets Remain Hidden Until Attendance Is Confirmed",
            "Declined Invitations Are Automatically Voided",
            "Elevated, Premium Guest Experience From Invitation To Check-In",
            "Automatically Email Tickets To Guests"
          ],
          "buttonText": "Choose Premium",
          "buttonVariant": "solid"
        }
      ]
    },
    {
      "id": "large",
      "tab": {
        "id": "large",
        "label": "Large",
        "sublabel": "801+"
      },
      "plans": [
        {
          "id": "large-costume",
          "name": "Costume",
          "iconType": "costume",
          "description": "Everything You Need To Manage A Smooth, Organized Event From One Powerful Dashboard.",
          "price": null,
          "guestRange": "801+ Guests",
          "features": [
            "801+ Guests",
            "Everything Included In The Standard Package",
            "Each Ticket Is Personalized With The Individual Guest's Name.",
            "RSVP-To-Unlock Ticketing: Guests Simply Confirm “Yes” To Reveal Their Personalized Ticket",
            "Tickets Remain Hidden Until Attendance Is Confirmed",
            "Declined Invitations Are Automatically Voided",
            "Elevated, Premium Guest Experience From Invitation To Check-In",
            "Automatically Email Tickets To Guests"
          ],
          "buttonText": "Choose Costume",
          "buttonVariant": "outline",
          "isPopular": false
        }
      ]
    }
  ]
}
```

---

## 3. Standard Error Response Structure

In case of validation or server errors, all endpoints return:
```json
{
  "success": false,
  "message": "Invalid credentials or verification code expired",
  "errorSources": [
    {
      "path": "otp",
      "message": "OTP is invalid or has expired"
    }
  ]
}
```

