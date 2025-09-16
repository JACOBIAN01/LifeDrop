# LifeDrop - Full-Stack Blood Donation Platform

**LifeDrop** is a full-stack, real-time web application designed to bridge the critical gap between blood donors, recipients, and healthcare organizations. It provides a centralized and efficient platform for managing urgent blood requests, connecting heroes with those in need, instantly.

**Live Demo:** [https://life-drop-xi.vercel.app/](https://life-drop-xi.vercel.app/)

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

## 📢 Advanced Integration — WhatsApp Alerts (Twilio)  
- 🔔 **Instant Notifications:** Urgent requests trigger automated WhatsApp alerts to matching donors.  
- ⚡ **Event-Driven Flow:** Firebase Cloud Functions filter donors by city & blood type, then call Twilio API.  
- 📊 **Admin Monitoring:** Track alerts, delivery status, and donor engagement.  

---

## 🏠 Application Previews

### Home Page
<img width="1894" height="927" alt="image" src="https://github.com/user-attachments/assets/945ef41a-e043-44dd-82f4-f48a19205354" />

### User Dashboard
<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/159ef0bf-92bc-4a97-aa14-e96f4517f2cf" />

### Donor Dashboard
<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/dfced28b-5616-49a6-a66f-b72a51d0d744" />

### Hospital Registration
<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/7057235b-2433-4905-8ab0-387b8347ff74" />

### Hospital/Organization Dashboard
<img width="1919" height="928" alt="image" src="https://github.com/user-attachments/assets/7f3e0769-553b-48d7-bdd8-1e6fab4fae85" />

### Admin Dashboard
<img width="1800" height="925" alt="image" src="https://github.com/user-attachments/assets/1c01defe-95b5-4336-a500-a587f484d8cf" />
<img width="1800" height="925" alt="image" src="https://github.com/user-attachments/assets/1871ce74-2c7e-460e-81c9-33698bf72db7" />

### Blood Request Feed
<img width="1800" height="925" alt="image" src="https://github.com/user-attachments/assets/9221c7b1-60a5-43f4-b4dc-63225f1fcde8" />

### Become a Donor
<img width="1800" height="925" alt="image" src="https://github.com/user-attachments/assets/bc86af68-06da-4876-b5c2-7c314dc6d435" />

## Auth Page
<img width="1000" height="900" alt="image" src="https://github.com/user-attachments/assets/de20ac5c-ea5e-45bf-a19a-b3a75477f7f5" />
<img width="1000" height="900" alt="image" src="https://github.com/user-attachments/assets/f35b1048-4455-45bd-9232-f439da7647c0" />

🖥️ Source Code Overview⚡

<img width="1900" height="1079" alt="image" src="https://github.com/user-attachments/assets/ecf7350a-1954-4ecf-9e2d-eff7e8f834a0" />
<img width="1900" height="1079" alt="image" src="https://github.com/user-attachments/assets/53f86f76-c027-4429-b577-4c43ed1643df" />




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
