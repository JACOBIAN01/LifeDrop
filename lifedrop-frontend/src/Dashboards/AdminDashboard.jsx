import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Home, Users, UserCheck, FileText, BarChart3 } from "lucide-react";
import DonorsTable from "../components/DonorTable";
import UsersTable from "../components/UsersTable";
import RequestTable from "../components/RequestTable";
import AdminProfile from "../components/AdminProfile";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showDonors, setShowDonors] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 space-y-8 pt-20">
        {/* Profile */}
        <AdminProfile />

        {/* Dashboard Sections */}
        <div className="grid gap-6">
          {/* Donors */}
          <SectionCard
            title="Manage Donors"
            icon={<UserCheck size={18} className="text-red-500" />}
            isOpen={showDonors}
            toggle={() => setShowDonors(!showDonors)}
          >
            <DonorsTable />
          </SectionCard>

          {/* Users */}
          <SectionCard
            title="Manage Users"
            icon={<Users size={18} className="text-indigo-500" />}
            isOpen={showUsers}
            toggle={() => setShowUsers(!showUsers)}
          >
            <UsersTable />
          </SectionCard>

          {/* Requests */}
          <SectionCard
            title="Manage Requests"
            icon={<FileText size={18} className="text-emerald-500" />}
            isOpen={showRequests}
            toggle={() => setShowRequests(!showRequests)}
          >
            <RequestTable />
          </SectionCard>

          {/* Analytics */}
          <SectionCard
            title="Analytics & Reports"
            icon={<BarChart3 size={18} className="text-purple-500" />}
            isOpen={showAnalytics}
            toggle={() => setShowAnalytics(!showAnalytics)}
          >
            <p className="p-6 text-gray-600 text-sm">
              📊 Charts coming soon...
            </p>
          </SectionCard>
        </div>

        {/* Home */}
        <div className="flex justify-center pt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <Home size={18} /> Home
          </button>
        </div>
      </div>
    </>
  );
}

/* ✅ Reusable Section Card */
function SectionCard({ title, icon, children, isOpen, toggle }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl overflow-hidden transition">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {icon} {title}
        </h3>
        <button
          onClick={toggle}
          className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:from-indigo-50 hover:to-indigo-100 hover:text-indigo-700 transition"
        >
          {isOpen ? "Hide" : "View"}
        </button>
      </div>
      {isOpen && <div className="animate-fadeIn">{children}</div>}
    </div>
  );
}
