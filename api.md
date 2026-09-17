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

### 2.7 Partner Dashboard Metrics
Retrieves aggregated event, guest, venue, and reward metrics for the authenticated partner dashboard.

- **Method**: `GET`
- **Endpoint**: `/metrics/partner`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Partner metrics retrieved successfully",
  "data": {
    "welcomeName": "Alexander",
    "welcomeSubtitle": "Deliver a seamless arrival experience for every host and every guest.",
    "totalEvents": 50,
    "totalGuests": 1560,
    "todayEvents": 3,
    "totalVenues": 10,
    "pendingRewards": 2400,
    "cards": [
      {
        "id": "total-event",
        "title": "Total Event",
        "value": 50,
        "iconType": "events",
        "colorVariant": "gold"
      },
      {
        "id": "total-guests",
        "title": "Total Guests",
        "value": 1560,
        "iconType": "guests",
        "colorVariant": "gold"
      },
      {
        "id": "today-events",
        "title": "Today's Events",
        "value": 3,
        "iconType": "todayEvents",
        "colorVariant": "gold"
      },
      {
        "id": "total-venue",
        "title": "Total Venue",
        "value": 10,
        "iconType": "venue",
        "colorVariant": "gold"
      },
      {
        "id": "pending-rewards",
        "title": "Pending Rewards",
        "value": "$2400",
        "iconType": "rewards",
        "colorVariant": "coral"
      }
    ]
  }
}
```

---

### 2.8 Host Dashboard Metrics
Retrieves aggregated event, guest, RSVP, ticket distribution, and check-in metrics for the authenticated host dashboard.

- **Method**: `GET`
- **Endpoint**: `/metrics/host`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host metrics retrieved successfully",
  "data": {
    "welcomeName": "Alexander",
    "welcomeSubtitle": "Here is a live overview of your hosted events and guest activity across your luxury portfolio.",
    "activeEvent": 1,
    "activeEventName": "Marcus Thorne",
    "totalGuests": 560,
    "rsvpConfirmed": 360,
    "ticketsDistributed": 480,
    "checkInCount": 270,
    "cards": [
      {
        "id": "active-event",
        "title": "Active Event",
        "value": "1",
        "subText": "Marcus Thorne",
        "iconType": "activeEvent",
        "colorVariant": "gold"
      },
      {
        "id": "total-guest",
        "title": "Total Guest",
        "value": "560",
        "iconType": "totalGuest",
        "colorVariant": "gold"
      },
      {
        "id": "rsvp-confirmed",
        "title": "RSVP Confirmed",
        "value": "360",
        "iconType": "rsvpConfirmed",
        "colorVariant": "gold"
      },
      {
        "id": "ticket-distribute",
        "title": "Ticket Distribute",
        "value": "480",
        "totalValue": "560",
        "iconType": "ticketDistribute",
        "colorVariant": "gold"
      },
      {
        "id": "check-in",
        "title": "Check in",
        "value": "270",
        "totalValue": "560",
        "iconType": "checkIn",
        "colorVariant": "gold"
      }
    ]
  }
}
```

---

### 2.9 Partner Events List
Retrieves active and scheduled hosted events for the authenticated partner.

- **Method**: `GET`
- **Endpoint**: `/event/partner`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Partner events retrieved successfully",
  "data": [
    {
      "id": "evt-1",
      "eventType": "Marcus Thorne",
      "hostName": "Marcus Thorne",
      "date": "Oct 12 5:00 PM",
      "venueRoom": "Grand Ballroom",
      "guests": 560,
      "rsvpRate": "92%",
      "checkIn": {
        "checkedIn": 286,
        "total": 560,
        "percentage": "51%"
      },
      "status": "Live Now"
    },
    {
      "id": "evt-2",
      "eventType": "Sophia Nguyen",
      "hostName": "Sophia Nguyen",
      "date": "Oct 28 6:45 PM",
      "venueRoom": "Rose Suite",
      "guests": 480,
      "rsvpRate": "69%",
      "checkIn": {
        "checkedIn": 331,
        "total": 480,
        "percentage": "69%"
      },
      "status": "Live Now"
    },
    {
      "id": "evt-3",
      "eventType": "Liam O'Connor",
      "hostName": "Liam O'Connor",
      "date": "Nov 15 4:00 PM",
      "venueRoom": "Sunset Pavilion",
      "guests": 530,
      "rsvpRate": "74%",
      "checkIn": {
        "checkedIn": 392,
        "total": 530,
        "percentage": "74%"
      },
      "status": "Scheduled"
    }
  ]
}
```

---

### 2.10 Partner Events Management Overview
Retrieves summary metrics (Today's Events, Upcoming Events, Completed Events, Total Guests) and event card listings for the Partner Events Management view.

- **Method**: `GET`
- **Endpoint**: `/event/partner/management`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Events management data retrieved successfully",
  "data": {
    "dateFormatted": "06 Aug, 2026",
    "currentMetrics": {
      "todaysEvents": 3,
      "upcomingEvents": 2,
      "totalGuests": 560
    },
    "pastMetrics": {
      "completedEvents": 10,
      "totalGuests": 560
    },
    "currentEvents": [
      {
        "id": "cur-1",
        "title": "Summer Gala 2026",
        "status": "Active",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "guestLabel": "Guests",
        "guests": 230,
        "checkedIn": 135,
        "remaining": 135,
        "progressPercentage": 47,
        "progressVariant": "green"
      },
      {
        "id": "cur-2",
        "title": "Summer Gala 2026",
        "status": "Active",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "guestLabel": "Guests",
        "guests": 230,
        "checkedIn": 135,
        "remaining": 135,
        "progressPercentage": 47,
        "progressVariant": "orange"
      },
      {
        "id": "cur-3",
        "title": "Tech Summit 2026",
        "status": "Scheduled",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "guestLabel": "Guests",
        "guests": 230,
        "checkedIn": 0,
        "remaining": 230,
        "progressPercentage": 0,
        "progressVariant": "gray"
      }
    ],
    "pastEvents": [
      {
        "id": "past-1",
        "title": "Summer Gala 2026",
        "status": "Active",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "guestLabel": "Guests",
        "guests": 230,
        "checkedIn": 135,
        "remaining": 135,
        "progressPercentage": 47,
        "progressVariant": "green"
      },
      {
        "id": "past-2",
        "title": "Summer Gala 2026",
        "status": "Active",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "guestLabel": "Total Guest",
        "guests": 230,
        "checkedIn": 30,
        "remaining": 135,
        "progressPercentage": 47,
        "progressVariant": "orange"
      },
      {
        "id": "past-3",
        "title": "Tech Summit 2026",
        "status": "Scheduled",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "guestLabel": "Total Guest",
        "guests": 230,
        "checkedIn": 0,
        "remaining": 230,
        "progressPercentage": 0,
        "progressVariant": "gray"
      }
    ]
  }
}
```

---

### 2.11 Partner Current Events Cards
Retrieves active and upcoming event cards for the partner events management page.

