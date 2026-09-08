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

