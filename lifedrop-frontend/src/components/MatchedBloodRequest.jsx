import { useAllRequests } from "../Hooks/ManageRequest";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useCurrentUser } from "../services/AuthService";
import { db } from "../services/firebase";
import { useEffect, useRef } from "react";
import {SendWhatsappMessage} from "../services/api"


export function MatchedBloodRequest({ DonorData }) {
  const { requests, loading, error } = useAllRequests();
  const user = useCurrentUser();

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

  //Blood Request Whatapp Alert Hook
  // Keep track of requests already notified
  const notifiedRequests = useRef(new Set());

  const matchedRequests = requests.filter(
    (req) => req.bloodGroupNeeded === DonorData?.bloodType
  );

  // 🔔 Notify only for newly added requests
  useEffect(() => {
    matchedRequests.forEach((req) => {
      if (!notifiedRequests.current.has(req.id)) {
        // mark as notified
        notifiedRequests.current.add(req.id);

        // send WhatsApp
        if (DonorData?.phone) {
          SendWhatsappMessage(
            DonorData.phone,
            `Urgent Blood Request A patient in *${
              req.city || "near you"
            }* needs *${req.bloodGroupNeeded}* blood.
             💉 Your donation can save a life today! 
              Please confirm if you’re available. ❤️`
          );
          console.log("WhatsApp alert sent for request:", req.id);
        }
      }
    });
  }, [matchedRequests, DonorData?.phone]);


  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition">
      {loading && <p className="text-gray-500">Loading requests...</p>}
      {error && <p className="text-red-500">Error loading requests</p>}
      {!loading && matchedRequests.length === 0 && (
        <p className="text-gray-600">No active requests right now.</p>
      )}

      {matchedRequests.map((req) => {
        const alreadyResponded = req.responses?.some(
          (resp) => resp.donorId === user?.uid
        );

        return (
          <div
            key={req.id}
            className="border border-red-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm mb-3"
          >
            <div>
              <p className="font-bold text-red-700">
                Blood Group: {req.bloodGroupNeeded || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">City: {req.city || "N/A"}</p>
              <p className="text-gray-600 text-sm">
                Urgency: {req.patientCondition || "N/A"}
              </p>
            </div>

            <div className="mt-2 md:mt-0 flex items-center gap-3">
              {req.status === "Pending" && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  {req.responses?.length || 0} Responses
                </span>
              )}

              {req.status === "Pending" ? (
                alreadyResponded ? (
                  <button
                    disabled
                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    Already Interested
                  </button>
                ) : (
                  <button
                    onClick={() => handleInterest(req.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                  >
                    I’m Interested
                  </button>
                )
              ) : (
                <p className="inline-block text-white px-4 py-2 text-sm font-semibold mb-3 rounded-2xl bg-green-500">
                  Already Resolved
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
