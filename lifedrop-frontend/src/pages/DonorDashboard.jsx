import { useNavigate } from "react-router-dom";
import { useRequestStatus } from "./ManageRequest";
import { useAllRequests } from "./ManageRequest";
import { useState } from "react";
import { getDoc } from "firebase/firestore";
import { useCurrentUser } from "../services/AuthService";
import { doc, updateDoc} from "firebase/firestore";
import {db} from "../services/firebase"

export default function DonorDashboard({ donorData }) {
  const navigate = useNavigate();
  const [AllReq, SetAllReq] = useState(false);
  const [MyReq, SetMyReq] = useState(false);

  const handleAllReq = () => {
    SetMyReq(false);
    SetAllReq(true);
  };
  const handleMyReq = () => {
    SetMyReq(true);
    SetAllReq(false);
  };


  // Motivational quotes
  const quotes = [
    "A drop of blood can save a life. Be someone's hero today.",
    "Your blood donation is a gift straight from the heart.",
    "Donating blood is the simplest way to give back to humanity.",
    "Every pint you donate can save up to three lives.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4 space-y-8">
      {/* Motivational Quote Card */}
      <div className="bg-red-50 border border-red-200 rounded-2xl shadow-sm p-4 text-center">
        <p className="italic text-red-700 text-lg font-medium">
          “{randomQuote}”
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold text-red-600">
            {donorData?.name?.[0] || "?"}
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              {donorData?.name || "Anonymous"}
            </h2>
            <p className="text-lg opacity-90">
              {donorData?.email || "No Email"}
            </p>
            <p className="mt-2 font-semibold">
              Blood Group: {donorData?.bloodType || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="bg-white text-red-600 rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-xl transition">
            <p className="text-2xl font-bold">
              {donorData?.donationCount ?? 0}
            </p>
            <p className="text-sm">Donations</p>
          </div>
        </div>
      </div>

      {/* Personal Details Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-red-700 font-semibold text-lg mb-4">
          Personal Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-medium text-red-800">City:</span>{" "}
            {donorData?.city || "N/A"}
          </p>
          <p>
            <span className="font-medium text-red-800">State:</span>{" "}
            {donorData?.state || "N/A"}
          </p>

          <p>
            <span className="font-medium text-red-800">Phone:</span>{" "}
            {donorData?.phone || "N/A"}
          </p>
          <p>
            <span className="font-medium text-red-800">Email:</span>{" "}
            {donorData?.email || "N/A"}
          </p>
          <p>
            <span className="font-medium text-red-800">Gender:</span>{" "}
            {donorData?.gender || "N/A"}
          </p>
          <p>
            <span className="font-medium text-red-800">Pincode:</span>{" "}
            {donorData?.pincode || "N/A"}
          </p>
          <p className="md:col-span-2">
            <span className="font-medium text-red-800">Address:</span>{" "}
            {donorData?.address || "N/A"}
          </p>
        </div>
      </div>


      {/* 🔹 Blood Request Card */}
      <div className="flex items-center gap-5">
        <button
        onClick={handleAllReq}
         className="px-4 py-2 rounded-lg bg-rose-400 text-white font-semibold hover:bg-rose-500 transition">
          All Request
        </button>
        <button
        onClick={handleMyReq}
         className="px-4 py-2 rounded-lg bg-rose-400 text-white font-semibold hover:bg-rose-500 transition">
          My Request
        </button>
      </div>
      {AllReq&&<AllBloodRequest/>}
      {MyReq&& <MyBloodRequest/>}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
        <button
          onClick={() => navigate("/request")}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Ask for Help
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Home
        </button>
      </div>
    </div>
  );
}


function MyBloodRequest() {
  const { requestData, loading, error } = useRequestStatus();
  const [showResponse ,setShowresponse] = useState(false);

  const handleShowResponse = ()=>{
    setShowresponse(!showResponse)
  }

  const AllResponse = ()=>{
    return (
      <>
        {requestData.map((req) => (
          <div
            key={req.id}
            className="border border-red-200 rounded-xl p-4 mb-4 shadow-sm"
          >
            <p className="font-bold text-red-700">
              Blood Group: {req.bloodGroupNeeded || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">City: {req.city || "N/A"}</p>
            <p className="text-gray-600 text-sm">
              Urgency: {req.patientCondition || "N/A"}
            </p>

            <div className="mt-3">
              <h4 className="font-semibold text-red-600 text-sm mb-2">
                Responses ({req.responses?.length || 0})
              </h4>

              {req.responses?.length > 0 ? (
                <ul className="space-y-2">
                  {req.responses.map((resp, idx) => (
                    <li
                      key={idx}
                      className="bg-red-50 border border-red-200 rounded-lg p-2 text-sm"
                    >
                      <p className="font-medium text-red-700">
                        {resp.name || "Anonymous"}
                      </p>
                      <p className="text-gray-600">{resp.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No responses yet.</p>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }

  if (loading) {
    return <p className="text-gray-500">Loading requests...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading requests</p>;
  }

  if (!requestData || requestData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-red-700 font-semibold text-lg mb-4">
          Your Blood Request
        </h3>
        <p className="text-gray-600">No active requests right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-red-700 font-semibold text-lg mb-4 mt-2 ">
        Your Blood Requests
      </h3>
      <button
        onClick={handleShowResponse}
        className="px-3 py-1 rounded-lg bg-rose-400 text-white font-semibold text-sm hover:bg-rose-500 transition mb-3"
      >
        {showResponse ? "Hide Response" : "Show Response"}
      </button>
      {showResponse && <AllResponse />}
    </div>
  );
}


function AllBloodRequest() {
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
        },
      ],
    });

    alert("Your interest has been recorded!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-red-700 font-semibold text-lg mb-4">
        All Blood Requests
      </h3>

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
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                {req.responses?.length || 0} Responses
              </span>

              {alreadyResponded ? (
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
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

