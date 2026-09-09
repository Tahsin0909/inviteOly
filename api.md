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

