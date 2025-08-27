import { useNavigate } from "react-router-dom";
// Lucide Icons
// Lucide Icons
import { User, Heart, Home, Users} from "lucide-react";
import { PlusCircle} from "lucide-react";
import { useState } from "react";
import { AllBloodRequest } from "./DonorDashboard";
import { MyBloodRequest } from "./DonorDashboard";




export default function NonDonorDashboard() {
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
  

  return (
    <div className="mt-10 max-w-4xl mx-auto px-4 space-y-8">
      {/* Info / Welcome Card */}
      <div className="bg-white border border-green-200 rounded-2xl shadow-md p-8 flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold text-green-600 flex items-center gap-2">
          <Heart className="w-6 h-6" /> Welcome
        </h2>
        <p className="text-gray-700 text-center">
          You can help save lives by donating blood or requesting help for
          someone in need.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/request")}
            className="bg-white hover:bg-red-50 text-red-600 border border-red-500 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <PlusCircle className="w-5 h-5" /> Ask for Help
          </button>

          <button
            onClick={() => navigate("/donor")}
            className="bg-red-500 hover:bg-red-600 text-white border border-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <Heart className="w-5 h-5" /> Be a Hero
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <Home className="w-5 h-5" /> Home
          </button>
        </div>
        
        {/* 🔹 Blood Request Card */}
        <div className="flex items-center gap-5">
          <button
            onClick={handleAllReq}
            className="px-4 py-2 rounded-lg bg-rose-400 text-white font-semibold hover:bg-rose-500 transition flex items-center gap-2"
          >
            <Users size={16} /> All Request
          </button>
          <button
            onClick={handleMyReq}
            className="px-4 py-2 rounded-lg bg-rose-400 text-white font-semibold hover:bg-rose-500 transition flex items-center gap-2"
          >
            <User size={16} /> My Request
          </button>
        </div>
        {AllReq && <AllBloodRequest />}
        {MyReq && <MyBloodRequest />}
      </div>
    </div>
  );
}