- **Method**: `GET`
- **Endpoint**: `/event/partner/current`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Current events retrieved successfully",
  "data": [
    {
      "id": "cur-1",
      "title": "Summer Gala 2026",
      "status": "Active",
      "date": "Aug 3, 2026",
      "time": "7:00 PM - 11:00 PM",
      "hostName": "Liam Martinez",
      "guests": 230,
      "checkedIn": 135,
      "remaining": 135,
      "progressPercentage": 47,
      "progressVariant": "green"
    }
  ]
}
```

---

### 2.12 Partner Past Events Cards
Retrieves completed events for the partner past events view.

- **Method**: `GET`
- **Endpoint**: `/event/partner/past`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Past events retrieved successfully",
  "data": [
    {
      "id": "past-1",
      "title": "Summer Gala 2026",
      "status": "Active",
      "date": "Aug 3, 2026",
      "time": "7:00 PM - 11:00 PM",
      "hostName": "Liam Martinez",
      "guests": 230,
      "checkedIn": 135,
      "remaining": 135,
      "progressPercentage": 47,
      "progressVariant": "green"
    }
  ]
}
```

---

### 2.13 Partner Event Details
Retrieves granular event logistics, host contact information, attendee check-in/RSVP metrics, and attendance/RSVP donut chart breakdown for a specific event ID.

- **Method**: `GET`
- **Endpoint**: `/event/partner/details/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK` (Active Event)**:
```json
{
  "success": true,
  "message": "Event details retrieved successfully",
  "data": {
    "id": "cur-1",
    "title": "Summer Gala 2026",
    "status": "Active",
    "hostName": "Liam Martinez",
    "hostEmail": "example@email.com",
    "hostPhone": "+1256556326",
    "eventTypePrivacy": "Private Event",
    "roomName": "Liam Martinez",
    "scannerAppCode": "IO-8842-X",
    "date": "Aug 3, 2026",
    "time": "7:00 PM - 11:00 PM",
    "metrics": {
      "guestsTotal": 560,
      "rsvpConfirmed": 360,
      "ticketsDistributed": 480,
      "ticketsTotal": 560,
      "checkedIn": 270
    },
    "chart": {
      "title": "Guest Attendance",
      "percentage": "74.1%",
      "segments": [
        { "label": "Guest Responses", "count": 360, "color": "#D1D5DB" },
        { "label": "Checked In", "count": 180, "color": "#16A34A" }
      ]
    }
  }
}
```

- **Response `200 OK` (Scheduled Event)**:
```json
{
  "success": true,
  "message": "Event details retrieved successfully",
  "data": {
    "id": "cur-3",
    "title": "Summer Gala 2026",
    "status": "Scheduled",
    "hostName": "Liam Martinez",
    "hostEmail": "example@email.com",
    "hostPhone": "+1256556326",
    "eventTypePrivacy": "Private Event",
    "roomName": "Liam Martinez",
    "date": "Aug 3, 2026",
    "time": "7:00 PM - 11:00 PM",
    "metrics": {
      "guestsTotal": 560,
      "rsvpConfirmed": 360,
      "ticketsDistributed": 480,
      "ticketsTotal": 560,
      "availableTickets": 80
    },
    "chart": {
      "title": "RSVP Metrics",
      "percentage": "74.1%",
      "segments": [
        { "label": "Confirmed", "count": 360, "color": "#16A34A" },
        { "label": "Pending", "count": 180, "color": "#F59E0B" },
        { "label": "Declined", "count": 20, "color": "#DC2626" }
      ]
    }
  }
}
```

---

### 2.14 Partner Settings & User Profile Management

Endpoints for managing the authenticated partner's profile information, avatar image, account security (password updates), and account termination.

#### 2.14.1 Get Partner Profile
Retrieves the full profile of the currently authenticated partner.

- **Method**: `GET`
- **Endpoint**: `/user/partner/profile`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Partner profile retrieved successfully",
  "data": {
    "id": "507f191e810c19729de860ec",
    "firstName": "Shaima",
    "lastName": "Hussain",
    "email": "alex.johnson@email.com",
    "role": "PARTNER",
    "partnerType": "Venue",
    "businessName": "Elite Events Co.",
    "businessEmail": "john.doe@example.com",
    "phone": "+(000)000-XXXX",
    "website": "www.invitoly.com",
    "businessAddress": "123 East St. San Francisco Ca 94112",
    "profileImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
    "isEmailVerified": true,
    "isActive": true,
    "hasActiveSubscription": true
  }
}
```

---

#### 2.14.2 Update Partner Profile
Updates editable personal & business contact information for the partner.

- **Method**: `PUT`
- **Endpoint**: `/user/partner/profile`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "firstName": "Shaima",
  "lastName": "Hussain",
  "partnerType": "Venue",
  "businessName": "Elite Events Co.",
  "businessEmail": "john.doe@example.com",
  "phone": "+(000)000-XXXX",
  "website": "www.invitoly.com",
  "businessAddress": "123 East St. San Francisco Ca 94112"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Partner profile updated successfully",
  "data": {
    "id": "507f191e810c19729de860ec",
    "firstName": "Shaima",
    "lastName": "Hussain",
    "email": "alex.johnson@email.com",
    "role": "PARTNER",
    "partnerType": "Venue",
    "businessName": "Elite Events Co.",
    "businessEmail": "john.doe@example.com",
    "phone": "+(000)000-XXXX",
    "website": "www.invitoly.com",
    "businessAddress": "123 East St. San Francisco Ca 94112",
    "profileImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"
  }
}
```

---

#### 2.14.3 Upload Partner Avatar
Uploads and updates the partner's profile photograph.

- **Method**: `POST`
- **Endpoint**: `/user/partner/avatar`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Request Body**:
  - `file`: `<Binary Image File (JPEG, PNG, WebP)>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Profile avatar uploaded successfully",
  "data": {
    "profileImage": "https://cdn.inviteonly.com/avatars/partner_507f191e810c19729de860ec.jpg"
  }
}
```

---

#### 2.14.4 Remove Partner Avatar
Removes the current partner photo and restores default avatar placeholder.

- **Method**: `DELETE`
- **Endpoint**: `/user/partner/avatar`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Profile photo removed successfully",
  "data": null
}
```

---

#### 2.14.5 Change Partner Password
Changes the authenticated partner's account password with verification of the current password.

- **Method**: `PUT`
- **Endpoint**: `/user/partner/change-password`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewSecurePassword456!",
  "confirmPassword": "NewSecurePassword456!"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Password updated successfully",
  "data": null
}
```

---

#### 2.14.6 Delete Partner Account
Permanently deletes the partner account and associated records (Danger Zone action).

