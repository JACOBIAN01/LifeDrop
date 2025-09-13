/* eslint-disable no-irregular-whitespace */
import { useNavigate } from "react-router-dom";
import { Building2, Heart, Home, ShieldCheck } from "lucide-react";
import { useState } from "react";

import AllBloodRequest from "../components/AllBloodRequest";
import MyBloodRequest from "../components/MyBloodRequest";

export default function OrgDashboard({ orgData }) {
  const [showAllRequest, setShowAllRequest] = useState(false);
  const [showMyRequest, setShowMyRequest] = useState(true);

  const handleShowAllReq = () => {
    setShowAllRequest(true);
    setShowMyRequest(false);
  };

  const handleShowMyReq = () => {
    setShowAllRequest(false);
    setShowMyRequest(true);
  };

  return (
    <div className="bg-rose-50 min-h-screen py-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="flex flex-col space-y-2">
            <ProfileCard orgData={orgData} />
            <OrgDetails orgData={orgData} />
            <ActionButtons
              showAllRequest={showAllRequest}
              showMyRequest={showMyRequest}
              handleShowAllReq={handleShowAllReq}
              handleShowMyReq={handleShowMyReq}
            />
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-5 overflow-y-auto max-h-[90vh]">
            {showMyRequest && <MyBloodRequest />}
            {showAllRequest && <AllBloodRequest donorData={null} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ orgData }) {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white rounded-3xl shadow-xl p-8 flex flex-col items-center md:items-start gap-6">
      <div className="flex items-center gap-6">
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center">
          <Building2 size={40} className="text-red-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            {orgData?.hospitalName || "Organization Name"}
            {orgData?.verified && (
              <ShieldCheck
                size={24}
                className="text-green-300"
                title="Verified"
              />
            )}
          </h2>
          <p className="text-lg opacity-90">{orgData?.email || "No Email"}</p>
          <p className="mt-2 font-semibold">
            Type: {orgData?.hospitalType || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

function OrgDetails({ orgData }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h3 className="text-red-700 font-semibold text-xl mb-6 flex items-center gap-3">
        <Building2 size={20} />
        Organization Details
      </h3>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
        <p>
          <span className="font-medium text-red-800">Contact Person:</span>{" "}
          {orgData?.contactPerson || "N/A"}
        </p>
        <p>
          <span className="font-medium text-red-800">Phone:</span>{" "}
          {orgData?.phone || "N/A"}
        </p>
        <p>
          <span className="font-medium text-red-800">City:</span>{" "}
          {orgData?.city || "N/A"}
        </p>
        <p>
          <span className="font-medium text-red-800">State:</span>{" "}
          {orgData?.state || "N/A"}
        </p>
        <p className="md:col-span-2">
          <span className="font-medium text-red-800">Address:</span>{" "}
          {orgData?.address || "N/A"}
        </p>
      </div>
    </div>
  );
}


function ActionButtons({
  showAllRequest,
  showMyRequest,
  handleShowAllReq,
  handleShowMyReq,
}) {
  const navigate = useNavigate();

  const buttonStyle = "px-5 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2";

  const redButton = "bg-red-600 hover:bg-red-700 text-white";
  const grayButton = "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <div className="flex flex-col gap-2 pt-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleShowAllReq}
          className={`${
            showAllRequest ? redButton : grayButton
          } ${buttonStyle} flex-1`}
        >
          All Requests
        </button>

        <button
          onClick={handleShowMyReq}
          className={`${
            showMyRequest ? redButton : grayButton
          } ${buttonStyle} flex-1`}
        >
          My Requests
        </button>
      </div>

      <button
        onClick={() => navigate("/request")}
        className={`${redButton} ${buttonStyle}`}
      >
        <Heart size={20} /> Create a Request
      </button>

      <button
        onClick={() => navigate("/")}
        className={`${grayButton} ${buttonStyle}`}
      >
        <Home size={20} /> Home
      </button>
    </div>
  );
}
