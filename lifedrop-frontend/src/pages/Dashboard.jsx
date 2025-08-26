import Navbar from "../components/Navbar";
import { useCurrentUser } from "../services/AuthService";
import {useDonorStatus} from "./BecomeDonorPage";
import DonorDashboard from "./DonorDashboard";
import NonDonorDashboard from "./NonDonorDashboard";


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


function Loading({ message }) {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <h1 className="text-xl font-semibold text-red-700 animate-pulse">
        {message}
      </h1>
    </div>
  );
}