- **Method**: `DELETE`
- **Endpoint**: `/user/partner/account`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Account permanently deleted",
  "data": null
}
```

---

### 2.15 Venue Management Endpoints

#### 2.15.1 Get All Venues
Retrieves the list of venues created or managed by the authenticated partner.

- **Method**: `GET`
- **Endpoint**: `/venue`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Venues retrieved successfully",
  "data": [
    {
      "id": "venue-1",
      "name": "The Grand Ballroom",
      "streetAddress": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "capacity": "500",
      "hasParking": true,
      "parkingInfo": "Parking is available at the East Entrance. Valet parking is available Friday–Sunday evenings.",
      "spaces": [
        {
          "id": "space-1",
          "name": "Ballroom A",
          "capacity": "250"
        },
        {
          "id": "space-2",
          "name": "Ballroom B",
          "capacity": "150"
        },
        {
          "id": "space-3",
          "name": "Garden Hall",
          "capacity": "100"
        }
      ],
      "createdAt": "2026-03-01T10:00:00Z",
      "updatedAt": "2026-03-01T10:00:00Z"
    }
  ]
}
```

---

#### 2.15.2 Get Venue By ID
Fetches details of a specific venue including all spaces and parking instructions.

- **Method**: `GET`
- **Endpoint**: `/venue/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Venue details retrieved successfully",
  "data": {
    "id": "venue-1",
    "name": "The Grand Ballroom",
    "streetAddress": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "capacity": "500",
    "hasParking": true,
    "parkingInfo": "Parking is available at the East Entrance. Valet parking is available Friday–Sunday evenings.",
    "spaces": [
      {
        "id": "space-1",
        "name": "Ballroom A",
        "capacity": "250"
      },
      {
        "id": "space-2",
        "name": "Ballroom B",
        "capacity": "150"
      },
      {
        "id": "space-3",
        "name": "Garden Hall",
        "capacity": "100"
      }
    ],
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-01T10:00:00Z"
  }
}
```

---

#### 2.15.3 Create New Venue
Creates a new venue with multiple event spaces, room capacity, address, and parking instructions.

- **Method**: `POST`
- **Endpoint**: `/venue`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "The Grand Ballroom",
  "streetAddress": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "capacity": "500",
  "parkingInfo": "Parking is available at the East Entrance. Valet parking is available Friday–Sunday evenings.",
  "spaces": [
    {
      "name": "Ballroom A",
      "capacity": "250"
    },
    {
      "name": "Ballroom B",
      "capacity": "150"
    },
    {
      "name": "Garden Hall",
      "capacity": "100"
    }
  ]
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Venue created successfully",
  "data": {
    "id": "venue_987654",
    "name": "The Grand Ballroom",
    "streetAddress": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "capacity": "500",
    "hasParking": true,
    "parkingInfo": "Parking is available at the East Entrance. Valet parking is available Friday–Sunday evenings.",
    "spaces": [
      {
        "id": "space-1",
        "name": "Ballroom A",
        "capacity": "250"
      }
    ],
    "createdAt": "2026-03-09T09:30:00Z",
    "updatedAt": "2026-03-09T09:30:00Z"
  }
}
```

---

#### 2.15.4 Update Venue
Updates existing venue information, capacity, spaces, or parking notes.

- **Method**: `PUT`
- **Endpoint**: `/venue/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "The Grand Ballroom (Renovated)",
  "streetAddress": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "capacity": "550",
  "parkingInfo": "Parking is available at the East Entrance. Valet parking is available every day.",
  "spaces": [
    {
      "id": "space-1",
      "name": "Ballroom A",
      "capacity": "300"
    }
  ]
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Venue updated successfully",
  "data": {
    "id": "venue_987654",
    "name": "The Grand Ballroom (Renovated)",
    "streetAddress": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "capacity": "550",
    "hasParking": true,
    "parkingInfo": "Parking is available at the East Entrance. Valet parking is available every day.",
    "spaces": [
      {
        "id": "space-1",
        "name": "Ballroom A",
        "capacity": "300"
      }
    ],
    "updatedAt": "2026-03-09T09:35:00Z"
  }
}
```

---

#### 2.15.5 Delete Venue
Deletes a venue and disassociates its assigned spaces.

- **Method**: `DELETE`
- **Endpoint**: `/venue/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Venue deleted successfully",
  "data": {
    "id": "venue_987654"
  }
}
```

---

### 2.16 Partner Host Invitation & Plan Subscription Endpoints

#### 2.16.1 Get All Sent Host Invitations
Retrieves the list of host invitations sent by the authenticated partner, including event info, venue, selected package, and status.

- **Method**: `GET`
- **Endpoint**: `/partner/invite-host`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host invitations retrieved successfully",
  "data": [
    {
      "id": "invite-1",
      "eventName": "Summer Gala 2026",
      "hostName": "Liam Martinez",
      "hostEmail": "liam.martinez@example.com",
      "hostPhone": "+1 (555) 234-5678",
      "venueId": "venue-1",
      "venueName": "The Grand Ballroom",
      "room": "Ballroom A",
      "eventDate": "Aug 3, 2026",
      "endDate": "Aug 3, 2026",
      "eventTime": "7:00 PM - 11:00 PM",
      "totalGuest": 230,
      "status": "Pending Confirmation",
      "packageId": "intimate-standard",
      "packageName": "Standard",
      "tierId": "intimate",
      "tierLabel": "Intimate (Up To 200)",
      "packagePrice": "$149",
      "createdAt": "2026-03-01T10:00:00Z"
    }
  ]
}
```

---

#### 2.16.2 Get Host Invitation By ID
Retrieves details of a specific host invitation.

- **Method**: `GET`
- **Endpoint**: `/partner/invite-host/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host invitation details retrieved successfully",
  "data": {
    "id": "invite-1",
    "eventName": "Summer Gala 2026",
    "hostName": "Liam Martinez",
    "hostEmail": "liam.martinez@example.com",
    "hostPhone": "+1 (555) 234-5678",
    "venueId": "venue-1",
    "venueName": "The Grand Ballroom",
    "room": "Ballroom A",
    "eventDate": "Aug 3, 2026",
    "endDate": "Aug 3, 2026",
    "eventTime": "7:00 PM - 11:00 PM",
    "totalGuest": 230,
    "status": "Pending Confirmation",
    "packageId": "intimate-standard",
    "packageName": "Standard",
    "tierId": "intimate",
    "tierLabel": "Intimate (Up To 200)",
    "packagePrice": "$149",
    "createdAt": "2026-03-01T10:00:00Z"
  }
}
```

---

#### 2.16.3 Send Host Invitation with Selected Plan
Creates and emails a new host invitation configured with the chosen subscription package (e.g. Standard or Premium) and event booking details.

