import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, Users, UserCheck, FileText, BarChart3 } from "lucide-react";
import DonorsTable from "../components/DonorTable";
import UsersTable from "../components/UsersTable";
import RequestTable from "../components/RequestTable";
import AdminProfile from "../components/AdminProfile";
import Analytics from "../components/Analytics";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("donors");

  return (
    <div className="max-w-7xl mx-auto p-6 pt-10 space-y-5 space-x-5 grid grid-cols-4">
      <div className="flex flex-col space-y-3">
        <AdminProfile />
        <NavButtonComponent
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      <div className="row-span-3 col-span-3 overflow-y-auto max-h-[80vh]">
        <ContentSection activeSection={activeSection} />
      </div>
    </div>
  );
}

function ContentSection({ activeSection }) {
  return (
    <>
      {/* Content Section */}
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl overflow-hidden p-6">
        {activeSection === "donors" && <DonorsTable />}
        {activeSection === "users" && <UsersTable />}
        {activeSection === "requests" && <RequestTable />}
        {activeSection === "analytics" && <Analytics />}
      </div>
    </>
  );
}

function NavButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow 
      transition ${
        active
          ? "bg-indigo-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon} {label}
    </button>
  );
}
function NavButtonComponent({ activeSection, setActiveSection }) {
  const navigate = useNavigate();

  const navItems = [
    { key: "donors", label: "Donors", icon: <UserCheck size={18} /> },
    { key: "users", label: "Users", icon: <Users size={18} /> },
    { key: "requests", label: "Requests", icon: <FileText size={18} /> },
    { key: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-4 flex flex-col space-y-2">
      {/* Nav Items */}
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveSection(item.key)}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${
              activeSection === item.key
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}

      {/* Divider */}
      <div className="border-t border-gray-200 my-2" />

      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
      >
        <Home size={18} />
        <span>Home</span>
      </button>
    </div>
  );
}