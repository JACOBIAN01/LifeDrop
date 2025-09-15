import { Shield, User, Crown, Mail, Settings } from "lucide-react";

export default function AdminProfile() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white rounded-3xl shadow-2xl p-10 md:flex-row items-center justify-center gap-8">
    

    
      <div className="flex flex-col text-center items-center justify-center gap-8 relative z-10">
        {/* Avatar */}
        <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center shadow-lg ring-4 ring-purple-300/50">
          <User size={30} className="text-indigo-600" />
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


    </div>
  );
}