- **Method**: `POST`
- **Endpoint**: `/partner/invite-host`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "hostName": "John Doe",
  "hostEmail": "john.doe@example.com",
  "hostPhone": "+1 (555) 345-6789",
  "venueId": "venue-1",
  "venueName": "The Grand Ballroom",
  "room": "Ballroom A",
  "eventDate": "2026-09-15",
  "endDate": "2026-09-15",
  "eventName": "Annual Tech Gala 2026",
  "packageId": "intimate-premium",
  "packageName": "Premium",
  "tierId": "intimate",
  "tierLabel": "Intimate (Up To 200)",
  "packagePrice": "$399",
  "totalGuest": 200
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Host invitation created and sent successfully",
  "data": {
    "id": "invite_456789",
    "eventName": "Annual Tech Gala 2026",
    "hostName": "John Doe",
    "hostEmail": "john.doe@example.com",
    "status": "Pending Confirmation",
    "packageId": "intimate-premium",
    "packageName": "Premium",
    "packagePrice": "$399",
    "createdAt": "2026-09-12T12:00:00Z"
  }
}
```

---

#### 2.16.4 Resend Host Invitation
Resends the event setup invitation email and link to the host.

- **Method**: `POST`
- **Endpoint**: `/partner/invite-host/:id/resend`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Invitation email resent successfully to host",
  "data": {
    "id": "invite_456789",
    "resent": true
  }
}
```

---

#### 2.16.5 Cancel Host Invitation
Cancels an unconfirmed host invitation.

- **Method**: `DELETE`
- **Endpoint**: `/partner/invite-host/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host invitation cancelled successfully",
  "data": {
    "id": "invite_456789"
  }
}
```

---

### 2.17 Reward & Partner Commission Endpoints

#### 2.17.1 Get Reward Statistics
Retrieves total rewards, pending rewards, paid rewards, reward payout balances, and current global commission percentage.

- **Method**: `GET`
- **Endpoint**: `/reward/stats`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Reward statistics retrieved successfully",
  "data": {
    "totalRewards": 5486,
    "pendingRewards": 2400,
    "paidRewards": 3150,
    "rewardsPayout": 3150,
    "commissionRate": 20
  }
}
```

---

#### 2.17.2 Get Pending Rewards
Retrieves all pending rewards earned from host ticket revenues and package subscriptions, with optional date range filtering.

- **Method**: `GET`
- **Endpoint**: `/reward/pending?dateFrom=01-08-2026&dateTo=31-08-2026`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Pending rewards retrieved successfully",
  "data": [
    {
      "id": "rew-1",
      "partnerName": "Sophie Nguyen",
      "partnerEmail": "s.nguyen@apexlab.com",
      "eventName": "Research Dept",
      "orderId": "TXN-989567",
      "date": "22-08-2026",
      "ticketRevenue": "$6,300.00",
      "rate": "15%",
      "reward": "$945.00",
      "status": "Pending"
    },
    {
      "id": "rew-2",
      "partnerName": "Marcus Thorne",
      "partnerEmail": "m.thorne@apexlab.com",
      "eventName": "Product Lab",
      "orderId": "TXN-989564",
      "date": "30-08-2026",
      "ticketRevenue": "$4,200.00",
      "rate": "10%",
      "reward": "$405.00",
      "status": "Pending"
    }
  ]
}
```

---

#### 2.17.3 Get Payout History / Ledger
Retrieves the ledger of all paid rewards, methods, reference numbers, and recipients.

- **Method**: `GET`
- **Endpoint**: `/reward/payout-history`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Payout history retrieved successfully",
  "data": [
    {
      "id": "pay-1",
      "payoutId": "PAY-564854",
      "partnerName": "Sophie Nguyen",
      "partnerEmail": "s.nguyen@apexlab.com",
      "date": "22-08-2026",
      "referenceId": "TXN-989567",
      "method": "Bank Transfer",
      "reward": "$945.00",
      "status": "Paid"
    }
  ]
}
```

---

#### 2.17.4 Update Commission Rate (Admin Only)
Updates the global default reward commission percentage applied to partner ticket earnings.

- **Method**: `PUT`
- **Endpoint**: `/reward/commission-rate`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "commissionRate": 20
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Commission rate updated successfully",
  "data": {
    "commissionRate": 20
  }
}
```

---

#### 2.17.5 Request Payout (Partner / Host)
Submits a request for a payout from accrued pending rewards.

- **Method**: `POST`
- **Endpoint**: `/reward/payout`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "amount": 945.00,
  "method": "Bank Transfer",
  "accountDetails": "Chase Bank - Account Ending in 4321, Routing 021000021",
  "notes": "August ticket revenue withdrawal"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Payout request submitted successfully",
  "data": {
    "id": "pay-987123",
    "payoutId": "PAY-564854",
    "date": "12-09-2026",
    "referenceId": "TXN-492019",
    "method": "Bank Transfer",
    "reward": "$945.00",
    "status": "Paid"
  }
}
```

---

#### 2.17.6 Approve Reward Payout (Admin Only)
Approves an accrued pending reward and transitions it into payout ledger.

- **Method**: `POST`
- **Endpoint**: `/reward/approve/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Reward approved and marked for payout successfully",
  "data": {
    "id": "rew-1",
    "status": "Approved"
  }
}
```

---

#### 2.17.7 Reject Reward (Admin Only)
Rejects a disputed or invalid pending reward.

- **Method**: `POST`
- **Endpoint**: `/reward/reject/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Reward rejected successfully",
  "data": {
    "id": "rew-1",
    "status": "Rejected"
  }
}
```

---

### 2.18 Host Payment Pending & Proof Upload Endpoints

#### 2.18.1 Get Host Pending Payment Events
Retrieves all events created by or assigned to the host that are awaiting payment verification or receipt upload.

- **Method**: `GET`
- **Endpoint**: `/host/payment-pending`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host pending payment events retrieved successfully",
  "data": [
    {
      "id": "pay-event-1",
      "eventName": "Summer Gala 2026",
      "packageType": "Costume",
      "eventDate": "Aug 3, 2026",
      "eventTime": "7:00 PM - 11:00 PM",
      "eventType": "Privet Event",
      "hostName": "Liam Martinez",
      "hostEmail": "example@email.com",
      "hostPhone": "+1256598326",
      "venueContact": "+1256598326",
      "totalGuest": 230,
      "checkIn": 0,
      "remaining": 0,
      "status": "Pending",
      "invoiceId": "INV-2026-8821",
      "amount": 499,
      "currency": "USD",
      "receiptUrl": null,
      "createdAt": "2026-08-01T10:00:00Z"
    }
  ]
}
```

---

#### 2.18.2 Get Payment Invoice Details
Retrieves official invoice breakdown, line items, and bank transfer credentials for a pending event.

