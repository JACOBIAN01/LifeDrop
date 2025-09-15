# LifeDrop - Full-Stack Blood Donation Platform

**LifeDrop** is a full-stack, real-time web application designed to bridge the critical gap between blood donors, recipients, and healthcare organizations. It provides a centralized and efficient platform for managing urgent blood requests, connecting heroes with those in need, instantly.

**Live Demo:** [Link to Deployed Application](#) *(if available)*

---

## ✨ Key Features

- 🩸 **Real-Time Blood Request Feed:** Live-updating feed of all active blood requests, allowing donors to respond to urgent needs immediately.  
- 🔐 **Role-Based Access Control (RBAC):** Secure, multi-tiered system with distinct dashboards and functionalities for four user roles:
  - 👤 **User:** View and create blood requests.  
  - ❤️ **Donor:** View all requests, see matching requests by blood type, and register interest to donate.  
  - 🏥 **Hospital/Organization:** Register institutions, post urgent requests for patients, and manage posts.  
  - 🛡️ **Admin:** Super-user privileges to manage all users, donors, and requests.  
- 📝 **User & Donor Registration:** Seamless sign-up and registration to become certified donors.  
- 🚀 **Dynamic Dashboards:** Tailored dashboards providing relevant info and actions at a glance.  
- ✅ **Secure Authentication:** Robust sign-up, login, and session management powered by Firebase.  
- 📱 **Fully Responsive UI:** Modern, clean, and intuitive interface built with Tailwind CSS.  

---

## 🛠️ Tech Stack & Architecture

**Frontend (Client):**
- React (Vite), React Router, Tailwind CSS, Axios, Lucide React, Firebase (Client SDK)  
- Handles all UI rendering, client-side routing, and state management  
- Reads data in real-time from Firestore and sends mutation requests to backend API  

**Backend (Server):**
- Node.js, Express.js, Firebase Admin SDK, CORS, Dotenv  
- REST API for secure data mutations, validating all write operations in Firestore  

**Database & Services:**
- **Firestore:** Real-time NoSQL database for users, donors, and requests  
- **Firebase Authentication:** Manages user identities and secure access  

---

# Create .env file in the root
touch .env
