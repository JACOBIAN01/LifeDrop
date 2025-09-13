import React from "react";
import { MessageCircle } from "lucide-react";

const JoinWhatsAppButton = () => {
  const sandboxNumber = "14155238886";
  const joinCode = "join orange-compass";

  const handleClick = () => {
    window.open(
      `https://wa.me/${sandboxNumber}?text=${encodeURIComponent(joinCode)}`,
      "_blank"
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-center mt-8 space-y-3 text-center
                 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-6 shadow-md"
    >
      {/* Tagline */}
      <p className="text-white text-lg md:text-xl font-medium">
        Stay ahead with real-time alerts for urgent blood requests — never miss
        a critical update.
      </p>

      {/* Button */}
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-6 py-3 rounded-xl
                   bg-gradient-to-r from-green-500 via-green-600 to-green-700
                   text-white font-semibold shadow-lg
                   hover:scale-105 transition-transform duration-300"
      >
        <MessageCircle className="w-5 h-5 text-white drop-shadow-sm" />
        <span className="tracking-wide">Get Alerts</span>
      </button>
    </div>
  );
};

export default JoinWhatsAppButton;