- **Method**: `GET`
- **Endpoint**: `/host/payment-pending/:id/invoice`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Payment invoice retrieved successfully",
  "data": {
    "invoiceId": "INV-2026-8821",
    "eventId": "pay-event-1",
    "eventName": "Summer Gala 2026",
    "hostName": "Liam Martinez",
    "hostEmail": "example@email.com",
    "hostPhone": "+1256598326",
    "date": "Aug 3, 2026",
    "amount": 499,
    "currency": "USD",
    "packageType": "Costume Package",
    "status": "Pending",
    "bankDetails": {
      "bankName": "JPMorgan Chase Bank, N.A.",
      "accountName": "InviteOly Events Inc.",
      "accountNumber": "987654321098",
      "routingNumber": "021000021",
      "swiftCode": "CHASUS33",
      "referenceNumber": "REF-SG26-8821"
    }
  }
}
```

---

#### 2.18.3 Upload Payment Proof / Receipt
Uploads a wire transfer slip or bank receipt PDF/image proving payment for the pending event.

- **Method**: `POST`
- **Endpoint**: `/host/payment-pending/:id/upload-receipt`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Body (`multipart/form-data`)**:
  - `receipt`: `File (PDF, PNG, JPG, max 5MB)`
  - `notes`: `Optional memo or transaction reference number`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Payment receipt uploaded successfully and placed under review",
  "data": {
    "id": "pay-event-1",
    "status": "Under Review",
    "receiptUrl": "https://storage.inviteoly.com/receipts/rec-8821-summer-gala.pdf",
    "uploadedAt": "2026-09-12T13:20:00Z"
  }
}
```

---

#### 2.18.4 Confirm Host Event Payment (Admin Only)
Confirms receipt of wire/bank funds and activates the host event.

- **Method**: `POST`
- **Endpoint**: `/host/payment-pending/:id/confirm`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Event payment confirmed and activated successfully",
  "data": {
    "id": "pay-event-1",
    "status": "Confirmed"
  }
}
```

---

#### 2.18.5 Submit Payment Invoice
Submits payment details, bank wire reference ID, and receipt slip directly against an issued invoice.

- **Method**: `POST`
- **Endpoint**: `/host/payment-pending/:id/submit-invoice`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "invoiceId": "INV-2026-8821",
  "eventId": "pay-event-1",
  "transactionReference": "REF-SG26-8821",
  "paymentMethod": "Bank Transfer",
  "amount": 499.00,
  "receiptName": "wire-slip-8821.pdf",
  "notes": "Sent via Chase online wire transfer"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Payment invoice submitted successfully and queued for review",
  "data": {
    "invoiceId": "INV-2026-8821",
    "status": "Under Review",
    "submittedAt": "2026-09-12T13:25:00Z"
  }
}
```

---

#### 2.18.6 Request Custom Pricing Quote & Admin Invoice Generation
Submits custom event specifications (600+ guests, bespoke venue requirements). Admin receives this request and generates a tailored custom invoice.

- **Method**: `POST`
- **Endpoint**: `/host/pricing/custom-quote`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "eventName": "Summer Gala 2026",
  "eventDate": "Aug 3, 2026",
  "eventTime": "7:00 PM - 11:00 PM",
  "totalGuest": 650,
  "hostName": "Liam Martinez",
  "hostEmail": "example@email.com",
  "hostPhone": "+1256598326",
  "notes": "Large ballroom celebration requiring custom attendee check-in gates and VIP guest list allocation."
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Custom event quote request submitted to admin successfully. Invoice will be issued shortly.",
  "data": {
    "id": "pay-event-1",
    "eventName": "Summer Gala 2026",
    "packageType": "Costume",
    "status": "Pending",
    "invoiceId": "INV-2026-8821",
    "amount": 499,
    "currency": "USD",
    "submittedAt": "2026-09-12T15:00:00Z"
  }
}
```

---

#### 2.18.7 Auto-Generate Package Invoice for Fixed Plans
Automatically generates an official invoice upon purchasing any standard fixed-tier package (e.g. Intimate, Signature, Grand).

- **Method**: `POST`
- **Endpoint**: `/host/pricing/auto-invoice`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "planId": "intimate-standard",
  "planName": "Standard",
  "price": "$149",
  "tierLabel": "Intimate",
  "eventName": "Summer Gala 2026 (Standard)"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Package invoice auto-generated successfully",
  "data": {
    "id": "pay-pkg-9921",
    "eventName": "Summer Gala 2026 (Standard)",
    "packageType": "Standard",
    "status": "Pending",
    "invoiceId": "INV-AUTO-4921",
    "amount": 149,
    "currency": "USD",
    "createdAt": "2026-09-12T15:05:00Z"
  }
}
```

---

#### 2.18.8 Submit Payment Proof Receipt File
Uploads wire transfer receipt slip, bank confirmation document, or payment screenshot for an event.

- **Method**: `POST`
- **Endpoint**: `/host/payment-pending/:id/upload-receipt`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Form Data**:
  - `file`: `<Receipt File (PDF, PNG, JPG, CSV)>`
  - `receiptName`: `"receipt_wire_SG26.pdf"`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Payment receipt uploaded successfully and placed under administrative review",
  "data": {
    "eventId": "pay-event-1",
    "receiptUrl": "/uploads/receipts/receipt_wire_SG26.pdf",
    "status": "Under Review",
    "uploadedAt": "2026-09-12T15:30:00Z"
  }
}
```

---

#### 2.18.9 Submit Payment Invoice Details
Submits official invoice transaction reference with chosen payment method (Bank Transfer, Stripe) and attached receipt slip.

- **Method**: `POST`
- **Endpoint**: `/host/payment-pending/:id/submit-invoice`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "invoiceId": "INV-2026-8821",
  "eventId": "pay-event-1",
  "transactionReference": "REF-SG26-8821",
  "paymentMethod": "Bank Transfer",
  "amount": 499,
  "receiptName": "wire_transfer_slip.pdf",
  "notes": "Wire completed from JPMorgan Chase account on Aug 2."
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Invoice payment details submitted successfully and under review",
  "data": {
    "invoiceId": "INV-2026-8821",
    "eventId": "pay-event-1",
    "status": "Under Review",
    "submittedAt": "2026-09-12T15:32:00Z"
  }
}
```

---

### 2.19 Host Events Management & Guest Ticketing Endpoints

#### 2.19.1 Get All Host Events
Retrieves all events created by or assigned to the host, including active, scheduled, draft, and payment-receipt pending events with attendance progress.

