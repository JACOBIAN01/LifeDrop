import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard({ user }) {
  const [donorData, setDonorData] = useState(null);

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const donorRef = doc(db, "donors", user.uid);
        const donorSnap = await getDoc(donorRef);

        if (donorSnap.exists()) {
          setDonorData(donorSnap.data()); // save donor’s info
        } else {
          console.log("No donor data found");
        }
      } catch (err) {
        console.error("Error fetching donor data:", err);
      }
    };

    if (user?.uid) {
      fetchDonorData();
    }
  }, [user]);

  return (
    <div>
      <h1>Welcome to the Dashboard {user.displayName || "User"}</h1>

      {donorData ? (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold">Your Donor Info</h2>
          <p>
            <strong>Blood Group:</strong> {donorData.bloodGroup}
          </p>
          <p>
            <strong>City:</strong> {donorData.city}
          </p>
          <p>
            <strong>Phone:</strong> {donorData.phone}
          </p>
          {/* you can render all fields you saved */}
        </div>
      ) : (
        <p>Loading donor details...</p>
      )}
    </div>
  );
}
