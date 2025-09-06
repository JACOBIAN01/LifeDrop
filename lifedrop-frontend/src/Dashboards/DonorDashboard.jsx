import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MatchedBloodRequest } from "../components/MatchedBloodRequest";
import { User, Heart, Home, Users, Activity } from "lucide-react";
import AllBloodRequest from "../components/AllBloodRequest";
import MyBloodRequest from "../components/MyBloodRequest";

export default function DonorDashboard({ donorData }) {
  const navigate = useNavigate();
  const [AllReq, SetAllReq] = useState(false);
  const [MyReq, SetMyReq] = useState(false);
  const [MatchReq, SetMatchReq] = useState(false);


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
            <User size={36} />
          </div>
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {donorData?.name || "Anonymous"} <Heart size={20} />
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
            <p className="text-sm flex items-center gap-1">
              <Activity size={16} /> Donations
            </p>
          </div>
        </div>
      </div>

      {/* Personal Details Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-red-700 font-semibold text-lg mb-4 flex items-center gap-2">
          <Users size={18} /> Personal Details
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

      {/* 🔹 All Requests Card */}
      <div className="bg-white border border-rose-200 rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <Users size={20} className="text-rose-500" />
          <h3 className="text-2xl font-bold text-rose-600">All Requests</h3>
          <button
            onClick={() => SetAllReq(!AllReq)}
            className="ml-auto bg-rose-100 text-rose-600 px-4 py-2 rounded-xl font-semibold hover:bg-rose-200 transition"
          >
            {AllReq ? "Hide" : "View"}
          </button>
        </div>
        {AllReq && <AllBloodRequest DonorData={donorData} />}
      </div>

      {/* 🔹 My Requests Card */}
      <div className="bg-white border border-rose-200 rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <User size={20} className="text-rose-500" />
          <h3 className="text-2xl font-bold text-rose-600">My Requests</h3>
          <button
            onClick={() => SetMyReq(!MyReq)}
            className="ml-auto bg-rose-100 text-rose-600 px-4 py-2 rounded-xl font-semibold hover:bg-rose-200 transition"
          >
            {MyReq ? "Hide" : "View"}
          </button>
        </div>
        {MyReq && <MyBloodRequest />}
      </div>

      {/* 🔹 Matched Requests Card */}
      <div className="bg-white border border-rose-200 rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <Users size={20} className="text-rose-500" />
          <h3 className="text-2xl font-bold text-rose-600">Matched Requests</h3>
          <button
            onClick={() => SetMatchReq(!MatchReq)}
            className="ml-auto bg-rose-100 text-rose-600 px-4 py-2 rounded-xl font-semibold hover:bg-rose-200 transition"
          >
            {MatchReq ? "Hide" : "View"}
          </button>
        </div>
        {MatchReq && <MatchedBloodRequest DonorData={donorData} />}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
        <button
          onClick={() => navigate("/request")}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Heart size={20} /> Ask for Help
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Home size={20} /> Home
        </button>
      </div>
    </div>
  );
}
