import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../services/AuthService";
import {useDonorStatus} from "./BecomeDonorPage";


export default function Dashboard() {
  const user = useCurrentUser();
  const { isDonor, donorData } = useDonorStatus();

  if (isDonor === undefined) return <Loading message="Checking Dashboard..." />;
  if (isDonor && !donorData) return <Loading message="Loading Donor Data..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-red-800 text-center">
          Welcome to the Dashboard {user.displayName || "User"}
        </h1>

        {isDonor ? (
          <DonorDashboard donorData={donorData} />
        ) : (
          <NonDonorDashboard />
        )}
      </div>
    </div>
  );
}

function DonorDashboard({ donorData }) {
  const navigate = useNavigate();

  return (
    <div className="mt-8 bg-white shadow-md rounded-2xl p-6 border border-red-100 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-red-700 mb-4">
        Your Donor Info
      </h2>
      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-medium text-red-800">Blood Group:</span>{" "}
          {donorData.bloodType}
        </p>
        <p>
          <span className="font-medium text-red-800">City:</span>{" "}
          {donorData.city}
        </p>
        <p>
          <span className="font-medium text-red-800">Phone:</span>{" "}
          {donorData.phone}
        </p>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/request")}
          className="bg-white hover:bg-red-50 text-red-600 border border-red-500 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Ask for Help
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-white hover:bg-red-50 text-red-600 border border-red-500 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Home
        </button>
      </div>
    </div>
  );
}

function NonDonorDashboard() {
  const navigate = useNavigate();
  return (
    <div className="mt-8 bg-white border border-green-200 rounded-2xl shadow-md p-8 flex flex-col items-center">
      <p className="text-center mt-2 text-lg font-semibold text-green-700 bg-green-100 border border-green-300 px-6 py-3 rounded-xl shadow">
        Become a Donor
      </p>
      <button
        onClick={() => navigate("/donor")}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white border border-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        Be a Hero
      </button>
    </div>
  );
}


function Loading({ message }) {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <h1 className="text-xl font-semibold text-red-700 animate-pulse">
        {message}
      </h1>
    </div>
  );
}