- **Method**: `GET`
- **Endpoint**: `/host/events`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host events retrieved successfully",
  "data": [
    {
      "id": "host-evt-1",
      "title": "Summer Gala 2026",
      "status": "Active",
      "tier": "Premium",
      "date": "Aug 3, 2026",
      "time": "7:00 PM - 11:00 PM",
      "eventType": "Privet Event",
      "hostName": "Liam Martinez",
      "hostEmail": "example@email.com",
      "hostPhone": "+1256598326",
      "scannerCode": "SCAN-8821-X9",
      "totalGuests": 230,
      "checkedIn": 135,
      "remaining": 135,
      "progressPercentage": 47
    },
    {
      "id": "host-evt-2",
      "title": "Tech Summit 2026",
      "status": "Scheduled",
      "tier": "Standard",
      "date": "Aug 3, 2026",
      "time": "7:00 PM - 11:00 PM",
      "eventType": "Privet Event",
      "hostName": "Liam Martinez",
      "hostEmail": "example@email.com",
      "hostPhone": "+1256598326",
      "scannerCode": "SCAN-5510-TS",
      "totalGuests": 230,
      "checkedIn": 0,
      "remaining": 230,
      "progressPercentage": 0
    },
    {
      "id": "host-evt-3",
      "title": "Summer Gala 2026",
      "status": "Draft",
      "tier": "Standard",
      "date": "Aug 3, 2026",
      "time": "7:00 PM - 11:00 PM",
      "eventType": "Privet Event",
      "hostName": "Liam Martinez",
      "hostEmail": "example@email.com",
      "hostPhone": "+1256598326",
      "totalGuests": 230,
      "checkedIn": 0,
      "remaining": 0,
      "progressPercentage": 0
    },
    {
      "id": "host-evt-4",
      "title": "Summer Gala 2026",
      "status": "Upload Payment Receipt",
      "tier": "Costume",
      "date": "Aug 3, 2026",
      "time": "7:00 PM - 11:00 PM",
      "eventType": "Privet Event",
      "hostName": "Liam Martinez",
      "hostEmail": "example@email.com",
      "hostPhone": "+1256598326",
      "totalGuests": 230,
      "checkedIn": 0,
      "remaining": 0,
      "progressPercentage": 0
    }
  ]
}
```

---

#### 2.19.2 Get Host Event By ID
Retrieves detailed information, attendance statistics, and door scanner app credentials for a specific host event.

- **Method**: `GET`
- **Endpoint**: `/host/events/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host event details retrieved successfully",
  "data": {
    "id": "host-evt-1",
    "title": "Summer Gala 2026",
    "status": "Active",
    "tier": "Premium",
    "date": "Aug 3, 2026",
    "time": "7:00 PM - 11:00 PM",
    "eventType": "Privet Event",
    "hostName": "Liam Martinez",
    "hostEmail": "example@email.com",
    "hostPhone": "+1256598326",
    "scannerCode": "SCAN-8821-X9",
    "totalGuests": 230,
    "checkedIn": 135,
    "remaining": 135,
    "progressPercentage": 74.1
  }
}
```

---

#### 2.19.3 Get Host Event Tickets & Attendees
Retrieves the attendee roster and ticket allocation ledger for an event, with optional status and search filters.

- **Method**: `GET`
- **Endpoint**: `/host/events/:id/tickets?status=all&search=Marcus`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Query Parameters**:
  - `status`: `all` | `editable` | `locked` | `sent` | `voided` (optional)
  - `search`: search string matching guest name, email, or table (optional)
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Event tickets retrieved successfully",
  "data": [
    {
      "id": "t-1",
      "ticketId": "Guest 001",
      "guestName": "Marcus Thorne",
      "guestEmail": "m.thorne@example.com",
      "table": "A1",
      "rsvpStatus": "--",
      "reminderStatus": "--",
      "ticketType": "General Admission",
      "ticketLink": "--",
      "checkInTime": "--",
      "status": "Editable"
    },
    {
      "id": "t-4",
      "ticketId": "Guest 004",
      "guestName": "Nina Patel",
      "guestEmail": "nina.patel@example.com",
      "table": "A4",
      "rsvpStatus": "--",
      "reminderStatus": "--",
      "ticketType": "VIP",
      "ticketLink": "https://inviteonly.app/tickets/t-guest004",
      "checkInTime": "5:30 PM",
      "status": "Locked/ Ready"
    },
    {
      "id": "t-7",
      "ticketId": "Guest 007",
      "guestName": "Zara Kim",
      "guestEmail": "zara.kim@example.com",
      "table": "A7",
      "rsvpStatus": "Pending",
      "reminderStatus": "Reminder",
      "ticketType": "Child",
      "ticketLink": "https://inviteonly.app/tickets/t-guest007",
      "checkInTime": "6:00 PM",
      "status": "Sent"
    }
  ]
}
```

---

#### 2.19.4 Add Guest / Create Ticket
Adds an attendee to the host event and generates an editable ticket assignment.

- **Method**: `POST`
- **Endpoint**: `/host/events/:id/tickets`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "guestName": "Marcus Thorne",
  "guestEmail": "marcus.t@example.com",
  "ticketType": "VIP",
  "table": "A1"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Guest added successfully",
  "data": {
    "id": "t-13",
    "ticketId": "Guest 013",
    "guestName": "Marcus Thorne",
    "guestEmail": "marcus.t@example.com",
    "table": "A1",
    "rsvpStatus": "--",
    "reminderStatus": "--",
    "ticketType": "VIP",
    "ticketLink": "https://inviteonly.app/tickets/t-guest013",
    "checkInTime": "--",
    "status": "Editable"
  }
}
```

---

#### 2.19.5 Send Ticket Reminder
Sends an automated RSVP / attendance reminder notification to a specific ticket holder.

- **Method**: `POST`
- **Endpoint**: `/host/events/:id/tickets/:ticketId/remind`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Reminder sent successfully to attendee",
  "data": {
    "ticketId": "Guest 007",
    "reminderStatus": "Reminder",
    "sentAt": "2026-09-12T14:30:00Z"
  }
}
```

---

#### 2.19.6 Bulk Send Ticket Invitations
Sends invitations and digital ticket claim links to all or selected guests.

- **Method**: `POST`
- **Endpoint**: `/host/events/:id/tickets/bulk-send`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "ticketIds": ["t-1", "t-2", "t-3", "t-4", "t-5"]
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "5 ticket invitations sent successfully",
  "data": {
    "sentCount": 5,
    "timestamp": "2026-09-12T14:35:00Z"
  }
}
```

---

#### 2.19.7 Regenerate Scanner App Login Code
Generates a new secure access code for door attendants and event check-in staff.

- **Method**: `POST`
- **Endpoint**: `/host/events/:id/scanner-code/regenerate`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Scanner app login code regenerated successfully",
  "data": {
    "eventId": "host-evt-1",
    "scannerCode": "SCAN-9142-X9",
    "generatedAt": "2026-09-12T14:40:00Z"
  }
}
---

### 2.20 Host Dashboard Events & RSVP Metrics

#### 2.20.1 Get Host Dashboard Events Table
Retrieves the events list specifically formatted for the host dashboard table overview.

- **Method**: `GET`
- **Endpoint**: `/host/dashboard/events`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host dashboard events retrieved successfully",
  "data": [
    {
      "id": "evt-host-1",
      "eventName": "Marcus Thorne",
      "date": "Oct 12, 2026",
      "rsvpRate": 92,
      "checkIn": {
        "checkedIn": 286,
        "total": 560
      },
      "status": "Live Now"
    },
    {
      "id": "evt-host-2",
      "eventName": "Nia Johnson",
      "date": "Nov 05, 2026",
      "rsvpRate": 65,
      "checkIn": {
        "checkedIn": 289,
        "total": 317
      },
      "status": "Scheduled"
    },
    {
      "id": "evt-host-3",
      "eventName": "Nia Johnson",
      "date": "Nov 05, 2026",
      "rsvpRate": null,
      "checkIn": null,
      "status": "Pending"
    },
    {
      "id": "evt-host-4",
      "eventName": "Nia Johnson",
      "date": "Nov 05, 2026",
      "rsvpRate": null,
      "checkIn": null,
      "status": "Pending"
    },
    {
      "id": "evt-host-5",
      "eventName": "Nia Johnson",
      "date": "Nov 05, 2026",
      "rsvpRate": null,
      "checkIn": null,
      "status": "Pending"
    },
    {
      "id": "evt-host-6",
      "eventName": "Nia Johnson",
      "date": "Nov 05, 2026",
      "rsvpRate": null,
      "checkIn": null,
      "status": "Pending"
    },
    {
      "id": "evt-host-7",
      "eventName": "Nia Johnson",
      "date": "Nov 05, 2026",
      "rsvpRate": null,
      "checkIn": null,
      "status": "Pending"
    },
    {
      "id": "evt-host-8",
      "eventName": "Nia Johnson",
      "date": "Nov 05, 2026",
      "rsvpRate": null,
      "checkIn": null,
      "status": "Pending"
    }
  ]
}
```

