import express from "express";
import cors from "cors";
import { db, serverTimestamp } from "./Firebase.js";
import admin from "firebase-admin";
import twilio from "twilio";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

console.log(
  "GOOGLE_APPLICATION_CREDENTIALS:",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
console.log(
  "Twilio SID:",
  process.env.TWILIO_ACCOUNT_SID ? "Loaded" : "Missing"
);
console.log(
  "Twilio Auth Token:",
  process.env.TWILIO_AUTH_TOKEN ? "Loaded" : "Missing"
);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


async function testFirestore() {
  try {
    const docRef = db.collection("test").doc("ping");
    await docRef.set({ timestamp: serverTimestamp() });
    console.log("Firestore connection successful!");
  } catch (err) {
    console.error("Firestore connection failed:", err);
  }
}

testFirestore();

// Blood Request Submit and Donor Alerts
app.post("/api/bloodRequest", async (req, res) => {
  try {
    const {
      uid,
      name,
      email,
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

    // Safe date conversion
    let neededByDate = null;
    if (neededBy && !isNaN(Date.parse(neededBy))) {
      neededByDate = new Date(neededBy);
    }

    // Create request with empty notifiedBy array
    const docRef = await db.collection("requests").add({
      uid,
      name,
      email,
      bloodGroupNeeded,
      hospitalName,
      hospitalAddress,
      city,
      state,
      country,
      neededBy: neededByDate,
      patientCondition,
      phoneNumber,
      status: status || "Pending",
      requestedAt: admin.firestore.FieldValue.serverTimestamp(),
      notifiedBy: [],
    });

    // Fetch all donors with matching blood type
    const donorsSnapshot = await db
      .collection("donors")
      .where("bloodType", "==", bloodGroupNeeded)
      .get();

    for (const donorDoc of donorsSnapshot.docs) {
      const donor = donorDoc.data();

      // Skip creator and donors without phone
      if (donor.userId === uid || !donor.phone) continue;

      // Check if donor has already been notified
      const requestSnap = await db.collection("requests").doc(docRef.id).get();
      const requestData = requestSnap.data();
      if (requestData.notifiedBy.includes(donor.userId)) continue;

      // Send WhatsApp via your existing API
      try {
        await axios.post(`http://localhost:${PORT}/api/send-message`, {
          to: donor.phone,
          message: `🚨 Urgent Blood Request 🚨\n\nA patient in *${
            city || "your area"
          }* needs *${bloodGroupNeeded}* blood.\n💉 Your donation could save a life today.\n❤️ Please confirm if available.`,
        });

        console.log("WhatsApp alert sent to:", donor.phone);

        // Add donor to notifiedBy array
        await db
          .collection("requests")
          .doc(docRef.id)
          .update({
            notifiedBy: admin.firestore.FieldValue.arrayUnion(donor.userId),
          });
      } catch (err) {
        console.error("Error sending WhatsApp via internal API:", err.message);
      }
    }

    res.status(201).json({
      id: docRef.id,
      message: "Request created and donors notified successfully",
    });
  } catch (err) {
    console.error("❌ Error creating request:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
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


//Notification
app.post("/api/send-message", async (req, res) => {
  const { to, message } = req.body;
  
  console.log(
    `⚠️ WhatsApp sending is currently unavailable due to limited Twilio credits.\n` +
      `Recipient: ${to}\n` +
      `Message: ${message}\n` +
      `Uncomment the client.messages.create code below to enable sending when credits are available.`
  );

  // try {
  //   const response = await client.messages.create({
  //     from: "whatsapp:+14155238886", // Twilio WhatsApp number
  //     to: `whatsapp:+91${to}`,
  //     body: message,
  //   });
  //   console.log("Success Send Alert");
  //   res.status(200).json({ success: true, sid: response.sid });
  // } catch (error) {
  //   console.log("Error Alert " + error.message);
  //   res.status(500).json({ success: false, error: error.message });
  // }

  res
    .status(200)
    .json({
      success: true,
      message:
        "Message sending is currently disabled (Twilio credits limited).",
    });

});



// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
