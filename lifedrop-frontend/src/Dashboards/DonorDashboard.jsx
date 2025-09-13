import { useNavigate} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { MatchedBloodRequest } from "../components/MatchedBloodRequest";
import { User, Heart, Home, Users, Activity,Globe } from "lucide-react";
import AllBloodRequest from "../components/AllBloodRequest";
import MyBloodRequest from "../components/MyBloodRequest";
import JoinWhatsAppButton from "../components/Join_Community";



export default function DonorDashboard({ donorData}) {
  const [showAllRequest, setShowAllRequest] = useState(false);
  const [showMyRequest, setShowMyRequest] = useState(true);
  const [showMatchedRequest, setShowMatchedRequest] = useState(false);

  const handleShowAllRequest = () => {
    setShowAllRequest(!showAllRequest);
    setShowMyRequest(false);
    setShowMatchedRequest(false);
  };

  const handleShowMyRequest = () => {
    setShowAllRequest(false);
    setShowMyRequest(!showMyRequest);
    setShowMatchedRequest(false);
  };

  const handleShowMatchedRequest = () => {
    setShowAllRequest(false);
    setShowMyRequest(false);
    setShowMatchedRequest(!showMatchedRequest);
  };

  return (
    <div className="mt-5 max-w-7xl mx-auto px-4 space-y-2">
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col space-y-3">
          <ProfileCard donorData={donorData} />
          <PersonalDetailsCard donorData={donorData} />
          <RequestButtons
            handleShowMyRequest={handleShowMyRequest}
            handleShowAllRequest={handleShowAllRequest}
            handleShowMatchedRequest={handleShowMatchedRequest}
          />
          <ActionButtons />
        </div>
        <div className="row-span-2 col-span-2 overflow-y-auto max-h-[85vh]">
          {showMyRequest && <MyRequestsCard />}
          {showMatchedRequest && <MatchedRequestsCard donorData={donorData} />}
          {showAllRequest && <AllRequestsCard donorData={donorData} />}
        </div>
      </div>
    </div>
  );
}


/* 🔹 Profile Card */
function ProfileCard({ donorData }) {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold text-red-600">
          <User size={36} />
        </div>
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            {donorData?.name || "Anonymous"} <Heart size={20} />
          </h2>
          <p className="mt-2 font-semibold">
            Blood Group: {donorData?.bloodType || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Personal Details Card */
function PersonalDetailsCard({ donorData }) {
  return (
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
          <span className="font-medium text-red-800">Gender:</span>{" "}
          {donorData?.gender || "N/A"}
        </p>
        <p>
          <span className="font-medium text-red-800">Email:</span>{" "}
          {donorData?.email || "N/A"}
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
  );
}

/* 🔹 All Requests Card */
function AllRequestsCard({ donorData }) {
  const [AllReq, SetAllReq] = useState(true);
  return (
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
  );
}

/* 🔹 My Requests Card */
function MyRequestsCard() {
  const [MyReq, SetMyReq] = useState(true);

  return (
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
  );
}

/* 🔹 Matched Requests Card */
function MatchedRequestsCard({ donorData }) {
  const [MatchReq, SetMatchReq] = useState(true);
  return (
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
  );
}

/* 🔹 Action Buttons */
function ActionButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
      {/* Ask for Help */}
      <button
        onClick={() => navigate("/request")}
        className="flex items-center gap-2 px-5 py-2 rounded-lg
                   bg-gradient-to-r from-red-500 to-red-600
                   text-white text-lg font-semibold shadow-md
                   hover:shadow-lg hover:scale-105 active:scale-95
                   transition-all duration-300"
      >
        <Heart size={20} />
        Ask for Help
      </button>

      {/* Home */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-5 py-2 rounded-lg
                   bg-gradient-to-r from-gray-100 to-gray-200
                   text-gray-700 text-lg font-semibold shadow-md
                   hover:shadow-lg hover:scale-105 active:scale-95
                   transition-all duration-300"
      >
        <Home size={20} />
        Home
      </button>

      {/* WhatsApp Join */}
      <JoinWhatsAppButton />
    </div>
  );
}

function Wish({ user }) {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-red-800 text-center">
        Welcome to the Dashboard {user ? user.displayName || "User" : "User"}
      </h1>
    </>
  );
}



export function RequestButtons({
  handleShowMyRequest,
  handleShowAllRequest,
  handleShowMatchedRequest,
}) {
  const [selected, setSelected] = useState("my"); // default selected button
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);

  const buttons = [
    {
      key: "my",
      label: "My Request",
      icon: <Heart size={18} />,
      onClick: handleShowMyRequest,
    },
    {
      key: "matched",
      label: "Matched Request",
      icon: <Users size={18} />,
      onClick: handleShowMatchedRequest,
    },
    {
      key: "all",
      label: "All Request",
      icon: <Globe size={18} />,
      onClick: handleShowAllRequest,
    },
  ];

  // Update indicator position and width when selected changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selectedButton = container.querySelector(`[data-key="${selected}"]`);
    if (selectedButton) {
      setIndicatorStyle({
        width: selectedButton.offsetWidth,
        left: selectedButton.offsetLeft,
      });
    }
  }, [selected]);

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-1">
      <div
        ref={containerRef}
        className="relative flex gap-4 bg-white p-2 rounded-2xl shadow-md"
      >
        {/* Buttons */}
        {buttons.map((btn) => (
          <button
            key={btn.key}
            data-key={btn.key}
            onClick={() => {
              setSelected(btn.key);
              btn.onClick();
            }}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold
              transition-all duration-300 z-10
              ${
                selected === btn.key
                  ? "text-white bg-red-500 text-center"
                  : "text-gray-700 hover:text-gray-800"
              }
            `}
          >
            {btn.icon} {btn.label}
          </button>
        ))}

        {/* Sliding Indicator */}
        <span
          className="absolute bottom-0 h-1 bg-red-500 rounded-full transition-all duration-300"
          style={{
            width: indicatorStyle.width || 0,
            left: indicatorStyle.left || 0,
          }}
        />
      </div>
    </div>
  );
}