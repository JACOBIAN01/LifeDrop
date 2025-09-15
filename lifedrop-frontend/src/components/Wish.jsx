import { Sparkles } from "lucide-react";

export default function Wish({ name }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1 rounded-lg 
                    bg-gradient-to-r from-red-500 to-pink-500 
                    text-white shadow-md"
    >
      <Sparkles className="w-4 h-4 text-yellow-300" />
      <span className="text-sm font-medium">
        Welcome, <span className="font-semibold">{name}</span>
      </span>
    </div>
  );
}
