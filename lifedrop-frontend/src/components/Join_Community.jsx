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
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg
                 bg-gradient-to-r from-green-500 via-green-600 to-green-700
                 text-white font-semibold shadow-md hover:shadow-xl
                 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      <MessageCircle className="w-5 h-5 text-white drop-shadow-sm" />
      <span className="tracking-wide">Get Alerts</span>
    </button>
  );
};

export default JoinWhatsAppButton;