---

#### 2.20.2 Get Host RSVP Metrics
Retrieves aggregated RSVP metrics and breakdown counts for the host portfolio donut chart.

- **Method**: `GET`
- **Endpoint**: `/host/dashboard/rsvp-metrics`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Host RSVP metrics retrieved successfully",
  "data": {
    "totalInvited": 560,
    "confirmationRate": "74.1%",
    "confirmed": 360,
    "pending": 180,
    "declined": 20,
    "summaryText": "Total invited 560. Current confirmation rate is 74.1%, up from last week's projection.",
    "segments": [
      {
        "label": "Confirmed",
        "count": 360,
        "color": "#0FA958"
      },
      {
        "label": "Pending",
        "count": 180,
        "color": "#E5A000"
      },
      {
        "label": "Declined",
        "count": 20,
        "color": "#B91C1C"
      }
    ]
  }
}
```

---

### 2.21 Admin Event Management Endpoints

#### 2.21.1 Get Admin Events Overview & Listing
Retrieves high-level event metrics (total, active, completed) and the list of private events with tier, host, venue, and guest capacity.

- **Method**: `GET`
- **Endpoint**: `/admin/events`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Admin events retrieved successfully",
  "data": {
    "metrics": {
      "totalEvents": 2486,
      "activeEvents": 10,
      "completedEvents": 420
    },
    "events": [
      {
        "id": "evt-admin-1",
        "title": "Spring Fling Festival",
        "tier": "Standard",
        "date": "Apr 22, 2026",
        "time": "3:00 PM - 9:00 PM",
        "hostName": "Ethan Patel",
        "venue": "Meadowview Gardens, San Francisco",
        "totalGuests": 175,
        "status": "Active"
      },
      {
        "id": "evt-admin-2",
        "title": "Winter Wonderland Ball",
        "tier": "Premium",
        "date": "Dec 12, 2026",
        "time": "8:00 PM - 12:00 AM",
        "hostName": "Sophia Kim",
        "venue": "Crystal Palace, New York",
        "totalGuests": 310,
        "status": "Active"
      },
      {
        "id": "evt-admin-3",
        "title": "Summer Gala 2026",
        "tier": "Premium",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "venue": "Royal Convention Hall, Dhaka",
        "totalGuests": 230,
        "status": "Active"
      },
      {
        "id": "evt-admin-4",
        "title": "Autumn Harvest Feast",
        "tier": "Premium",
        "date": "Oct 14, 2026",
        "time": "5:00 PM - 10:00 PM",
        "hostName": "Olivia Nguyen",
        "venue": "Golden Fields Vineyard, Napa Valley",
        "totalGuests": 195,
        "status": "Active"
      },
      {
        "id": "evt-admin-5",
        "title": "Winter Wonderland Ball",
        "tier": "Standard",
        "date": "Dec 12, 2026",
        "time": "8:00 PM - 12:00 AM",
        "hostName": "Sophia Kim",
        "venue": "Crystal Palace, New York",
        "totalGuests": 310,
        "status": "Active"
      },
      {
        "id": "evt-admin-6",
        "title": "Summer Gala 2026",
        "tier": "Standard",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "venue": "Royal Convention Hall, Dhaka",
        "totalGuests": 230,
        "status": "Active"
      },
      {
        "id": "evt-admin-7",
        "title": "Midnight Masquerade",
        "tier": "Premium",
        "date": "Nov 20, 2026",
        "time": "9:00 PM - 2:00 AM",
        "hostName": "Noah Johnson",
        "venue": "The Grand Ballroom, Chicago",
        "totalGuests": 280,
        "status": "Active"
      },
      {
        "id": "evt-admin-8",
        "title": "Winter Wonderland Ball",
        "tier": "Premium",
        "date": "Dec 12, 2026",
        "time": "8:00 PM - 12:00 AM",
        "hostName": "Sophia Kim",
        "venue": "Crystal Palace, New York",
        "totalGuests": 310,
        "status": "Active"
      },
      {
        "id": "evt-admin-9",
        "title": "Summer Gala 2026",
        "tier": "Standard",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "venue": "Royal Convention Hall, Dhaka",
        "totalGuests": 230,
        "status": "Active"
      }
    ]
  }
}
```

---

#### 2.21.2 Get Admin Event Details by ID
Retrieves full event audit details including host info, basic event metadata, schedule dates/times, venue details, capacity, and complete guest attendee roster.

