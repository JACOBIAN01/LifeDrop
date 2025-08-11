# 🩸 LifeDrop - MVP

LifeDrop is a modern **MERN-stack** blood donation and request platform built to solve **real-life problems** in India’s emergency blood request system.  
This MVP version focuses on **real-time donor availability**, **emergency requests**, and **direct donor-requester communication**.

---

## 📌 MVP Features

### ✅ Core
- **Home Page**
  - Simple Navbar
  - Two primary actions:
    - **Request Blood**
    - **Become a Donor**
- **Request Blood**
  - Form with details (Name, Blood Group, Location, Urgency, Contact)
  - Card view of current active requests
- **Become a Donor**
  - Donor registration form (Name, Blood Group, Location, Contact)
  - Availability toggle ("Available Now")
- **Notifications**
  - When a request is posted, all matching donors get notified
- **Mutual Interest System**
  - Donors can mark themselves "Interested"
  - If both donor and requester agree, contact info is exchanged
- **Blood Donation Completion**
  - Basic flow to mark request as fulfilled

---

## 🛠 Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Redux Toolkit

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- (Optional) Socket.io for real-time notifications

---

Created with ❤️ by Subhadeep — for the people.
