import { useAllRequests } from "../Hooks/ManageRequest";
import {getDoc, doc, updateDoc } from "firebase/firestore";
import { useCurrentUser } from "../services/AuthService";
import { db } from "../services/firebase";
import useDonorStatus from "../Hooks/DonorStatus"

export default function AllBloodRequest() {
  const { requests, loading, error } = useAllRequests();
  const { user, __ } = useCurrentUser();
  const { _ , DonorData } = useDonorStatus();


  const handleInterest = async (reqId) => {
    const requestRef = doc(db, "requests", reqId);

    // Get current request data
    const requestSnap = await getDoc(requestRef);
    if (!requestSnap.exists()) return alert("Request not found!");
    const requestData = requestSnap.data();
    const currentResponses = requestData.responses || [];

    // Check if donor already exists
    const alreadyResponded = currentResponses.some(
      (resp) => resp.donorId === user.uid
    );
    if (alreadyResponded) {
      return alert("You already showed interest!");
    }

    // Add donor response
    await updateDoc(requestRef, {
      responses: [
        ...currentResponses,
        {
          donorId: user?.uid,
          name: user?.displayName || "Anonymous",
          email: user?.email,
          timestamp: new Date().toISOString(),
          bloodType: DonorData?.bloodType || "N/A",
          city: DonorData?.city || "N/A",
          lastDonation: DonorData?.lastDonation || "N/A",
          phone: DonorData?.phone || "N/A",
          gender: DonorData?.gender || "N/A",
        },
      ],
    });

    alert("Your interest has been recorded!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition">
      {/* <h3 className="text-red-700 font-semibold text-lg mb-4">
        All Blood Requests
      </h3> */}

      {loading && <p className="text-gray-500">Loading requests...</p>}
      {error && <p className="text-red-500">Error loading requests</p>}
      {!loading && requests.length === 0 && (
        <p className="text-gray-600">No active requests right now.</p>
      )}

      {requests.map((req) => {
        const alreadyResponded = req.responses?.some(
          (resp) => resp.donorId === user?.uid
        );

        return (
          <div
            key={req.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md mb-6 p-5"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                  {req.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {req.name || "Anonymous"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {req.city || "N/A"}, {req.state || "N/A"}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  req.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {req.status === "Pending" ? "⏳ Pending" : "✅ Resolved"}
              </span>
            </div>

            {/* Post Content */}
            <div className="space-y-2 text-gray-700 text-sm">
              <p className="text-lg font-bold text-red-700">
                🩸 Blood Group Needed: {req.bloodGroupNeeded || "N/A"}
              </p>
              <p>
                🏥{" "}
                <span className="font-medium">
                  {req.hospitalName || "Unknown Hospital"}
                </span>
              </p>
              <p>
                📍 {req.hospitalAddress || "No Address"}, {req.city || "N/A"},{" "}
                {req.state || "N/A"}, {req.country || "N/A"}
              </p>
              <p>
                ⚡ Urgency:{" "}
                <span className="font-medium">
                  {req.patientCondition || "N/A"}
                </span>
              </p>
              <p>
                📞 Contact:{" "}
                <span className="font-medium">{req.phoneNumber || "N/A"}</span>
              </p>
            </div>

            {/* Responses */}
            {req.status === "Pending" && (
              <p className="mt-3 text-red-500 text-sm font-medium">
                {req.responses?.length || 0} donors have shown interest
              </p>
            )}

            {/* Post Actions */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              {req.status === "Pending" ? (
                alreadyResponded ? (
                  <button
                    disabled
                    className="w-full sm:w-auto bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    ✅ Already Interested
                  </button>
                ) : (
                  <button
                    onClick={() => handleInterest(req.id)}
                    className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                  >
                    ❤️ I’m Interested
                  </button>
                )
              ) : (
                <p className="w-full sm:w-auto text-center text-white px-4 py-2 text-sm font-semibold rounded-lg bg-green-500">
                  🎉 Request Resolved
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
