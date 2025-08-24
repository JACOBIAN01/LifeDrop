# LifeDrop


[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/JACOBIAN01/LifeDrop)

LifeDrop is a community-focused web application designed to streamline blood donation and urgent blood requests. It connects donors with recipients, enabling immediate communication and seamless donation management.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview
LifeDrop aims to simplify the process of blood donation and urgent blood requirements by providing:

- A platform for users to register as blood donors or recipients.
- Real-time notifications to donors when a blood request matches their blood group.
- Secure handling of blood requests and donor payments.
- Dashboard for donors to view relevant requests and track their contributions.

---

## Features
### For Donors
- Personalized dashboard showing matching blood requests.
- Real-time notifications for new requests.
- Track donation history and contributions.
- Option to manage profile and availability.

### For Recipients
- Submit urgent blood requests with details like blood type, location, and quantity.
- Track request status and donor responses.
- Secure payment integration for donor compensation (if applicable).

### Admin
- Manage users, requests, and system data.
- Monitor overall platform activity and analytics.

---

## Technologies Used
- **Frontend:** React.js, Tailwind CSS, HTML5, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB / Firebase (depending on your setup)
- **Authentication & Notifications:** Firebase Authentication & FCM
- **Deployment:** Render / Vercel / Netlify
- **Version Control:** Git & GitHub

---

## Architecture
LifeDrop follows a modern **MERN-style architecture**:


- **Frontend:** Handles user interaction, dashboards, and notifications.
- **Backend:** Processes requests, matches blood groups, and manages data.
- **Database:** Stores user profiles, blood requests, and donation history.
- **Notifications:** Firebase Cloud Messaging (FCM) for real-time updates.

--
