import { useNavigate } from "react-router-dom";
import {useRequestStatus} from "./ManageRequest";


export default function DonorDashboard({ donorData }) {
  const navigate = useNavigate();
  const RequestData = useRequestStatus();

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
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-red-700 font-semibold text-lg mb-4">
          Your Blood Request
        </h3>

        {!RequestData && (
          <p className="text-gray-600">No active blood request.</p>
        )}

        {RequestData && (
          <div className="border border-red-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
            <div>
              <p className="font-bold text-red-700">
                Blood Group: {RequestData.bloodGroupNeeded || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">
                City: {RequestData.city || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">
                Urgency: {RequestData.patientCondition || "N/A"}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                {RequestData.responses?.length || 0} Responses
              </span>
            </div>
          </div>
        )}
      </div>

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
