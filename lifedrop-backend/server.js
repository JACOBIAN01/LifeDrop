import express from "express";
import cors from "cors";
import { db } from "../lifedrop-frontend/src/services/firebase.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const app = express();
app.use(cors());
app.use(express.json());

//Post Blood Request API
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

    if (!uid) {
      return res.status(400).json({ error: "User UID is required" });
    }

    const docRef = doc(db, "requests", uid);

    await setDoc(
      docRef,
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

    res.status(201).json({
      id: uid,
      message: "Request created/updated successfully",
    });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ error: err.message });
  }
});

// Become a Donor API
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
      userType,
    } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "User UID is required" });
    }

    ///Update Users Collection Update Users Collection: Change userType = "donor"
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        userType: "donor", // update role
        phone,
        gender,
        bloodType,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    const docRef = doc(db, "donors", uid);
    //Update Donor Collection
    await setDoc(
      docRef,
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
        userType,
      },
      { merge: true }
    );

    res.status(201).json({
      id: uid,
      message: "Donor Successfully Registered",
    });
  } catch (err) {
    console.error("Error donor registration request:", err);
    res.status(500).json({ error: err.message });
  }
});

// New Hospital Register API
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

    if (!uid) {
      return res.status(400).json({ error: "User UID is required" });
    }

    //Update User role from user to Org
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        userType: "org",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    //Update organization Data
    const orgRef = doc(db, "organizations", uid);
    await setDoc(
      orgRef,
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
      .status(203)
      .json({ id: uid, message: "Hospital Succesfully Registered" });
  } catch (err) {
    console.error("Error Hospital registration request:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
