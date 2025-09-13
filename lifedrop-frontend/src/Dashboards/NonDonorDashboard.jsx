import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Heart, Home, PlusCircle } from "lucide-react";
import MyBloodRequest from "../components/MyBloodRequest";
import Quotes from "../assets/Quotes";

export default function NonDonorDashboard({ user }) {
  const navigate = useNavigate();
  const [showMyRequest, setShowMyRequest] = useState(true);
  const handleShowMyRequest = () => setShowMyRequest(!showMyRequest);

  return (
    <div className="mt-5 max-w-7xl mx-auto px-4 space-y-4">
      <Quotes />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="flex flex-col space-y-5">
          <ProfileCard user={user} />
          <ActionButtons navigate={navigate} />
          <RequestButtons handleShowMyRequest={handleShowMyRequest} />
        </div>

        {/* Right Column */}
        <div className="col-span-1 md:col-span-2 overflow-y-auto max-h-[80vh]">
          <MyRequestsCard />
        </div>
      </div>
    </div>
  );
}

/* 🔹 Profile Card */
function ProfileCard({ user }) {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl shadow-xl p-6 flex flex-col items-center gap-4">
      <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold text-red-600">
        <User size={36} />
      </div>
      <h2 className="text-2xl font-bold">{user.displayName}</h2>
      <p className="text-sm text-white/80 text-center">
        Non-donor user. You can request help or become a hero by donating blood.
      </p>
    </div>
  );
}

/* 🔹 Action Buttons */
function ActionButtons({ navigate }) {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => navigate("/request")}
        className="flex items-center gap-2 justify-center bg-red-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg hover:bg-red-700 transition-all duration-300"
      >
        <PlusCircle size={20} /> Ask for Help
      </button>

      <button
        onClick={() => navigate("/donor")}
        className="flex items-center gap-2 justify-center bg-gray-100 text-red-600 border border-red-500 px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300"
      >
        <Heart size={20} /> Be a Hero
      </button>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300"
      >
        <Home size={20} /> Home
      </button>
    </div>
  );
}


/* 🔹 Request Toggle Buttons */
function RequestButtons({ handleShowMyRequest }) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <button
        onClick={handleShowMyRequest}
        className="flex items-center gap-2 px-6 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold shadow hover:bg-red-600 hover:shadow-lg transition-all duration-300"
      >
        <Heart size={18} /> My Request
      </button>
    </div>
  );
}


/* 🔹 My Requests Card */
function MyRequestsCard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white border border-rose-200 rounded-3xl shadow-xl p-8 mb-6">
      <div className="flex items-center gap-4 mb-6">
        <User size={20} className="text-rose-500" />
        <h3 className="text-2xl font-bold text-rose-600">My Requests</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto bg-rose-100 text-rose-600 px-4 py-2 rounded-xl font-semibold hover:bg-rose-200 transition"
        >
          {isOpen ? "Hide" : "View"}
        </button>
      </div>
      {isOpen && <MyBloodRequest />}
    </div>
  );
}
