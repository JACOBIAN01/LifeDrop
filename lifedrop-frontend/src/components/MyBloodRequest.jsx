import { useRequest } from "../Hooks/ManageRequest";
import { UpdateRequestStatus } from "../services/api";
import { db } from "../services/firebase";
import LoadingText from "./Loading";
import { doc, deleteDoc } from "firebase/firestore";
import DeleteConfirmation from "./DeleteConfirmation";
import { useState } from "react";

export default function MyBloodRequest() {
  const { requestData, loading, error } = useRequest();

  if (loading) return <LoadingText  text="Loading Request"/>;
  if (error) return <p className="text-red-500">Error loading requests</p>;
  if (!requestData || requestData.length === 0) return <NoActiveResponse />;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-red-700 font-semibold text-lg mb-4 mt-2">
        Your Blood Requests
      </h3>
      {<MyRequestResponse requestData={requestData} />}
    </div>
  );
}

function MyRequestResponse({ requestData }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleResolve = async (id, status) => {
    const newStatus = status === "Pending" ? "Resolved" : "Pending";
    await UpdateRequestStatus(id, newStatus);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setShowConfirm(false);
      await deleteDoc(doc(db, "requests", selectedId));
      console.log(`Document ${selectedId} deleted successfully`);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {requestData.map((req) => {
        const buttonText =
          req.status === "Resolved" ? "Mark as Pending" : "Mark as Resolved";

        return (
          <div
            key={req.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md mb-6 p-6 transition hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                  {req.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {req.name || "Anonymous"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {req.city || "N/A"} <span className="mx-1">•</span>
                    {req.state || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleResolve(req.id, req.status)}
                  className="px-3 py-1 rounded-lg bg-yellow-600 text-white font-semibold text-sm hover:bg-yellow-500 transition"
                >
                  {buttonText}
                </button>
                <button
                  onClick={() => handleDelete(req.id)}
                  className="px-3 py-1 rounded-lg bg-rose-600 text-white font-semibold text-sm hover:bg-rose-500 transition"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Request Info */}
            <div className="space-y-2 text-gray-700 text-sm mb-3">
              <p className="text-lg font-bold text-red-700">
                🩸 Blood Group Needed: {req.bloodGroupNeeded || "N/A"}
              </p>
              <p>⚡ Urgency: {req.patientCondition || "N/A"}</p>
              <p>📍 City: {req.city || "N/A"}</p>
            </div>

            {/* Status */}
            <p
              className={`inline-block text-white px-4 py-2 text-sm font-semibold rounded-2xl mb-4 ${
                req.status === "Pending"
                  ? "bg-yellow-500"
                  : req.status === "Resolved"
                  ? "bg-green-500"
                  : "bg-gray-400 shadow-gray-300"
              }`}
            >
              Status: {req.status || "N/A"}
            </p>

            {/* Responses Section */}
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
                    {/* Response Header */}
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-red-700 text-md">
                        {resp.name || "Anonymous"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {resp.timestamp
                          ? new Date(resp.timestamp).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>

                    {/* Response Details */}
                    <div className="grid md:grid-cols-2 gap-2 text-gray-700 text-sm">
                      <p>
                        <span className="font-medium text-red-800">
                          📧 Email:
                        </span>{" "}
                        {resp.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">
                          🩸 Blood Group:
                        </span>{" "}
                        {resp.bloodType || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">
                          📍 City:
                        </span>{" "}
                        {resp.city || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">
                          🕓 Last Donation:
                        </span>{" "}
                        {resp.lastDonation
                          ? new Date(resp.lastDonation).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">
                          📞 Phone:
                        </span>{" "}
                        {resp.phone || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-red-800">
                          🚻 Gender:
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
        );
      })}

      {/*Only one confirmation box, rendered outside the map */}
      {showConfirm && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}



export function NoActiveResponse() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-red-700 font-semibold text-lg mb-4">
        Your Blood Requests
      </h3>
      <p className="text-gray-600">No active requests right now.</p>
    </div>
  );
}
