import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import Ask_to_Sign_In from "./BloodRequestPage";
import { useCurrentUser } from "../services/AuthService";


export default function BecomeDonorPage() {

  const user = useCurrentUser();

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [lastDonation, setLastDonation] = useState("");
  const [donationCount, setDonationCount] = useState(0);
  const [available, setAvailable] = useState(true);

  if(user===null){
    return(
      <Ask_to_Sign_In/>
    )
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dobTimestamp = dateOfBirth
      ? Timestamp.fromDate(new Date(dateOfBirth))
      : null;
    const lastDonationTimestamp = lastDonation
      ? Timestamp.fromDate(new Date(lastDonation))
      : null;

      
    const donorData = {
      name,
      email,
      phone,
      gender,
      dateOfBirth: dobTimestamp,
      bloodType,
      address,
      city,
      state,
      country,
      pincode,
      lastDonation: lastDonationTimestamp,
      donationCount: Number(donationCount),
      available,
      fcmToken: "", // You can set this if you implement push notifications
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "donors"), donorData);
      alert("Thank you for becoming a donor! Your information has been saved.");
      // Reset some fields except name and email
      setPhone("");
      setGender("");
      setDateOfBirth("");
      setBloodType("");
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
      setPincode("");
      setLastDonation("");
      setDonationCount(0);
      setAvailable(true);
    } catch (err) {
      console.error("Error adding donor: ", err);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-rose-500 mb-6">
            Become a Donor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
            onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border bg-gray-50 rounded-lg focus:outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </label>

            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
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

            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <label className="block text-sm font-medium text-gray-700">
              Last Donation Date
              <input
                type="date"
                value={lastDonation}
                onChange={(e) => setLastDonation(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </label>

            <input
              type="number"
              placeholder="Donation Count"
              value={donationCount}
              onChange={(e) => setDonationCount(e.target.value)}
              min={0}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={available}
                onChange={() => setAvailable(!available)}
                className="form-checkbox h-5 w-5 text-rose-500"
              />
              <span>Available to Donate</span>
            </label>

            <button
              type="submit"
              className="w-full bg-rose-500 text-white py-2 rounded-xl hover:bg-rose-600 transition"
            >
              Submit Donor Info
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
