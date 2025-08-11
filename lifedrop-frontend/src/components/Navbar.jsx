import React from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-rose-200 via-red-200 to-rose-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 font-extrabold text-3xl tracking-wide">
              <Link to="/">LifeDrop</Link>
            </span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={()=>navigate("/auth")}
             className="px-4 py-2 rounded-lg bg-white text-rose-500 font-semibold hover:bg-rose-50 transition">
              Sign In
            </button>
            <button
              onClick={()=>navigate("/auth")}
             className="px-4 py-2 rounded-lg bg-rose-400 text-white font-semibold hover:bg-rose-500 transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
