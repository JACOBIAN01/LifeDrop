import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../services/AuthService";




const UserSignOut = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/auth")}
          className="px-4 py-2 rounded-lg bg-white text-rose-500 font-semibold hover:bg-rose-50 transition"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/auth")}
          className="px-4 py-2 rounded-lg bg-rose-400 text-white font-semibold hover:bg-rose-500 transition"
        >
          Sign Up
        </button>
      </div>
    </>
  );
};


const UserSignIn = ({userName})=>{

  const handleLogout = async () => {
    await logout();
    alert("Logged out!");
  };

  return (
    <>
      <div className="flex space-x-4 items-center">
        <p className="text-gray-700 font-medium">Hello {userName}</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-rose-400 text-white font-semibold hover:bg-rose-500 transition"
        >
          Log Out
        </button>
      </div>
    </>
  );
}


const Navbar = ({ user }) => {
  return (
    <nav className="bg-gradient-to-r from-rose-200 via-red-200 to-rose-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              className="h-15 object-contain mr-3 rounded-lg"
              src="/Logo_LifeDrop.png"
            />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 font-extrabold text-3xl tracking-wide">
              <Link to="/">LifeDrop</Link>
            </span>
          </div>

          <div>
            {
              user!=null?<UserSignIn userName={user.displayName} />:<UserSignOut/>
            }
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
