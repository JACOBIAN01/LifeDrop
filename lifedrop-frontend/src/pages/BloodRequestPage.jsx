import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../services/firebase";
import { doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { useCurrentUser } from "../services/AuthService";

function Ask_to_Sign_In() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-rose-500 mb-4">
            Please Sign in to Continue
          </h1>
          <p className="text-gray-600">
            You need to be signed in to request blood or access this page.
          </p>
        </div>
      </div>
    </>
  );
}

export default function BloodRequestPage() {
  const user = useCurrentUser();

  const [bloodGroupNeeded, setBloodGroupNeeded] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [neededBy, setNeededBy] = useState(""); // date string
  const [patientCondition, setPatientCondition] = useState("Normal");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState(""); // or notes, your choice


  if (user === null) {
    return <Ask_to_Sign_In />;
  }

  if(user?.name===null || user?.email===null){
      alert("Please Update your Name , Email")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert neededBy string date to Firestore Timestamp
    const neededByTimestamp = neededBy
      ? Timestamp.fromDate(new Date(neededBy))
      : null;

    const requestData = {
      name:user?.displayName,
      email:user?.email,
      bloodGroupNeeded,
      hospitalName,
      hospitalAddress,
      city,
      state,
      country,
      neededBy: neededByTimestamp,
      patientCondition,
      phoneNumber,
      status,
      requestedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, "requests", user.uid), requestData, { merge: true });
      alert("Your blood request has been submitted successfully!");
      // Reset form fields except name/email
      setBloodGroupNeeded("");
      setHospitalName("");
      setHospitalAddress("");
      setCity("");
      setState("");
      setCountry("");
      setNeededBy("");
      setPatientCondition("Normal");
      setPhoneNumber("");
      setStatus("");
    } catch (err) {
      console.error("Error adding document: ", err);
      alert(err);
    }
  };

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-rose-500 mb-6">
            Request Blood
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={user?.displayName}
              readOnly
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="email"
              placeholder="Email"
              value={user?.email}
              readOnly
              className="w-full px-4 py-2 border bg-gray-50 rounded-lg focus:outline-none"
            />

            <select
              value={bloodGroupNeeded}
              onChange={(e) => setBloodGroupNeeded(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>

            <input
              type="text"
              placeholder="Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="text"
              placeholder="Hospital Address"
              value={hospitalAddress}
              onChange={(e) => setHospitalAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <label className="block text-sm font-medium text-gray-700">
              Needed By
              <input
                type="date"
                value={neededBy}
                onChange={(e) => setNeededBy(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </label>

            <select
              value={patientCondition}
              onChange={(e) => setPatientCondition(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>

            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="text"
              placeholder="Status (Optional)"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <button
              type="submit"
              className="w-full bg-rose-500 text-white py-2 rounded-xl hover:bg-rose-600 transition"
            >
              Submit Blood Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
