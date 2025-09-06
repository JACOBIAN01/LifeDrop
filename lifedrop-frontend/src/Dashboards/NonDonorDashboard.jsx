import { useNavigate } from "react-router-dom";
import { User, Heart, Home, Users, PlusCircle } from "lucide-react";
import { useState } from "react";
import AllBloodRequest from "../components/AllBloodRequest";
import MyBloodRequest from "../components/MyBloodRequest";


export default function NonDonorDashboard() {
  const navigate = useNavigate();
  const [AllReq, SetAllReq] = useState(false);
  const [MyReq, SetMyReq] = useState(false);

  return (
    <div className="mt-10 max-w-5xl mx-auto px-4 space-y-10">
      {/* Info / Welcome Card */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-rose-200 rounded-3xl shadow-xl p-10 flex flex-col items-center gap-6">
        <h2 className="text-4xl font-extrabold text-rose-600 flex items-center gap-3 animate-pulse">
          <Heart className="w-7 h-7" /> Welcome
        </h2>
        <p className="text-gray-700 text-center text-lg max-w-xl">
          You can help save lives by donating blood or requesting help for
          someone in need. Every act of kindness matters.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-5 mt-8 w-full justify-center">
          <button
            onClick={() => navigate("/request")}
            className="flex items-center gap-3 justify-center bg-white text-red-600 border border-red-500 px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <PlusCircle className="w-6 h-6" /> Ask for Help
          </button>

          <button
            onClick={() => navigate("/donor")}
            className="flex items-center gap-3 justify-center bg-red-500 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <Heart className="w-6 h-6" /> Be a Hero
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            <Home className="w-6 h-6" /> Home
          </button>
        </div>
      </div>

      {/* All Requests Card */}
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
        {AllReq && <AllBloodRequest />}
      </div>

      {/* My Requests Card */}
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
    </div>
  );
}