- **Method**: `GET`
- **Endpoint**: `/admin/events/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Admin event details retrieved successfully",
  "data": {
    "id": "evt-admin-1",
    "tier": "Premium",
    "hostName": "John Doe",
    "hostType": "Individual",
    "email": "john.doe@example.com",
    "phone": "+(000)000-0000",
    "companyName": "---",
    "eventName": "John Doe",
    "eventType": "Wedding",
    "eventDescription": "Lorem ipsum dolor sit amet consectetur. Purus sem egestas suspendisse sit tristique libero massa imperdiet laoreet. Nunc iaculis pharetra enim integer feugiat. Arcu lectus consectetur vitae etiam urna urna congue ut metus. Orci montes mus a magnis lobortis quis faucibus eget. Morbi faucibus pulvinar tristique quis lectus. Sem nisi mauris tristique mauris lorem. Ut adipiscing viverra varius justo sit.",
    "eventDate": "mm / dd / yyyy",
    "endDate": "mm / dd / yyyy",
    "startTime": "--:-- --",
    "endTime": "--:-- --",
    "venue": "Select venue",
    "room": "Hall A",
    "venueState": "Banasree,Dhaka,Bangladesh",
    "city": "Banasree,Dhaka,Bangladesh",
    "postalCode": "Banasree,Dhaka,Bangladesh",
    "venueContact": "+015487456489",
    "venueGuestCapacity": "e.g,500",
    "estimateGuestCount": "e.g,400",
    "guests": [
      {
        "id": "gst-1",
        "name": "Marcus Thorne",
        "email": "example@gmail.com",
        "ticketType": "General Admission",
        "seat": "A1"
      },
      {
        "id": "gst-2",
        "name": "Dmitri Ivanov",
        "email": "dmitri.ivanov@example.com",
        "ticketType": "General Admission",
        "seat": "A2"
      },
      {
        "id": "gst-3",
        "name": "Zara Ali",
        "email": "zara.ali@example.com",
        "ticketType": "Child",
        "seat": "A3"
      },
      {
        "id": "gst-4",
        "name": "Ethan Brooks",
        "email": "ethan.brooks@example.com",
        "ticketType": "VIP",
        "seat": "A4"
      },
      {
        "id": "gst-5",
        "name": "Raj Patel",
        "email": "raj.patel@example.com",
        "ticketType": "Staff",
        "seat": "A5"
      },
      {
        "id": "gst-6",
        "name": "Sofia Petrov",
        "email": "sofia.petrov@example.com",
        "ticketType": "Vendor",
        "seat": "A6"
      },
      {
        "id": "gst-7",
        "name": "Omar El-Sayed",
        "email": "omar.elsayed@example.com",
        "ticketType": "General Admission",
        "seat": "A7"
      },
      {
        "id": "gst-8",
        "name": "Maya Nguyen",
        "email": "maya.nguyen@example.com",
        "ticketType": "VIP",
        "seat": "A8"
      },
      {
        "id": "gst-9",
        "name": "Nina Johansson",
        "email": "nina.johansson@example.com",
        "ticketType": "Staff",
        "seat": "A9"
      },
      {
        "id": "gst-10",
        "name": "Jasper Liu",
        "email": "jasper.liu@example.com",
        "ticketType": "Child",
        "seat": "A10"
      },
      {
        "id": "gst-11",
        "name": "Lucia Ferrer",
        "email": "lucia.ferrer@example.com",
        "ticketType": "VIP",
        "seat": "A11"
      },
      {
        "id": "gst-12",
        "name": "Anika Bose",
        "email": "anika.bose@example.com",
        "ticketType": "Staff",
        "seat": "A12"
      },
      {
        "id": "gst-13",
        "name": "Chloe Martin",
        "email": "chloe.martin@example.com",
        "ticketType": "VIP",
        "seat": "A13"
      },
      {
        "id": "gst-14",
        "name": "Elena Ramirez",
        "email": "elena.ramirez@example.com",
        "ticketType": "Vendor",
        "seat": "A14"
      },
      {
        "id": "gst-15",
        "name": "Liam O'Connor",
        "email": "liam.oconnor@example.com",
        "ticketType": "Staff",
        "seat": "A15"
      },
      {
        "id": "gst-16",
        "name": "Marcus Thorne",
        "email": "example@gmail.com",
        "ticketType": "VIP",
        "seat": "A16"
      },
      {
        "id": "gst-17",
        "name": "Carlos Mendes",
        "email": "carlos.mendes@example.com",
        "ticketType": "Staff",
        "seat": "A17"
      }
    ]
  }
}
```

---

### 2.22 Admin User Management Endpoints

#### 2.22.1 Get Admin Users List
Retrieves a paginated list of registered users with roles, join dates, and event participation metrics.

- **Method**: `GET`
- **Endpoint**: `/admin/users`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Query Parameters**:
  - `searchTerm` *(optional, string)*: Filter by user name, email, or user ID.
  - `role` *(optional, string)*: Filter by `"Host"` or `"Partner"`.
  - `page` *(optional, number)*: Page index (default: `1`).
  - `limit` *(optional, number)*: Items per page (default: `10`).
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Admin users retrieved successfully",
  "data": [
    {
      "id": "usr-admin-1",
      "name": "Marcus Thorne",
      "email": "m.thorne@apexlab.com",
      "avatarUrl": "https://i.pravatar.cc/150?img=12",
      "role": "Host",
      "joinDate": "Oct 12, 2023",
      "eventCount": {
        "active": 2,
        "total": 5
      },
      "status": "Active"
    },
    {
      "id": "usr-admin-2",
      "name": "Marcus Thorne",
      "email": "m.thorne@apexlab.com",
      "avatarUrl": "https://i.pravatar.cc/150?img=12",
      "role": "Partner",
      "joinDate": "Oct 12, 2023",
      "eventCount": {
        "active": 2,
        "total": 5
      },
      "status": "Active"
    },
    {
      "id": "usr-admin-3",
      "name": "Jinsoo Park",
      "email": "j.park@apexlab.com",
      "avatarUrl": "https://i.pravatar.cc/150?img=33",
      "role": "Host",
      "joinDate": "Oct 18, 2023",
      "eventCount": {
        "active": 4,
        "total": 5
      },
      "status": "Active"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 9,
    "totalPage": 1
  }
}
```

---

#### 2.22.2 Get Admin User Profile & Subscription Details
Retrieves user profile details, active subscription package, plan pricing, and list of hosted/partner events.

- **Method**: `GET`
- **Endpoint**: `/admin/users/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Admin user profile retrieved successfully",
  "data": {
    "id": "usr-admin-1",
    "name": "John Doe",
    "email": "john@email.com",
    "address": "Dhaka,Bangladesh",
    "currentPlan": "Monthly",
    "avatarUrl": "https://i.pravatar.cc/300?img=11",
    "bannerUrl": "/dashboardMetricsBg.png",
    "status": "Active",
    "subscription": {
      "plan": "Premium",
      "price": "$120.00",
      "lastEventDate": "Aug, 05, 2026",
      "totalEvent": 10
    },
    "events": [
      {
        "id": "evt-admin-1",
        "title": "Spring Fling Festival",
        "tier": "Standard",
        "date": "Apr 22, 2026",
        "time": "3:00 PM - 9:00 PM",
        "hostName": "Ethan Patel",
        "venue": "Meadowview Gardens, San Francisco",
        "totalGuests": 175
      },
      {
        "id": "evt-admin-2",
        "title": "Winter Wonderland Ball",
        "tier": "Premium",
        "date": "Dec 12, 2026",
        "time": "8:00 PM - 12:00 AM",
        "hostName": "Sophia Kim",
        "venue": "Crystal Palace, New York",
        "totalGuests": 310
      },
      {
        "id": "evt-admin-3",
        "title": "Summer Gala 2026",
        "tier": "Premium",
        "date": "Aug 3, 2026",
        "time": "7:00 PM - 11:00 PM",
        "hostName": "Liam Martinez",
        "venue": "Royal Convention Hall, Dhaka",
        "totalGuests": 230
      }
    ]
  }
}
```

---

#### 2.22.3 Suspend User Account
Updates user status to suspended or activates/reactivates.

- **Method**: `POST`
- **Endpoint**: `/admin/users/:id/suspend`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "User suspended successfully",
  "data": {
    "success": true,
    "status": "Suspended"
  }
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




