import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../services/AuthService";

export default function Dashboard() {
  const user = useCurrentUser();
  const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const donorRef = doc(db, "donors", user.uid);
        const donorSnap = await getDoc(donorRef);

        if (donorSnap.exists()) {
          setDonorData(donorSnap.data());
          setLoading(false);
        } else {
          console.log("No donor data found");
          setLoading(true);
        }
      } catch (err) {
        console.error("Error fetching donor data:", err);
      }
    };

    if (user?.uid) {
      fetchDonorData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <h1 className="text-xl font-semibold text-red-700 animate-pulse">
          Loading Data...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-red-800 text-center">
          Welcome to the Dashboard {user.displayName || "User"}
        </h1>

        {donorData ? (
          <div className="mt-8 bg-white shadow-md rounded-2xl p-6 border border-red-100 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-red-700 mb-4">
              Your Donor Info
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium text-red-800">Blood Group:</span>{" "}
                {donorData.bloodType}
              </p>
              <p>
                <span className="font-medium text-red-800">City:</span>{" "}
                {donorData.city}
              </p>
              <p>
                <span className="font-medium text-red-800">Phone:</span>{" "}
                {donorData.phone}
              </p>
            </div>
            <button
              onClick={() => navigate("/request")}
              className="mt-6 bg-white hover:bg-red-50 text-red-600 border border-red-500 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Ask for Help
            </button>
 
            <button
              onClick={() => navigate("/")}
              className="mt-6 ml-6 bg-white hover:bg-red-50 text-red-600 border border-red-500 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Home
            </button>
          </div>
        ) : (
          <p className="text-center mt-6 text-gray-600">
            Loading donor details...
          </p>
        )}
      </div>
    </div>
  );
}
