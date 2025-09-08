import express from "express";
import cors from "cors";
import { db, serverTimestamp } from "./Firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

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

    const docRef = db.collection("requests").doc(uid);

    await docRef.set(
      {
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
        status,
        requestedAt: serverTimestamp(),
      },
      { merge: true }
    );

    res
      .status(201)
      .json({ id: uid, message: "Request created/updated successfully" });
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

//Delete Blood Request API
app.post("/delete-request/:uid", async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) return res.status(400).json({ err: "User UID is Required" });
    const docRef = db.collection("requests").doc(uid);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Request Not Found" });
    }

    await docRef.delete();
    res
      .status(200)
      .json({ message: `Blood request ${uid} deleted successfully` });
  } catch (err) {
    console.error("Error deleting request:", err);
    res.status(500).json({ error: err.message });
  }
});


// Start Server

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
