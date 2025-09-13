import { Shield, User, Crown, Mail, Settings } from "lucide-react";

export default function AdminProfile() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20 blur-2xl"></div>

      {/* Left Section */}
      <div className="flex items-center gap-8 relative z-10">
        {/* Avatar */}
        <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center shadow-lg ring-4 ring-purple-300/50">
          <User size={42} className="text-indigo-600" />
        </div>

        {/* Details */}
        <div>
          <h2 className="text-4xl font-extrabold flex items-center gap-2">
            Subhadeep{" "}
            <Crown size={26} className="text-yellow-300 drop-shadow" />
          </h2>
          <p className="flex items-center gap-2 text-lg opacity-90 mt-1">
            <Mail size={18} /> Admin@gmail.com
          </p>
          <p className="mt-2 text-xl font-semibold flex items-center gap-2">
            <Shield size={20} /> System Administrator
          </p>
        </div>
      </div>

      {/* Right Section - Stats */}
      <div className="flex gap-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition">
          <p className="text-3xl font-extrabold text-yellow-300">∞</p>
          <p className="text-sm mt-1 flex items-center gap-1">
            <Shield size={16} /> Access Level
          </p>
        </div>
      
      
      </div>
    </div>
  );
}
