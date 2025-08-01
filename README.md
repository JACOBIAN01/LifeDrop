# 🩸 LifeDrop

**LifeDrop** is a modern MERN-stack blood donation and request platform focused on solving real-life problems in India’s emergency blood request system.

---

## 📌 Overview

**LifeDrop** addresses the limitations of existing blood donation platforms by providing:
- Real-time donor availability
- Smart emergency broadcast system
- Donor verification and history tracking
- Dashboards for hospitals/NGOs
- Mobile-first multilingual design
- Analytics and admin control panel

---

## ❗ Current Problems with Existing Platforms

| Problem                            | Description                                                                 |
|------------------------------------|-----------------------------------------------------------------------------|
| ❌ No real-time donor availability | Platforms don’t indicate if a donor is ready to donate *right now*         |
| ❌ Manual emergency broadcast      | Matching donors are not auto-notified during urgent requests               |
| ❌ No verified donor system        | Anyone can register, often without real info                               |
| ❌ Outdated UI/UX                  | Poor mobile usability and accessibility                                    |
| ❌ No institutional dashboards     | No dedicated panels for hospitals or NGOs                                  |
| ❌ No donation history             | Cannot track when a donor last gave or is eligible next                    |
| ❌ No multilingual support         | English-only interface limits accessibility                                |
| ❌ No analytics or insights        | Admins can’t measure platform impact or user behavior                      |

---

## ✅ How LifeDrop Solves These Problems

| Feature                      | What LifeDrop Does                                                                 |
|-----------------------------|-------------------------------------------------------------------------------------|
| ✅ Donor availability toggle | Donors can set themselves as “Available Now” for real-time filtering               |
| ✅ Emergency broadcast       | Automatically notifies matching donors near the requester                         |
| ✅ Donor verification        | OTP login, with optional ID/document uploads                                      |
| ✅ Hospital/NGO dashboards   | Verified institutions can post/manage requests, track responses                   |
| ✅ Multilingual support      | Supports English, Hindi, Bengali, Tamil, and more (i18n)                          |
| ✅ Donation history          | Tracks last donation, frequency, eligibility                                      |
| ✅ Analytics dashboard       | Admins see blood group trends, request fulfillment rates, regional usage patterns |

---

## 🛠️ Tech Stack (MERN)

- **MongoDB**: For storing user, donor, request, and hospital data
- **Express.js**: API layer and backend logic
- **React.js**: Frontend user interface
- **Node.js**: Backend runtime
- **Additional Tools**:
  - JWT for authentication
  - Tailwind CSS for UI
  - Redux Toolkit for state
  - i18next for multilingual UI
  - Socket.io (optional) for real-time updates

---

## 📦 Folder Structure

