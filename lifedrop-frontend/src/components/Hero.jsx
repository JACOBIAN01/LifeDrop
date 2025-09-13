import { useNavigate } from "react-router-dom";
import useDonorStatus from "../Hooks/DonorStatus.jsx";
import JoinWhatsAppButton from "./Join_Community.jsx";




export default function Hero() {
  const navigate = useNavigate();
  const { isDonor, _ } = useDonorStatus();


  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/Blood_Drop_Animation_2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
          Donate Blood, Save Lives ❤️
        </h1>
        <p className="text-white text-lg md:text-2xl mt-4 drop-shadow-md">
          LifeDrop connects donors and patients in real-time for urgent needs.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full max-w-3xl mx-auto">
          {isDonor ? (
            <button
              className="flex-1 flex items-center justify-center text-green-700 bg-green-100 border border-green-400 px-3 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-green-200 transition-all duration-200"
              onClick={() => navigate("/dashboard")}
            >
              🎉 Explore your Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("/donor")}
              className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white border border-white px-3 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Be a Hero
            </button>
          )}
          <button
            onClick={() => navigate("/request")}
            className="flex-1 flex items-center justify-center bg-white hover:bg-red-50 text-red-600 border border-red-500 px-3 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Ask for Help
          </button>
        </div>

        {/* NGO HERO */}
        <div
          className="flex flex-col items-center justify-center mt-8 space-y-3 text-center 
                bg-white/10 backdrop-blur-md rounded-2xl px-6 py-6 shadow-md"
        >
          {/* Tagline */}
          <p className="text-white text-lg md:text-xl font-medium">
            Partner with us — Register your Hospital or NGO today.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/register-org")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            Register Your Organization
          </button>
        </div>
       {isDonor && <JoinWhatsAppButton />}
      </div>
    </section>
  );
}
