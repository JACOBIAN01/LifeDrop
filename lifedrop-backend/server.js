import express from "express";
import cors from "cors";
import { db, serverTimestamp} from "./Firebase.js";
import admin from "firebase-admin";
import twilio from "twilio";
import dotenv from "dotenv";
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

const PORT = 5000;

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



// Post Blood Request API
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

    // ✅ Safe date conversion
    let neededByDate = null;
    if (neededBy && !isNaN(Date.parse(neededBy))) {
      neededByDate = new Date(neededBy);
    }

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
      requestedAt: admin.firestore.FieldValue.serverTimestamp(), // ✅ use admin
    });

    res.status(201).json({
      id: docRef.id,
      message: "Request created successfully",
    });
  } catch (err) {
    console.error("❌ Error creating request:", err); // full error
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
if(to==null){console.log("to null");}
console.log("Inside server to  Received:", to);
console.log("Inside Server msg Received: ",message);
  try {
    const response = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio WhatsApp number
      to: `whatsapp:+91${to}`,
      body: message,
    });
    console.log("Success Send Alert");
    res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    console.log("Error Alert "+error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});



// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
