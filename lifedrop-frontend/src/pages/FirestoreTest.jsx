import React, { useState } from "react";
import { db } from "../services/Firebase";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { useCurrentUser } from "../services/AuthService";

export default function Test() {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"), {
        name,
      });
      alert("Saved: " + docRef.id);
      setName(""); // Clear input after save
    } catch (err) {
      alert(err.message);
    }
  };

  const user = useCurrentUser();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
          Hello  {user&&user.displayName || "User"}
          </h2>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Add Doc
          </button>
        </div>
      </div>
    </>
  );
}
