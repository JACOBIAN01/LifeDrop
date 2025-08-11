import React, { useState } from "react";
import Navbar from "../components/Navbar";
// Sign In UI
function SignInForm() {
  return (
    <form className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Sign In
      </button>
    </form>
  );
}

//Sign Up UI
function SignUpForm() {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Sign Up
      </button>
    </form>
  );
}

//Main Auth Component (Handles Logic)
export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
    <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
            {isSignIn ? "Sign In to LifeDrop" : "Create Your LifeDrop Account"}
          </h2>

          {isSignIn ? <SignInForm /> : <SignUpForm />}

          {/* Toggle Link */}
          <p className="mt-4 text-center text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-red-500 font-semibold hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
