import { useRequest} from "../Hooks/ManageRequest";
import { useState } from "react";

export default function MyBloodRequest() {
  const { requestData, loading, error } = useRequest();
  const [showResponse, setShowResponse] = useState(true);

  const handleShowResponse = () => setShowResponse(!showResponse);

  const AllResponse = () => {
    return (
      <>
        {requestData.map((req) => (
          <div
            key={req.id}
            className="border border-red-200 rounded-2xl p-6 mb-6 shadow-sm hover:shadow-md transition"
          >
            <p className="font-bold text-red-700 text-lg mb-1">
              Blood Group Needed: {req.bloodGroupNeeded || "N/A"}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              City: {req.city || "N/A"}
            </p>
            <p className="text-gray-600 text-sm mb-3">
              Urgency: {req.patientCondition || "N/A"}
            </p>

            <h4 className="font-semibold text-red-600 text-sm mb-3">
              Responses ({req.responses?.length || 0})
            </h4>

            {req.responses?.length > 0 ? (
              <div className="space-y-4">
                {req.responses.map((resp, idx) => (
                  <div
                    key={idx}
                    className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-red-700 text-md">
                        {resp.name || "Anonymous"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(resp.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-gray-700 text-sm">
                      <p>
                        <span className="font-medium text-red-800">Email:</span>{" "}
                        {resp.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">
                          Blood Group:
                        </span>{" "}
                        {resp.bloodType || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">City:</span>{" "}
                        {resp.city || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">
                          Last Donation:
                        </span>{" "}
                        {resp.lastDonation
                          ? new Date(resp.lastDonation).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">Phone:</span>{" "}
                        {resp.phone || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">
                          Gender:
                        </span>{" "}
                        {resp.gender || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No responses yet.</p>
            )}
          </div>
        ))}
      </>
    );
  };

  if (loading) return <p className="text-gray-500">Loading requests...</p>;
  if (error) return <p className="text-red-500">Error loading requests</p>;
  if (!requestData || requestData.length === 0)
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-red-700 font-semibold text-lg mb-4">
          Your Blood Requests
        </h3>
        <p className="text-gray-600">No active requests right now.</p>
      </div>
    );

  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-red-700 font-semibold text-lg mb-4 mt-2">
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