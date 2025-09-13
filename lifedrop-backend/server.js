import express from "express";
import cors from "cors";
import { db, serverTimestamp} from "./Firebase.js";
import admin from "firebase-admin";
import twilio from "twilio";
import "dotenv/config";

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;


// Post Blood Request API
app.post("/api/bloodRequest", async (req, res) => {
  try {
    const {
      uid,
      name,
      email, // still store for display
      bloodGroupNeeded,
      hospitalName,
      hospitalAddress,
      city,
      state,
      country,
      neededBy,
      patientCondition,
      phoneNumber,
      status,
    } = req.body;

    if (!uid) return res.status(400).json({ error: "User UID is required" });

    // ✅ always create a new request document
    const docRef = await db.collection("requests").add({
      uid, // store UID
      name,
      email,
      bloodGroupNeeded,
      hospitalName,
      hospitalAddress,
      city,
      state,
      country,
      neededBy: neededBy ? new Date(neededBy) : null,
      patientCondition,
      phoneNumber,
      status: status || "Pending",
      requestedAt: serverTimestamp(),
    });

    res.status(201).json({
      id: docRef.id,
      message: "Request created successfully",
    });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ error: err.message });
  }
});

// Donor Registration API
app.post("/api/NewDonorRegistration", async (req, res) => {
  try {
    const {
      uid,
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      bloodType,
      address,
      city,
      state,
      country,
      pincode,
      lastDonation,
      donationCount,
      available,
      fcmToken,
    } = req.body;

    if (!uid) return res.status(400).json({ error: "User UID is required" });

    // Update Users collection
    await db.collection("users").doc(uid).set(
      {
        userType: "donor",
        phone,
        gender,
        bloodType,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    // Update Donors collection
    await db
      .collection("donors")
      .doc(uid)
      .set(
        {
          name,
          email,
          phone,
          gender,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          bloodType,
          address,
          city,
          state,
          country,
          pincode,
          lastDonation: lastDonation ? new Date(lastDonation) : null,
          donationCount,
          available,
          fcmToken,
          createdAt: serverTimestamp(),
          userType: "donor",
        },
        { merge: true }
      );

    res.status(201).json({ id: uid, message: "Donor Successfully Registered" });
  } catch (err) {
    console.error("Error donor registration request:", err);
    res.status(500).json({ error: err.message });
  }
});

// Hospital Registration API

app.post("/api/register-org", async (req, res) => {
  try {
    const {
      uid,
      hospitalName,
      hospitalType,
      address,
      city,
      state,
      country,
      pincode,
      phone,
      email,
      website,
      contactPerson,
      verified,
    } = req.body;

    if (!uid) return res.status(400).json({ error: "User UID is required" });

    // Update Users collection role
    await db.collection("users").doc(uid).set(
      {
        userType: "org",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    // Update Organizations collection
    await db.collection("organizations").doc(uid).set(
      {
        hospitalName,
        hospitalType,
        address,
        city,
        state,
        country,
        pincode,
        phone,
        email,
        website,
        contactPerson,
        verified,
        createdAt: serverTimestamp(),
        userType: "org",
      },
      { merge: true }
    );
    res
      .status(201)
      .json({ id: uid, message: "Hospital Successfully Registered" });
  } catch (err) {
    console.error("Error Hospital registration request:", err);
    res.status(500).json({ error: err.message });
  }
});




// Update Request Status
app.post("/api/update-status", async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ error: "Missing id or status" });
    }

    await db
      .collection("requests")
      .doc(id)
      .set({ status: status }, { merge: true });

    return res.status(200).json({ message: "Status Updated Successfully" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return res.status(400).json({ error: err.message });
  }
});

//Manage Notification
app.post("/send", async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: { title, body },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});



//Notification
app.post("/api/send-message", async (req, res) => {
  const { to, message } = req.body;
console.log("Received:", req.body);
  try {
    const response = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio WhatsApp number
      to: `whatsapp:${to}`,
      body: message,
    });
    res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
